import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Offers & Pricing | DevStudio - Transparent Web Design Pricing",
  description: "Choose from Starter, Professional, or Premium website design packages. One-time payments, no hidden fees. Starting from $1,500.",
};

export default function OffersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}