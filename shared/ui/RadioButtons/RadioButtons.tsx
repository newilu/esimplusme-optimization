import React, { ReactElement, ReactNode } from 'react';
import { Wrapper } from './styled';
import Checkbox from '../Checkbox';

export type RadioButtonsItem<T = number> = {
  value: T;
  title: string | ReactNode;
  disabled?: boolean
};

export type RadioButtonsProps<T> = {
  items: RadioButtonsItem<T>[];
  value?: T;
  onChange?: (checked: T) => void;
};

const RadioButtons: <T = number>(p: RadioButtonsProps<T>) => ReactElement = ({
  items,
  value,
  onChange,
}) => {

  return (
    <>
      {items.map((item) => {
        const radioButton = (
          <Wrapper
            $disabled={item.disabled}
            $checked={value === item.value}
            key={String(item.value)}
            onClick={() => {
              onChange?.(item.value);
            }}>
            {item.title}
            <Checkbox
              checked={value === item.value}
              type='radio'
              color="#54C7FC"
            />
          </Wrapper>
        );

        return radioButton;
      })}
    </>
  );
};

export { RadioButtons };