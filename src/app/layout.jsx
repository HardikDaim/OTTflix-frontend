// src/app/RootLayout.js
import ApolloProviderWrapper from "./ApolloProvider";
import "./globals.css";

export const metadata = {
  title: "OTTflix - Your Ultimate Streaming Platform",
  description: "Stream the best movies and TV shows at OTTFLIX.",
  creator: 'Hardik Daim',
  publisher: 'Hardik Daim',
  alternates: {
    canonical: '/'
  },
  keywords: ["movies", "tv shows", "streaming", "ottflix"],
  openGraph: {
    title: "OTTflix - Your Ultimate Streaming Platform",
    description: "Stream the best movies and TV shows at OTTFLIX.",
    url: "https://ottflix.vercel.app",
    images: [
      {
        url: "/logo-rem.png",
        width: 1200,
        height: 630,
        alt: "OTTflix Logo",
      },
    ],
    authors: ['hardik Daim'],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "OTTflix - Your Ultimate Streaming Platform",
    description: "Stream the best movies and TV shows at OTTFLIX.",
    images: ["/logo-rem.png"],
  },
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: ["/apple-touch-icon.png"],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  appleWebApp: {
    title: 'OTTflix - - Your Ultimate Streaming Platform',
    statusBarStyle: 'black-translucent',
    startupImage: [
      '/apple-touch-icon.png',
      {
        url: '/apple-touch-icon.png',
        media: '(device-width: 768px) and (device-height: 1024px)',
      },
    ],
  },
  appLinks: {
    web: {
      url: 'https://ottflix.vercel.app',
      should_fallback: true,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" >
      <body suppressHydrationWarning={true}>
        <ApolloProviderWrapper>{children}</ApolloProviderWrapper>
      </body>
    </html>
  );
}
