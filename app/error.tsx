"use client";

import { Box, Heading, Text } from "@chakra-ui/react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Box p={5} borderWidth="1px" borderRadius="lg">
      <Heading as="h2" size="lg" mb={4}>
        Произошла ошибка
      </Heading>
      <Text color="red.500" mb={4}>
        {error.message}
      </Text>
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
    </Box>
  );
}
