import styled from "styled-components";
import breakpoint from "../../../../styles/breakpoints";

export const Main = styled.main`
  @media ${breakpoint.md} {
    display: flex;
    flex-direction: column;
  }
`;
