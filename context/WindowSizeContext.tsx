import React from "react";
import { useDebounce } from "use-debounce";

const WidthContext = React.createContext({
  isMobile: false,
  isLaptop: false,
  isTablet: false,
  height: 0,
  width: 0,
});

function WidthProvider<T extends {}>(props: T) {
  const [size, setSize] = React.useState({
    isMobile: false,
    isLaptop: false,
    isTablet: false,
    height: 0,
    width: 0,
  });
  const [debouncedSize] = useDebounce(size, 100);

  const value = React.useMemo(() => debouncedSize, [debouncedSize]);

  React.useEffect(() => {
    if (typeof window === "undefined") return undefined;
    function handleResize() {
      setSize({
        height: window.innerHeight,
        width: window.innerWidth,
        isMobile: window.innerWidth <= 768,
        isLaptop: window.innerWidth < 1600,
        isTablet: window.innerWidth < 1024,
      });
    }

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return <WidthContext.Provider value={value} {...props} />;
}

function useWindowSize() {
  return React.useContext(WidthContext);
}

export { WidthProvider, useWindowSize, WidthContext };
