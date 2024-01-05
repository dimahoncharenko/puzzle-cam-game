// Imports libraries
import React, { ReactNode } from "react";
import { IoMdClose } from "react-icons/io";

// Imports styled components
import { ModalWrapper, ModalContent, CloseBtn } from "../../styled/Modal";

// Declares types
type Props = {
  children: ReactNode;
  isOpen: boolean;
  closeFunctionality: () => void;
};

export const Modal = ({ children, closeFunctionality, isOpen }: Props) => {
  return (
    <ModalWrapper isOpen={isOpen}>
      <ModalContent>
        <CloseBtn onClick={() => closeFunctionality()}>
          <IoMdClose />
        </CloseBtn>
        {children}
      </ModalContent>
    </ModalWrapper>
  );
};
