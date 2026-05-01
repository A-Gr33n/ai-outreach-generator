import Navbar from "../components/Navbar";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navbar />

      <main
        style={{
          minHeight: "calc(100vh - 80px)", // keeps content centered below navbar
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Component {...pageProps} />
      </main>
    </>
  );
}