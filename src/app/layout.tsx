"use client"
import { useEffect, useState } from "react";
import ApolloProviderWrapper from "./ApolloProvider";
import './globals.css';
import Head from 'next/head';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <>
      <Head> 
        {/* Title */}
        <title>OTTflix - Your Ultimate Streaming Platform</title>
        <meta name="description" content="Stream the best movies and TV shows at OTTFLIX." />
        <meta name="keywords" content="movies, tv shows, streaming, ottflix" />
      </Head>
      <html lang="en">
        <body>
          <ApolloProviderWrapper>{children}</ApolloProviderWrapper>
        </body>
      </html>
    </>
  );
}
