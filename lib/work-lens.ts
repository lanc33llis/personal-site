import { toCanvas } from "html-to-image";
import { effect, frame, init, sampler, surface, texture } from "vgpu";
import glassShader from "./work-lens.wgsl";

type PreviewPageSize = { width: number; height: number };

async function capturePreview(page: Document, size: PreviewPageSize) {
  await page.fonts.ready;
  const videos = Array.from(page.querySelectorAll<HTMLVideoElement>("video[poster]"), (video) => {
    const poster = page.createElement("img");
    poster.src = video.poster;
    poster.className = video.className;
    poster.style.cssText = video.style.cssText;
    video.replaceWith(poster);
    return { video, poster };
  });

  try {
    return await toCanvas(page.body, {
      ...size,
      pixelRatio: 1,
      // Next.js serves different images from one endpoint using query parameters.
      includeQueryParams: true,
      filter: (node) => !["SCRIPT", "NOSCRIPT", "NEXTJS-PORTAL"].includes(node.tagName),
    });
  } finally {
    for (const { video, poster } of videos) poster.replaceWith(video);
  }
}

export async function createWorkLens(
  canvas: HTMLCanvasElement,
  page: Document,
  diameter: number,
  pageSize: PreviewPageSize,
  scale: number,
) {
  const snapshot = await capturePreview(page, pageSize);
  const gpu = await init();
  try {
    const display = surface(gpu, canvas, { alphaMode: "premultiplied" });
    const source = texture(gpu, {
      kind: "2d",
      size: [snapshot.width, snapshot.height],
      format: "rgba8unorm",
      usage: ["texture_binding", "copy_dst", "render_attachment"],
    });
    gpu.gpu.queue.copyExternalImageToTexture(
      { source: snapshot },
      { texture: source.gpu },
      [snapshot.width, snapshot.height],
    );

    const scaledWidth = pageSize.width * scale;
    const scaledHeight = pageSize.height * scale;
    const sampleRadius = [diameter / (2 * scaledWidth), diameter / (2 * scaledHeight)] as const;
    const rimWidth = 6 / (diameter / 2);
    const glass = effect(gpu, glassShader, {
      set: {
        lens: { pan: [0, 0], sampleRadius, rimWidth },
        source,
        sourceSampler: sampler(gpu, { minFilter: "linear", magFilter: "linear" }),
      },
    });
    await glass.compile(display);

    let frameId = 0;
    return {
      move([x, y]: readonly [number, number]) {
        cancelAnimationFrame(frameId);
        frameId = requestAnimationFrame(() => {
          glass.set({
            lens: {
              pan: [-x / scaledWidth, -y / scaledHeight],
              sampleRadius,
              rimWidth,
            },
          });
          frame(gpu, (currentFrame) => currentFrame.pass(display, glass));
        });
      },
      dispose() {
        cancelAnimationFrame(frameId);
        gpu.dispose();
      },
    };
  } catch (error) {
    gpu.dispose();
    throw error;
  }
}
