import Head from "next/head";
import "tailwindcss/tailwind.css";
import "../styles/globals.css";
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>TODO app</title>
        <meta name="description" content="Awesome YouTube channel" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
