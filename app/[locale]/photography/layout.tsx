import { type PropsWithChildren } from "react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import styles from "./photography.module.css";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "PhotographyPage" });

  return {
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
