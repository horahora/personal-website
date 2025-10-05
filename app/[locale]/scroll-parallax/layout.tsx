import { type PropsWithChildren } from "react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { SITE_NAME } from "@/constants";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("ScrollParallaxPage");

  return {
    title: `${t("metadata.title")} - ${SITE_NAME}`,
    description: t("metadata.description"),
  };
}

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <style>
        {`
          body {
            --background: #edf1e5;
          }
        `}
      </style>
      <div className="overflow-hidden bg-[#edf1e5] [--primary-color:#cf5012]">
        {children}
      </div>
    </>
  );
}
