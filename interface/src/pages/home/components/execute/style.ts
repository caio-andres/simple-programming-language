import styled from "styled-components";
import breakpoint from "../../../../styles/breakpoints";

export const Main = styled.main`
  @media ${breakpoint.md} {
    display: flex;
    flex-direction: column;
  }
`;

export const Exemplos = styled.div`
  @media ${breakpoint.xs} {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;
