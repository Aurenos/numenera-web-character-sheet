import React from "react";
import { Skill } from "../../lib/characterSheet";
import { Action } from "../../lib/reducer";
import DeleteButton from "../CollectionControls/DeleteButton";
import SkillProficiencyControl from "./SkillProficiencyControl";

interface SkillControlProps {
  dispatch: React.Dispatch<Action>;
  skill: Skill;
}

const SkillControl = (props: SkillControlProps) => {
  const { dispatch } = props;
  return (
    <div className='flex flex-row space-x-2 mb-2 border-b border-dotted border-slate-500 pb-2'>
      <DeleteButton
        onClickHandler={() =>
          dispatch({ t: "removeSkill", id: props.skill.id })
        }
      />
      <input
        className='input input-sm rounded-none text-center flex-grow text-lg'
        type='text'
        placeholder='Skill Name'
        value={props.skill.name}
        onChange={evt =>
          dispatch({
            t: "setSkillName",
            id: props.skill.id,
            name: evt.target.value,
          })
        }
      />
      <SkillProficiencyControl
        skillId={props.skill.id}
        proficiency={props.skill.proficiency}
        dispatch={dispatch}
      />
    </div>
  );
};

export default SkillControl;
