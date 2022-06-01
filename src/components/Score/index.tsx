// Imports libraries
import React, { useState } from "react";

// Imports components
import { Modal } from "../Modal";
import { FormControl } from "../FormControl";

// Imports styled components
import {
  ButtonScore,
  ScoreDisplay,
  ScoreTableHeadRow,
  ScoreTableBodyRow,
} from "../../styled/Score";

// Imports hooks
import { useForm } from "../../hooks/useForm";

// Imports assest
import logo from "../../images/PuzzleCamLogo.svg";

// Imports types
import { Record } from "../../../server/models/records";

// Declares types
type Props = {
  isOpened: boolean;
  closeFunctionality: () => void;
  time: string;
  difficulty: string;
};

type State = Record[];

export const Score = ({
  isOpened,
  closeFunctionality,
  time,
  difficulty,
}: Props) => {
  const [name, handleChangeName, { clearForm: clearName }] = useForm();
  const [records, setRecords] = useState<State>([]);
  const [scoreIsShown, setScoreIsShown] = useState(false);

  const showScore = () => {
    fetch("http://localhost:5000/records")
      .then((res) => res.json())
      .then(setRecords)
      .then(() => setScoreIsShown(true));
  };

  const addNewRecord = () => {
    if (!name.trim()) return;

    fetch("http://localhost:5000/record/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, time, difficulty }),
    })
      .then((res) => res.json())
      .catch(console.error);

    clearName();
  };

  return (
    <>
      <Modal isOpen={isOpened} closeFunctionality={closeFunctionality}>
        <img src={logo} alt="Logo" />
        <ScoreDisplay>Your time is {time}</ScoreDisplay>
        <FormControl>
          {(Input) => (
            <>
              <Input
                value={name}
                onChange={(e) => handleChangeName(e.target.value)}
                type="text"
                placeholder="Your Name..."
              />
              <ButtonScore onClick={addNewRecord}>Send</ButtonScore>
            </>
          )}
        </FormControl>
        <ButtonScore onClick={showScore}>Show score</ButtonScore>
      </Modal>

      <Modal
        isOpen={scoreIsShown}
        closeFunctionality={() => setScoreIsShown(false)}
      >
        <>
          <img src={logo} alt="Logo" />
          {scoreIsShown && records.length && (
            <table>
              <thead>
                <ScoreTableHeadRow>
                  <td>Name</td>
                  <td>Difficulty</td>
                  <td>Time</td>
                </ScoreTableHeadRow>
              </thead>
              <tbody>
                {records.map((record, index) => (
                  <ScoreTableBodyRow key={index}>
                    <td>{record.name}</td>
                    <td>{record.difficulty}</td>
                    <td>{record.time}</td>
                  </ScoreTableBodyRow>
                ))}
              </tbody>
            </table>
          )}
        </>
      </Modal>
    </>
  );
};
