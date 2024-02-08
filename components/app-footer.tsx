export default function AppFooter() {
  return (
    <footer
      className={`absolute w-full bottom-[20px] min-[440px]:bottom-[24px] leading-tight`}
    >
      <div className="mx-auto px-[15px] max-w-[1080px]">
        {/*<ul className={styles.langToggle">
        <li><a className={styles.current" href="/">中文</a></li>
        <li><a href="/jp.html">日本語</a></li>
      </ul>
*/}
        <p className="text-[12px] font-[Verdana,sans-serif] text-[#666] [text-shadow:0_1px_rgb(255_255_255_/_80)]">
          <span>© {new Date().getFullYear()} Hora Hora.</span>{" "}
          <span className="hidden min-[440px]:inline">
            All rights reserved.
          </span>{" "}
          <a
            href="https://github.com/horahora/personal-website"
            target="_blank"
            rel="noreferrer"
            className="block min-[440px]:inline mt-[3px] min-[440px]:mt-0"
          >
            View git repository.
          </a>
        </p>
        {/*<p className={styles.copyright"><span>© 2013-2018 Hora Hora.</span> <span className={styles.hidden-xs">All rights reserved.</span> <span className={styles.hidden-xs">Designed in China.</span></p> */}
      </div>
    </footer>
  );
}
