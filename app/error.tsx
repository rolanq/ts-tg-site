"use client";
import styles from "./page.module.css";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className={styles.error}>
      <h2>Произошла ошибка</h2>
      <h3>{error.message}</h3>
      <button
        onClick={() => reset()}
        style={{
          padding: "8px 16px",
          backgroundColor: "#4299E1",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Попробовать снова
      </button>
    </div>
  );
}
