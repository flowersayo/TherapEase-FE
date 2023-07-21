import { Html, Head, Main, NextScript } from 'next/document';

const Document = () => {
  return (
    <Html lang="en">
      <Head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/animate.css@3.5.2/animate.min.css"
        />
      </Head>
      <title>TherapEase - Make Your Counseling Perfect</title>
      <body>
        <Main />
        <NextScript />
        <script dangerouslySetInnerHTML={{ __html: 'new WOW().init();' }} />
      </body>
    </Html>
  );
};

export default Document;
