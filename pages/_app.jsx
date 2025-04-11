import { FAVICON } from "@/assets";
import { AdminProvider } from "@/contexts/AdminContext";
import "@/styles/globals.css";

import { ThemeProvider, createTheme } from "@mui/material";
import Head from "next/head";
import NextNProgress from "nextjs-progressbar";
import { Suspense } from "react";

export default function App({ Component, pageProps }) {
  const theme = createTheme({
    // font
    fontFamily: "Noto Sans Thai",
    typography: {
      fontFamily: "Noto Sans Thai",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <AdminProvider>
        <NextNProgress
          color="#E41E2B"
          startPosition={0}
          stopDelayMs={100}
          height={3}
          showOnShallow={true}
        />
        <Head>
          <title>Coke</title>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
          {/* icon */}
          <link rel="icon" href={FAVICON.src} />
        </Head>
        <Suspense fallback={<div>Loading...</div>}>
          <Component {...pageProps} />
        </Suspense>
      </AdminProvider>
      
    </ThemeProvider>
  );
}
