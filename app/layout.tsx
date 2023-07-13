import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hora Hora",
  description: "这里是 仇俊斌 的个人作品集",
  viewport: {
    width: "device-width",
    initialScale: 1,
    viewportFit: "cover",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-cmn-Hans">
      <body>{children}</body>
    </html>
  );
}
