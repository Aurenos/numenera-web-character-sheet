import React from "react";
import { SkillProficiency } from "../../lib/characterSheet";
import { Action } from "../../lib/reducer";

interface SkillProficiencyControlProps {
  dispatch: React.Dispatch<Action>;
  skillId: string;
  proficiency: SkillProficiency;
}

const SkillProficiencyControl = (props: SkillProficiencyControlProps) => {
  const { proficiency, skillId, dispatch } = props;
  const baseClasses = "btn btn-square btn-sm rounded-none text-lg ";
  return (
    <div className='form-control outline outline-1 flex flex-row'>
      <div className='tooltip' data-tip='Trained'>
        <button
          className={
            baseClasses +
            "btn-secondary " +
            (proficiency === "Trained" ? "" : "btn-ghost")
          }
          onClick={() =>
            dispatch({
              t: "setSkillProficiency",
              id: skillId,
              proficiency: "Trained",
            })
          }
        >
          T
        </button>
      </div>
      <div className='tooltip' data-tip='Specialized'>
        <button
          className={
            baseClasses +
            "btn-primary " +
            (proficiency === "Specialized" ? "" : "btn-ghost")
          }
          onClick={() =>
            dispatch({
              t: "setSkillProficiency",
              id: skillId,
              proficiency: "Specialized",
            })
          }
        >
          S
        </button>
      </div>
      <div className='tooltip' data-tip='Inability'>
        <button
          className={
            baseClasses +
            "btn-accent " +
            (proficiency === "Inability" ? "" : "btn-ghost")
          }
          onClick={() =>
            dispatch({
              t: "setSkillProficiency",
              id: skillId,
              proficiency: "Inability",
            })
          }
        >
          I
        </button>
      </div>
    </div>
  );
};

export default SkillProficiencyControl;
