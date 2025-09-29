"use client";

import { MouseEvent } from "react";

export default function Page() {
  const handleListClick = (event: MouseEvent) => {
    if (!(event.target instanceof Element)) {
      return;
    }
    if (event.target.classList.contains("item")) {
      if (document.startViewTransition) {
        document.startViewTransition(() => {
          (event.target as Element).remove();
        });
      } else {
        event.target.remove();
      }
    }
  };
  return (
    <div className="flex gap-1" onClick={handleListClick}>
      <div className="item w-24 h-24 bg-slate-300">1</div>
      <div className="item w-24 h-24 bg-slate-300">2</div>
      <div className="item w-24 h-24 bg-slate-300">3</div>
      <div className="item w-24 h-24 bg-slate-300">4</div>
      <div className="item w-24 h-24 bg-slate-300">5</div>
    </div>
  );
}
