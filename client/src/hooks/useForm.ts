// Imports libraries
import { useState } from "react";

// Declares types
type Handler = (value: string) => void;
type Utils = {
  clearForm: () => void;
};
type Output = [string, Handler, Utils];

export const useForm = (): Output => {
  const [value, setValue] = useState("");

  const handleChange = (value: string) => {
    setValue(value);
  };

  const clearForm = () => {
    setValue("");
  };

  return [value, handleChange, { clearForm }];
};
