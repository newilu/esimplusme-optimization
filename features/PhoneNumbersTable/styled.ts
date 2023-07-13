import styled from "styled-components";
import BaseTable from "@/shared/ui/BaseTable";
import Link from "next/link";

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

export const PurchasePhoneNumberButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  width: 100%;
  padding: 6px 12px;
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  border-radius: 6px;
  background: ${(props) => props.theme.primary};
  color: white;

  &:active {
    color: ${(props) => props.theme.primaryText};
    box-shadow: 0 0 0 1px ${(props) => props.theme.secondaryBtnBorder};
    background: ${(props) => props.theme.secondaryBtnBg};
  }
`;

export const StyledBaseTable = styled(BaseTable)`
  th {
    width: max-content;
  }
  th:last-child {
    width: 90px;
  }
` as typeof BaseTable;
