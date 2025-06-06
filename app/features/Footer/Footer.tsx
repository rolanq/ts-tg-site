"use client";
import { Flex, Link } from "@chakra-ui/react";
import styles from "./Footer.module.css";
import { usePathname } from "next/navigation";
import { PAGES } from "@/app/shared/constants/pages";
import { IconWrapper } from "./IconWrapper";
import { AddAd } from "../AddAd/AddAd";

export default function Footer() {
  const pathname = usePathname();

  return (
    <Flex className={styles.footer}>
      {PAGES.map((page) =>
        page.path === "/add_ad" ? (
          <AddAd key={page.name} />
        ) : (
          <Link
            key={page.name}
            href={page.path}
            className={styles.footerItem}
            style={{ textDecoration: "none" }}
            alignItems="start"
            variant="plain"
          >
            <IconWrapper
              icon={<page.icon />}
              isActive={pathname === page.path}
            />
          </Link>
        )
      )}
    </Flex>
  );
}
