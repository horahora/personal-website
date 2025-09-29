import { Link } from "@/i18n/navigation";
import { getLocale } from "next-intl/server";
import { cn } from "@/lib/utils";

export default async function AppFooter() {
  const locale = await getLocale();
  return (
    <footer
      className={`absolute w-full bottom-[20px] min-[440px]:bottom-[24px] leading-tight`}
    >
      <div className="mx-auto px-[15px] max-w-[1080px] text-[#666]">
        <ul className="mb-[14px] text-xs">
          <li className="inline mr-[5px]">
            <Link
              href="/"
              locale="en"
              className={cn(
                "px-[12px] py-[3px] rounded-[4px] hover:text-[#222] hover:no-underline",
                locale === "en"
                  ? "text-[#555] bg-[hsl(0deg_0%_83%)]/70 inset-shadow-[0_1px_2px_rgba(0,0,0,0.2)] shadow-[0_1px_rgba(255,255,255,0.7)]"
                  : ""
              )}
            >
              English
            </Link>
          </li>
          <li className="inline mr-[5px]">
            <Link
              href="/"
              locale="zh-Hans"
              className={cn(
                "px-[12px] py-[3px] rounded-[4px] hover:text-[#222] hover:no-underline",
                locale === "zh-Hans"
                  ? "text-[#555] bg-[hsl(0deg_0%_83%)]/70 inset-shadow-[0_1px_2px_rgba(0,0,0,0.2)] shadow-[0_1px_rgba(255,255,255,0.7)]"
                  : ""
              )}
            >
              中文
            </Link>
          </li>
        </ul>

        <p className="text-[12px] font-[Verdana,sans-serif] text-carved">
          <span>
            © {new Date().getFullYear()} Hora Hora. All rights reserved.
          </span>{" "}
          <a
            href="https://github.com/horahora/personal-website"
            target="_blank"
            rel="noreferrer"
            className="block min-[440px]:inline mt-[5px] min-[440px]:mt-0"
          >
            View git repository.
          </a>
        </p>
        {/*<p className={styles.copyright"><span>© 2013-2018 Hora Hora.</span> <span className={styles.hidden-xs">All rights reserved.</span> <span className={styles.hidden-xs">Designed in China.</span></p> */}
      </div>
    </footer>
  );
}
