import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import type { DocumentProps } from "next/document";
import i18nextConfig from "../next-i18next.config";
import { ServerStyleSheet } from "styled-components";

class MyDocument extends Document {
    render() {
        const currentLocale =
            this.props.__NEXT_DATA__.locale ?? i18nextConfig.i18n.defaultLocale;
        return (
            <Html lang={currentLocale}>
                <Head>
                    <meta charSet="utf-8" />
                    <link
                        href="https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css"
                        rel="stylesheet"
                    />
                    <link href="/app.css" rel="stylesheet" />
                    <link
                        href="https://cdnjs.cloudflare.com/ajax/libs/typicons/2.0.9/typicons.min.css"
                        rel="stylesheet"
                    />
                    <link
                        href="https://fonts.googleapis.com/css?family=Open+Sans:300,400|Oswald:600"
                        rel="stylesheet"
                    />
                    <link
                        data-react-helmet="true"
                        rel="icon"
                        href="https://blobscdn.gitbook.com/v0/b/gitbook-28427.appspot.com/o/spaces%2F-L9iS6Wm2hynS5H9Gj7j%2Favatar.png?generation=1523462254548780&amp;alt=media"
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

MyDocument.getInitialProps = async (ctx) => {
    const originalRenderPage = ctx.renderPage;

    const sheet = new ServerStyleSheet();

    ctx.renderPage = () =>
        originalRenderPage({
            // Take precedence over the CacheProvider in our custom _app.js
            // eslint-disable-next-line react/display-name
            enhanceComponent: (Component) => (props) =>
                sheet.collectStyles(<Component {...props} />),
        });

    const initialProps = await Document.getInitialProps(ctx);

    return {
        ...initialProps,
        // Styles fragment is rendered after the app and page rendering finish.
        styles: [
            ...React.Children.toArray(initialProps.styles),
            ...sheet.getStyleElement(),
        ],
    };
};

export default MyDocument;
