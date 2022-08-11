import { useCallback } from "react";

type ScrollType = "top" | "bottom";

type UseScrollReturn = () => void;

/**
 * Hook used to scroll the to top or bottom of the page.
 * This hook can only be used on the client-side.
 * @param scrollType - top or bottom of the page. Default = top
 * @returns scroll function
 */
export const useScroll = (scrollType: ScrollType = "top"): UseScrollReturn => {
  return useCallback(
    () =>
      window.scrollTo({
        top: scrollType === "top" ? 0 : document.body.scrollHeight,
      }),
    [scrollType]
  );
};
