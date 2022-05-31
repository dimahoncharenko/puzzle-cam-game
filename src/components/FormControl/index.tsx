// Imports libraries
import React, { ReactNode } from "react";

// Imports styled components
import { FormControlWrapper, FormControlInput } from "../../styled/FormControl";

// Declares types
type Props = {
  direction?: "column" | "row";
  children(input: typeof FormControlInput): ReactNode;
};

export const FormControl = ({ children, direction = "row" }: Props) => {
  return (
    <FormControlWrapper direction={direction}>
      {children(FormControlInput)}
    </FormControlWrapper>
  );
};
