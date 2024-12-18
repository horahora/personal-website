import type { Metadata, Viewport } from "next";
import styles from "./layout.module.css";

export const metadata: Metadata = {
  title: "视差滚动 - Hora Hora",
};

export const viewport: Viewport = {
  themeColor: "#edf1e5",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className={styles.pageRoot}>{children}</div>;
}
