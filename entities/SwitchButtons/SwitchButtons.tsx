import React from "react";
import ArrowIcon from "./assets/ArrowRight";
import { useWindowSize } from "context/WindowSizeContext";
import { uuid } from "utils/common";
import { SwitchButton, Wrapper } from "./styled";

const id = uuid();

function SwitchButtons({
  options,
  value,
  onChange,
  styledAsDropdown,
}: {
  styledAsDropdown?: boolean;
  value?: { label: React.ReactNode; value: string };
  options: { label: React.ReactNode; value: string }[];
  onChange: (props: { label: React.ReactNode; value: string }) => void;
}) {
  const { isMobile } = useWindowSize();
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const [activeButton, setActiveButton] = React.useState<
    { label: React.ReactNode; value: string } | undefined
  >(value ?? options[0]);

  const handleSelectButton = (el: {
    label: React.ReactNode;
    value: string;
  }) => {
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
  }, [isDropdownOpen, styledAsDropdown, options.length]);

  return (
    <Wrapper
      id={id}
      isOpen={isDropdownOpen}
      isStyledAsDropdown={styledAsDropdown}
    >
      {isMobile && styledAsDropdown && (
        <SwitchButton
          $isSelected
          onClick={() => setIsDropdownOpen((prev) => !prev)}
        >
          <div>{activeButton?.label}</div>
          <ArrowIcon />
        </SwitchButton>
      )}
      {options.map((el, idx) => (
        <SwitchButton
          key={idx}
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
