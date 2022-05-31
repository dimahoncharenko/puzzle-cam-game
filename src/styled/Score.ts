import styled from "@emotion/styled";

export const ButtonScore = styled.button`
  display: flex;
  border-radius: 0.5em;
  align-items: center;
  justify-content: center;
  padding: 1em;
  background-color: hsl(190, 30%, 60%);
  cursor: pointer;
  color: white;
  border: solid 0.15em hsl(177, 9%, 33%);
  transition: background-color 0.2s linear;
  width: 100%;

  &:hover {
    background-color: orange;
  }
`;

export const ScoreDisplay = styled.span`
  font-size: clamp(1.2rem, 2vw + 0.2rem, 2rem);
  margin-bottom: 0.5em;
`;

export const ScoreTableHeadRow = styled.tr`
  background-color: hsl(240, 92%, 86%);
  color: white;
  text-align: center;

  > td {
    padding: 0.15em 0.3em;
  }
`;

export const ScoreTableBodyRow = styled.tr`
  background-color: hsl(240, 92%, 95%);
  text-align: center;

  > td {
    padding: 0.15em 0.3em;
  }
`;
