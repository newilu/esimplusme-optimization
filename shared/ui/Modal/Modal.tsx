import React from "react";
import Image from "next/image";
import xmark from "@/shared/assets/images/xmark.svg";
import { Title, Content, Blur, Wrapper, FullscreenWrapper } from "./styled";

export interface ModalProps
  extends Omit<
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDialogElement>,
      HTMLDialogElement
    >,
    "title"
  > {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  content: React.ReactNode;
  onClose: () => void;
  isOpen: boolean;
}

const Modal = React.forwardRef<any, ModalProps>(
  ({ title, subtitle, content, onClose, isOpen, ...props }, ref) => {
    return (
      <FullscreenWrapper isOpen={isOpen}>
        {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
        <Wrapper ref={ref as any} {...props} open={isOpen}>
          <div>
            <Blur />
            <Content>
              <Title>
                <div>
                  <div>{title}</div>
                  {subtitle && <div>{subtitle}</div>}
                </div>
                <button onClick={onClose}>
                  <Image width={14} height={14} src={xmark} alt="x mark" />
                </button>
              </Title>
              {content}
            </Content>
          </div>
        </Wrapper>
      </FullscreenWrapper>
    );
  }
);

export { Modal };
