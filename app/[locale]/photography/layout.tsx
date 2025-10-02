import { type PropsWithChildren } from "react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import styles from "./photography.module.css";
import { SITE_NAME } from "@/constants";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("PhotographyPage");

  return {
    title: `${t("metadata.title")} - ${SITE_NAME}`,
    description: t("metadata.description"),
  };
}

export default async function Layout({ children }: PropsWithChildren) {
  const t = await getTranslations("PhotographyPage");
  return (
    <div className={styles.page}>
      <div className={`${styles.container} 2xl:container mx-auto`}>
        <h1 className={`${styles.pageTitle} my-4`}>{t("pageTitle")}</h1>
      </div>
      {children}
      <div
        className={`${styles.copyright} ${styles.container} 2xl:container mx-auto`}
      >
        {`© ${new Date().getFullYear()} Hora Hora. All rights reserved.`}
      </div>
    </div>
  );
}
