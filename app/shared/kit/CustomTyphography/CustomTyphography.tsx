import React from "react";
import { COLORS } from "../../constants/colors";
import styles from "./CustomTyphoGraphy.module.css";

type TypographyWeight = "bold" | "medium" | "regular" | "light";

type TypographySize =
  | "8px"
  | "10px"
  | "12px"
  | "14px"
  | "16px"
  | "18px"
  | "20px"
  | "22px"
  | "24px";

const typographyWeight = {
  bold: "bold",
  medium: "500",
  regular: "400",
  light: "300",
};

const typographySize = {
  "8px": "8px",
  "10px": "10px",
  "12px": "12px",
  "14px": "14px",
  "16px": "16px",
  "18px": "18px",
  "20px": "20px",
  "22px": "22px",
  "24px": "24px",
};

interface CustomTyphographyProps {
  children: React.ReactNode;
  color?: keyof typeof COLORS;
  fontWeight?: TypographyWeight;
  fontSize?: TypographySize;
  className?: string;
  textAlign?: "left" | "center" | "right" | "justify";
}

export const CustomTyphography = ({
  children,
  color = "black",
  fontWeight = "medium",
  fontSize = "16px",
  className,
  textAlign = "left",
}: CustomTyphographyProps) => {
  return (
    <p
      style={{
        color: COLORS[color],
        fontWeight: typographyWeight[fontWeight],
        fontSize: typographySize[fontSize],
        textAlign,
      }}
      className={`${className} ${styles.height}`}
    >
      {children}
    </p>
  );
};
