import styled from "@emotion/styled";

export const ModalWrapper = styled.div<{
  isOpen: boolean;
}>`
  display: ${(props) => (props.isOpen ? "flex" : "none")};
  background-color: hsla(0, 0%, 100%, 0.3);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  align-items: center;
  justify-content: center;
`;

export const ModalContent = styled.div`
  display: flex;
  padding: max(3vw, 1em);
  align-items: center;
  justify-items: center;
  flex-direction: column;
  background-color: white;
  border: solid 0.2em gray;
  border-radius: 1em;
  position: relative;
  gap: 0.5em;
`;

export const CloseBtn = styled.button`
  background-color: transparent;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0.5em;
  right: 0.5em;
  padding: 0;
  border: 0;
  cursor: pointer;
  font-size: 2rem;
`;
