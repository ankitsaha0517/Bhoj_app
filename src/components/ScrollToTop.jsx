import { useEffect } from "react";
import { useLocation } from "react-router";

/**
 * ScrollToTop Component
 * Ensures that whenever the route pathname changes, the browser scroll position
 * resets immediately to the very top (y = 0) of the page.
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;

