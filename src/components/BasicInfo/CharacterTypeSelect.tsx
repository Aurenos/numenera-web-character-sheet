import React from "react";
import { CharacterType } from "../../lib/characterSheet";
import { Action } from "../../lib/reducer";

interface CharacterTypeSelectProps {
  dispatch: React.Dispatch<Action>;
  characterType: string;
  className?: string;
}

const CharacterTypeSelect = (props: CharacterTypeSelectProps) => {
  const { dispatch } = props;
  return (
    <select
      className='select select-primary border-none text-center text-base text-primary pl-10'
      value={props.characterType}
      onChange={evt =>
        dispatch({
          t: "setCharType",
          characterType: evt.target.value as CharacterType,
        })
      }
    >
      <option value='Glaive'>Glaive</option>
      <option value='Jack'>Jack</option>
      <option value='Nano'>Nano</option>
    </select>
  );
};

export default CharacterTypeSelect;
