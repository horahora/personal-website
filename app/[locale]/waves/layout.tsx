import { type PropsWithChildren } from "react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { SITE_NAME } from "@/constants";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("WavesPage");

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
            --background: hsl(79deg 19% 96%);
          }
        `}
      </style>
      {children}
    </>
  );
}
