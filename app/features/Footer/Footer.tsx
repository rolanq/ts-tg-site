"use client";

import styles from "./Footer.module.css";
import { usePathname } from "next/navigation";
import { PAGES } from "@/app/shared/constants/pages";
import { IconWrapper } from "./IconWrapper";
import dynamic from "next/dynamic";
import Link from "next/link";
import { AddAdProvider } from "@/app/context/AddAdContext";
import { CustomButton } from "@/app/shared/kit/CustomButton/CustomButton";
import { PlusIcon } from "@/app/shared/Icons/PlusIcon";

const AddAd = dynamic(() => import("../AddAd/AddAd").then((mod) => mod.AddAd), {
  loading: () => (
    <div className={styles.addFotterItem}>
      <CustomButton className={styles.addButton} isText={false}>
        <PlusIcon color="var(--color-white)" />
      </CustomButton>
    </div>
  ),
  ssr: false,
});

export default function Footer() {
  const pathname = usePathname();

  return (
    <div className={styles.footer}>
      {PAGES.map((page) =>
        page.path === "/add_ad" ? (
          <AddAdProvider key={page.name}>
            <AddAd />
          </AddAdProvider>
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
