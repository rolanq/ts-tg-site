"use client";
import { Flex, Link, Text } from "@chakra-ui/react";
import styles from "./Footer.module.css";
import { usePathname } from "next/navigation";
import { PAGES } from "@/app/constants/pages";
import classNames from "classnames";

export default function Footer() {
  const pathname = usePathname();

  return (
    <Flex className={styles.footer}>
      {PAGES.map((page, index) => (
        <Link
          href={page.path}
          key={page.name}
          className={classNames(styles.footerItem, {
            [styles.selectedPage]: pathname === page.path,
            [styles.left]: index === 0,
            [styles.right]: index === PAGES.length - 1,
          })}
          style={{ textDecoration: "none" }}
        >
          <Text
            fontSize={"10px"}
            fontWeight={"500"}
            className={styles.footerItemText}
          >
            {page.name}
          </Text>
        </Link>
      ))}
    </Flex>
  );
}
