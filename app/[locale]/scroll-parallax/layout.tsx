import { type PropsWithChildren } from "react";
import type { Metadata, Viewport } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("ScrollParallaxPage");

  return {
    description: t("metadata.description"),
  };
}

export const viewport: Viewport = {
  themeColor: "#edf1e5",
};

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="overflow-hidden bg-[#edf1e5] [--primary-color:#cf5012]">
      {children}
    </div>
  );
}
