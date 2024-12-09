import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta charSet="UTF-8" />
          <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
          <link
            rel="apple-touch-icon"
            sizes="57x57"
            href="/apple-touch-icon-57x57.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="72x72"
            href="/apple-touch-icon-72x72.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="76x76"
            href="/apple-touch-icon-76x76.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="114x114"
            href="/apple-touch-icon-114x114.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="120x120"
            href="/apple-touch-icon-120x120.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="144x144"
            href="/apple-touch-icon-144x144.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="152x152"
            href="/apple-touch-icon-152x152.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon-180x180.png"
          />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
          />
          <meta
            name="theme-color"
            media="(prefers-color-scheme: light)"
            content="#FFF"
          />
          <meta
            name="theme-color"
            media="(prefers-color-scheme: dark)"
            content="#09090b"
          />
          <meta
            name="description"
            content="Lance Ellis is a software engineer and designer from the United States. He works mostly on the web and is currently studying at the University of Texas at Austin."
          />
          <meta property="og:url" content="https://www.lanc3.dev/" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Lance Ellis" />
          <meta
            property="og:description"
            content="Lance Ellis is a software engineer and designer from the United States. He works mostly on the web and is currently studying at the University of Texas at Austin."
          />
          <meta
            property="og:image"
            content="https://www.lanc3.dev/og-image.png"
          />

          <meta name="twitter:card" content="summary_large_image" />
          <meta property="twitter:domain" content="lanc3.dev" />
          <meta property="twitter:url" content="https://www.lanc3.dev/" />
          <meta name="twitter:title" content="Lance Ellis" />
          <meta
            name="twitter:description"
            content="Lance Ellis is a software engineer and designer from the United States. He works mostly on the web and is currently studying at the University of Texas at Austin."
          />
          <meta
            name="twitter:image"
            content="https://www.lanc3.dev/og-image.png"
          />
        </Head>
        <body className="">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
