import React, { useState } from "react";
import { Skill } from "../../lib/characterSheet";
import { Action } from "../../lib/reducer";
import CollapsibleToggleButton from "../Tools/CollapsibleToggleButton";
import Collapsible from "../Tools/Collapsible";
import SkillControl from "./SkillControl";

interface SkillsSectionProps {
  dispatch: React.Dispatch<Action>;
  skills: Skill[];
}

const SkillsSection = (props: SkillsSectionProps) => {
  const { dispatch } = props;
  return (
    <section className='flex flex-col prose'>
      <h2>Skills</h2>
      <div className='flex flex-col'>
        {props.skills.map(skill => (
          <SkillControl key={skill.id} skill={skill} dispatch={dispatch} />
        ))}
      </div>
      <button
        className='btn btn-primary w-1/2 mx-auto'
        onClick={() => dispatch({ t: "addSkill" })}
      >
        Add Skill
      </button>
    </section>
  );
};

export default SkillsSection;
