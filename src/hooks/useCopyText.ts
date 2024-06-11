import { useCallback } from "react";
import { useCopyToClipboard } from "usehooks-ts";

const useCopyText = () => {
  const [copiedText, copy] = useCopyToClipboard();
  const handleCopy = useCallback(
    (text: string) => () => {
      copy(text)
        .then(() => {
          console.log("Copied!", { text });
        })
        .catch((error) => {
          console.error("Failed to copy!", error);
        });
    },
    [copy]
  );

  return {
    copiedText,
    handleCopy,
  };
};

export default useCopyText;
