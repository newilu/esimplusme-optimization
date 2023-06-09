import styled from "styled-components";
import BaseHeader from "@/shared/ui/BaseHeader";

export const PhoneNumber = styled.div`
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.1px;
  color: ${(props) => props.theme.primaryText};
`;
export const PhoneNumberType = styled.div`
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.1px;
  color: ${(props) => props.theme.primary};
  margin-bottom: 5px;
  text-transform: capitalize;
`;

export const SvgWrapper = styled.div<{ active?: boolean }>`
  color: ${(props) =>
    props.active ? props.theme.primary : props.theme.svgDisabledColor};
`;

export const Wrapper = styled(BaseHeader)``;
