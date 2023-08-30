import React from "react";
import debounce from "lodash.debounce";

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

  React.useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const handleResize = debounce(() => {
      setSize({
        height: window.innerHeight,
        width: window.innerWidth,
        isMobile: window.innerWidth <= 768,
        isLaptop: window.innerWidth < 1600,
        isTablet: window.innerWidth < 1024,
      });
    }, 100);

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const value = React.useMemo(() => size, [size]);

  return <WidthContext.Provider value={value} {...props} />;
}

function useWindowSize() {
  return React.useContext(WidthContext);
}

export { WidthProvider, useWindowSize, WidthContext };
