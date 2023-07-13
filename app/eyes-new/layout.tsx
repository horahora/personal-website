import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "eyes X eyes X eyes - Hora Hora",
  themeColor: "#000",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
