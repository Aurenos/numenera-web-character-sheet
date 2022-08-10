import React from "react";
import Select from "react-select";
import { CharacterType } from "../lib/characterSheet";
import { Action } from "../lib/reducer";

type OptionType = {
  value: string;
  label: string;
};

const CTypeOptions: OptionType[] = [
  { value: "Glaive", label: "Glaive" },
  { value: "Jack", label: "Jack" },
  { value: "Nano", label: "Nano" },
];

interface CharacterTypeSelectProps {
  dispatch: React.Dispatch<Action>;
  characterType: string;
  className?: string;
}

const CharacterTypeSelect = (props: CharacterTypeSelectProps) => {
  const { dispatch } = props;
  return (
    <Select
      className={props.className}
      options={CTypeOptions}
      isClearable={false}
      value={
        CTypeOptions.find(ctype => ctype.value === props.characterType) ||
        CTypeOptions[0]
      }
      onChange={option =>
        dispatch({
          t: "setCharType",
          characterType:
            option !== null ? (option.value as CharacterType) : "Glaive",
        })
      }
    />
  );
};

export default CharacterTypeSelect;
