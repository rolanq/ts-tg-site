"use client";
import { Flex, Link } from "@chakra-ui/react";
import styles from "./Footer.module.css";
import { usePathname } from "next/navigation";
import { PAGES } from "@/app/shared/constants/pages";
import { IconWrapper } from "./IconWrapper";

export default function Footer() {
  const pathname = usePathname();

  return (
    <Flex className={styles.footer}>
      {PAGES.map((page) => (
        <Link
          key={page.name}
          href={page.path}
          className={styles.footerItem}
          style={{ textDecoration: "none" }}
          alignItems="start"
          variant="plain"
        >
          <IconWrapper icon={<page.icon />} isActive={pathname === page.path} />
        </Link>
      ))}
    </Flex>
  );
}
