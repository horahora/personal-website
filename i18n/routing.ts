import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "zh-Hans"],
  // Used when no locale matches
  defaultLocale: "en",
  localePrefix: "as-needed",
});
