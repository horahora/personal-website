import type { Metadata, Viewport } from "next";

export const viewport: Viewport = {
  themeColor: "#000",
};

export const metadata: Metadata = {
  title: "eyes X eyes X eyes - Hora Hora",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
