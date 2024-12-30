import "../styles/globals.css";
import type { AppProps } from "next/app";
import { DefaultSeo } from "next-seo";
import Head from "next/head";

import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { ThemeProvider } from "next-themes";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <DefaultSeo
        title="Lance Ellis"
        description="Lance Ellis is a software engineer and designer from the United States. He works mostly on the web and is currently studying at the University of Texas at Austin."
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
              url: "https://www.lancee.xyz/og-image.png",
              width: 1200,
              height: 630,
              alt: "Lance Ellis",
            },
          ],
        }}
      />
      <main
        className={`${GeistSans.variable} ${GeistMono.variable} font-sans pb-4 sm:pb-0`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          // disableTransitionOnChange
        >
          <Component {...pageProps} />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </main>
    </>
  );
}

export default MyApp;
