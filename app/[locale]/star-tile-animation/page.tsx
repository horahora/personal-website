"use client";

import styles from "./page.module.css";
import { useState } from "react";

enum ShaptType {
  spade,
  heart,
  diamond,
  club,
}

export default function StarTileAnimation() {
  const [type, setType] = useState<ShaptType>(ShaptType.spade);
  const handleToggleBackground = (type: ShaptType) => {
    setType(type);
  };
  return (
    <>
      <div className={`${styles.container} ${styles[type]}`}>
        <h2 className={styles.title} data-title="SELECT">
          SELECT
        </h2>
        <div className={styles.toggleWrapper}>
          <div
            className={styles.toggleBtn}
            onClick={() => handleToggleBackground(ShaptType.spade)}
          >
            spade
          </div>
          <div
            className={styles.toggleBtn}
            onClick={() => handleToggleBackground(ShaptType.heart)}
          >
            heart
          </div>
          <div
            className={styles.toggleBtn}
            onClick={() => handleToggleBackground(ShaptType.diamond)}
          >
            diamond
          </div>
          <div
            className={styles.toggleBtn}
            onClick={() => handleToggleBackground(ShaptType.club)}
          >
            club
          </div>
        </div>
      </div>
    </>
  );
}
