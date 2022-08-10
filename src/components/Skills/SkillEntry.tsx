import React from "react";
import { Skill } from "../../lib/characterSheet";
import { Action } from "../../lib/reducer";
import SkillProficiencyControl from "./SkillProficiencyControl";

interface SkillEntryProps {
  dispatch: React.Dispatch<Action>;
  skill: Skill;
}

const SkillEntry = (props: SkillEntryProps) => {
  const { dispatch } = props;
  return (
    <div className='flex flex-row space-x-2 mb-2'>
      <div className='tooltip tooltip-left' data-tip='Delete'>
        <button
          className='btn btn-sm btn-square btn-ghost opacity-50 rounded-none hover:opacity-100 hover:btn-error '
          onClick={() => dispatch({ t: "removeSkill", id: props.skill.id })}
        >
          —
        </button>
      </div>
      <input
        className='input input-sm rounded-none text-center'
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

export default SkillEntry;
