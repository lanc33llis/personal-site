@fragment
fn fs_main(@location(0) uv: vec2f) -> @location(0) vec4f {
  let point = uv * 2.0 - 1.0;
  let radius = length(point);
  let disc = 1.0 - smoothstep(0.985, 1.0, radius);
  let bevel = smoothstep(0.74, 0.94, radius);
  let outerEdge = smoothstep(0.944, 0.985, radius);
  let upperLight = smoothstep(-0.15, 0.82, -point.y - point.x * 0.25);

  // Sample a progressively narrower strip toward the rim to elongate adjacent pixels.
  let rimDepth = max(0.0, radius - (1.0 - lens.rimWidth));
  let rimProgress = rimDepth / lens.rimWidth;
  let stretch = 3.0;
  let sampleDepth = rimDepth / (1.0 + stretch * rimProgress);
  let sampleRadius = radius - rimDepth + sampleDepth;
  let pagePoint = point * (sampleRadius / max(radius, 0.001));
  let pageUV = vec2f(0.5) + lens.pan + pagePoint * lens.sampleRadius;
  let pageColor = textureSample(source, sourceSampler, pageUV).rgb;

  let reflection = (point - vec2f(-0.3, -0.83)) * vec2f(1.6, 4.2);
  let glare = 1.0 - smoothstep(0.0, 1.0, length(reflection));
  let lowerReflection = (point - vec2f(0.39, 0.84)) * vec2f(1.7, 4.4);
  let lowerGlare = 1.0 - smoothstep(0.0, 1.0, length(lowerReflection));

  let light = upperLight * (0.05 * bevel + 0.10 * outerEdge) + 0.10 * glare + 0.05 * lowerGlare;
  let shadow = (1.0 - upperLight) * (0.02 * bevel + 0.016 * outerEdge);
  let opacity = light + shadow;
  let color = vec3f((light + 0.32 * shadow) / max(opacity, 0.001));

  return vec4f(mix(pageColor, color, min(1.0, opacity)) * disc, disc);
}
struct Lens {
  pan: vec2f,
  sampleRadius: vec2f,
  rimWidth: f32,
}

@group(0) @binding(0) var<uniform> lens: Lens;
@group(0) @binding(1) var source: texture_2d<f32>;
@group(0) @binding(2) var sourceSampler: sampler;

