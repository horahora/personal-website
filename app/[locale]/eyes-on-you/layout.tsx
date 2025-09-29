import { type PropsWithChildren } from "react";
import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Eyes On You - Hora Hora",
};

export const viewport: Viewport = {
  themeColor: "#000",
};

export default function Layout({ children }: PropsWithChildren) {
  return children;
}
