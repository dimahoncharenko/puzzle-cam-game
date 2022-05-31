import styled from "@emotion/styled";

export const SelectWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  user-select: none;
`;

export const SelectInfo = styled.h2`
  text-align: center;
  margin: 0;
`;

export const SelectButton = styled.button`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  background-color: hsl(60, 80%, 60%);
  padding: 0.3em 0.5em;
  cursor: pointer;
  border: solid 0.15em black;
  border-radius: 0.5em;
`;

export const SelectList = styled.select`
  width: 100%;
  border-radius: 0.5em;
  padding: 0.3em 0.5em;
  margin: 0.3em 0;
`;
