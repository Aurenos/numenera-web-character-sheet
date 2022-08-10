import React from "react";
import { Skill } from "../../lib/characterSheet";
import { Action } from "../../lib/reducer";
import SkillEntry from "./SkillEntry";

interface SkillsSectionProps {
  dispatch: React.Dispatch<Action>;
  skills: Skill[];
}

const SkillsSection = (props: SkillsSectionProps) => {
  const { dispatch } = props;
  return (
    <section className='mx-auto flex flex-col'>
      {props.skills.map(skill => (
        <SkillEntry key={skill.id} skill={skill} dispatch={dispatch} />
      ))}
      <button
        className='btn btn-primary'
        onClick={() => dispatch({ t: "addSkill" })}
      >
        Add Skill
      </button>
    </section>
  );
};

export default SkillsSection;
