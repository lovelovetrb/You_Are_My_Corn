import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="ja">
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Cherry+Bomb+One&family=Kosugi+Maru&display=swap" rel="stylesheet" />
        {/* <!-- reset.css destyle --> */}
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/destyle.css@1.0.15/destyle.css" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
