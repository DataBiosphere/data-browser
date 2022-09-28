import Document, { Head, Html, Main, NextScript } from "next/document";
import Script from "next/script";
import React from "react";

class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html>
        <Head>
          {/* TODO render script for enableAuthorization only.
           Using async defer would cause intermittent errors loding the gsi client script.
            using beforeInteractive did work but there may be a bug that is fixed
          an a later version. */}
          {/* TODO self host fonts */}
          {/* TODO only load fonts required for the app being built */}
          <Script
            src="https://accounts.google.com/gsi/client"
            strategy="beforeInteractive"
          ></Script>
          <link rel="stylesheet" href="https://use.typekit.net/qhb0geh.css" />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
