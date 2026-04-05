import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DevStudio | Professional Website Design for Local Businesses",
  description: "Transform your online presence with stunning, conversion-focused websites. 6+ years helping local businesses get more customers through professional web design.",
  keywords: ["web design", "website redesign", "local business", "conversion optimization", "AI voice agent"],
  authors: [{ name: "DevStudio" }],
  icons: {
    icon: "/favicon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    title: "DevStudio | Professional Website Design",
    description: "Get a website that actually brings you customers. Free audit included.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}