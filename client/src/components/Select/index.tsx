// Imports libraries
import React, { useState, ChangeEvent } from "react";

// Imports styled components
import { SelectInfo, SelectButton, SelectList } from "../../styled/Select";

// Declares types
type Props = {
  start: (difficulty: string) => void;
  initDifficulty: string;
  displayValue: string;
};
export const Select = ({ start, initDifficulty, displayValue }: Props) => {
  const [difficulty, setDifficulty] = useState(initDifficulty);

  const handleChange = ({
    target: { value },
  }: ChangeEvent<HTMLSelectElement>) => {
    setDifficulty(value);
  };

  return (
    <div>
      <SelectList title="Difficulty" value={difficulty} onChange={handleChange}>
        <option value="Easy">Easy</option>
        <option value="Medium">Medium</option>
        <option value="Hard">Hard</option>
        <option value="Extreme">Extreme</option>
      </SelectList>
      <SelectButton onClick={() => start(difficulty)}>Start Game!</SelectButton>
      <SelectInfo>{displayValue}</SelectInfo>
    </div>
  );
};
