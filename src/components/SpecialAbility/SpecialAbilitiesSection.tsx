import React from "react";
import { SpecialAbility } from "../../lib/characterSheet";
import { Action } from "../../lib/reducer";
import SpecialAbilityControl from "./SpecialAbilityControl";

interface SpecialAbilitiesSectionProps {
  dispatch: React.Dispatch<Action>;
  abilities: SpecialAbility[];
}

const SpecialAbilitiesSection = (props: SpecialAbilitiesSectionProps) => {
  const { dispatch, abilities } = props;

  return (
    <section className='flex flex-col prose'>
      <h2>Special Abilities </h2>
      <div className='flex flex-col'>
        {abilities.map(ability => (
          <SpecialAbilityControl
            key={ability.id}
            dispatch={dispatch}
            ability={ability}
          />
        ))}
      </div>
      <button
        className='btn btn-primary w-1/2 mx-auto'
        onClick={() => dispatch({ t: "addAbility" })}
      >
        Add Ability
      </button>
    </section>
  );
};

export default SpecialAbilitiesSection;
