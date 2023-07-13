import type { Metadata } from "next";
import styles from "./photography.module.css";

export const metadata: Metadata = {
  title: "仇俊斌的摄影作品集 - Hora Hora",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.pageTitle}>仇俊斌的摄影作品集</h1>
      </div>
      {children}
      <div className={`${styles.copyright} ${styles.container}`}>
        {`© ${new Date().getFullYear()} Hora Hora. All rights reserved.`}
      </div>
    </div>
  );
}
