import React from "react";
import ArrowIcon from "./assets/ArrowRight";
import { useWindowSize } from "context/WindowSizeContext";
import { SwitchButton, Wrapper } from "./styled";
import { CSSObject } from "styled-components";

function SwitchButtons<
  Option extends {
    label: React.ReactNode;
    value: string;
  } & (OptionAs extends "a" ? { href: string } : { href?: never }),
  OptionAs extends string | undefined = undefined
>({
  options,
  optionAs = "button",
  value,
  onChange = () => {},
  styledAsDropdown,
  style,
}: {
  optionAs?: OptionAs;
  style?: CSSObject;
  styledAsDropdown?: boolean;
  value?: Option;
  options: Option[];
  onChange?: (props: Option) => void;
}) {
  const { isMobile } = useWindowSize();
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const [activeButton, setActiveButton] = React.useState<Option | undefined>(
    value ?? options[0]
  );

  const id = React.useId();

  const handleSelectButton = (el: Option) => {
    if (isMobile) setIsDropdownOpen(false);
    onChange(el);
    setActiveButton(el);
  };

  React.useEffect(() => {
    if (value) setActiveButton(value);
  }, [value]);

  React.useEffect(() => {
    const wrapper = document.getElementById(id);
    if (wrapper && styledAsDropdown) {
      const baseHeight = (wrapper.firstElementChild?.scrollHeight ?? 50) + 10;

      wrapper.style.maxHeight = isDropdownOpen
        ? `${(options.length + 1) * baseHeight}px`
        : `${baseHeight}px`;
    }
  }, [isDropdownOpen, styledAsDropdown, options.length, id]);

  return (
    <Wrapper
      id={id}
      isOpen={isDropdownOpen}
      isStyledAsDropdown={styledAsDropdown}
      style={style}
    >
      {isMobile && styledAsDropdown && (
        <SwitchButton
          $isSelected
          as={optionAs as OptionAs}
          onClick={() => setIsDropdownOpen((prev) => !prev)}
        >
          <div>{activeButton?.label}</div>
          <ArrowIcon />
        </SwitchButton>
      )}
      {options.map((el, idx) => (
        <SwitchButton
          key={idx}
          as={optionAs as OptionAs}
          href={el.href}
          $isSelected={activeButton?.value === el.value}
          onClick={() => handleSelectButton(el)}
        >
          <div>{el.label}</div>
        </SwitchButton>
      ))}
    </Wrapper>
  );
}

export { SwitchButtons };
