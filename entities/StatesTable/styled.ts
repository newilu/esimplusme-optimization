import styled from "styled-components";
import BaseTable from "@/shared/ui/BaseTable";
import Link from "next/link";

export const StateNameWrapper = styled(Link)`
  display: flex;
  align-items: center;
  grid-gap: 8px;
  color: ${(props) => props.theme.primary};
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
`;

export const Wrapper = styled(BaseTable)`` as typeof BaseTable;
