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
    <div className="relative flow-root bg-white select-none">
      <div className={`${styles.container} 2xl:container mx-auto`}>
        <h1 className="border-b border-gray-300 pb-2.5 text-[#1a1a1a] text-[28px] my-4">
          {t("pageTitle")}
        </h1>
      </div>
      {children}
      <div
        className={`text-xs py-5 text-[#666] ${styles.container} 2xl:container mx-auto`}
      >
        {`© ${new Date().getFullYear()} Hora Hora. All rights reserved.`}
      </div>
    </div>
  );
}
