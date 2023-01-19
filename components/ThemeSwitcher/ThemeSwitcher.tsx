import React from "react";
import Image from "next/image";
import sun from "public/staticfiles/sun.svg";
import moon from "public/staticfiles/moon.svg";
import { useTheme } from "context/ThemeContext";
import { Wrapper, Label } from "./styled";

type ThemeSwitcherProps = {
  disableTransition?: boolean;
  size?: "medium" | "small";
};

function ThemeSwitcher({
  disableTransition = false,
  size = "medium",
}: ThemeSwitcherProps) {
  const { isDarkTheme, toggleTheme } = useTheme();
  const [checked, setChecked] = React.useState(isDarkTheme);

  React.useEffect(() => {
    setChecked(isDarkTheme);
  }, [isDarkTheme]);

  return (
    <Wrapper size={size}>
      <Label
        disableTransition={disableTransition}
        checked={checked}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          toggleTheme();
        }}
      >
        <input type="checkbox" onChange={toggleTheme} checked={checked} />
        <div>
          <div>
            <Image src={sun} alt="light theme sun" />
            <Image src={moon} alt="dark theme moon" />
          </div>
        </div>
      </Label>
    </Wrapper>
  );
}

export { ThemeSwitcher };
