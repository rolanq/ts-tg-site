"use client";

import styles from "./Footer.module.css";
import { usePathname } from "next/navigation";
import { PAGES } from "@/app/shared/constants/pages";
import { IconWrapper } from "./IconWrapper";
import { AddAd } from "../AddAd/AddAd";
import Link from "next/link";

export default function Footer() {
  const pathname = usePathname();

  return (
    <div className={styles.footer}>
      {PAGES.map((page) =>
        page.path === "/add_ad" ? (
          <AddAd key={page.name} />
        ) : (
          <Link
            key={page.name}
            href={page.path}
            className={styles.footerItem}
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "start",
            }}
          >
            <IconWrapper
              icon={<page.icon />}
              isActive={pathname === page.path}
            />
          </Link>
        )
      )}
    </div>
  );
}
