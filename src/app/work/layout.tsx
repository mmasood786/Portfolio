import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Work | DevStudio - Website Design Portfolio",
  description: "See real results from businesses like yours. 150+ websites designed, 3x average lead increase, 7-day average launch time.",
};

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}