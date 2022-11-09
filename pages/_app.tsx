import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import { DefaultSeo } from "next-seo";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <DefaultSeo
        title="Lance Ellis"
        description="A short description goes here."
        openGraph={{
          type: "website",
          locale: "en_US",
          url: "https://www.lanc3.dev/",
          site_name: "Lance Ellis",
          title: "Lance Ellis",
          description:
            "Lance Ellis is a software engineer and designer from the United States. He works mostly on the web and is currently studying at the University of Texas at Austin.",
          images: [
            {
              url: "https://www.lanc3.dev/og-image.png",
              width: 1200,
              height: 630,
              alt: "Lance Ellis",
            },
          ],
        }}
      />
      <AnimatePresence
        mode="wait"
        onExitComplete={() => {
          window.scrollTo(0, 0);
        }}
      >
        <Component {...pageProps} key={router.pathname} />
      </AnimatePresence>
    </>
  );
}

export default MyApp;
