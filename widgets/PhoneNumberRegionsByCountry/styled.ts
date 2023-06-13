import styled from "styled-components";
import BaseHeader from "@/shared/ui/BaseHeader";
import Link from "next/link";
import { SectionTitle } from "@/shared/ui/BaseHeader/styled";

export const StateNameWrapper = styled(Link)`
  display: flex;
  align-items: center;
  grid-gap: 8px;
  color: ${(props) => props.theme.primary};
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
`;

export const Wrapper = styled(BaseHeader)`
  ${SectionTitle} {
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-transform: capitalize;
  }

  th:nth-child(2) {
    text-align: left;
  }
`;
