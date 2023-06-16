import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head title="Sina's Website">
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.4.0/styles/github-dark.min.css"
        />
      </Head>
      <body
        style={{
          overscrollBehavior: "none",
        }}
      >
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
