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
    <section className='mx-auto flex flex-col'>
      {abilities.map(ability => (
        <SpecialAbilityControl
          key={ability.id}
          dispatch={dispatch}
          ability={ability}
        />
      ))}
      <button
        className='btn btn-primary'
        onClick={() => dispatch({ t: "addAbility" })}
      >
        Add Ability
      </button>
    </section>
  );
};

export default SpecialAbilitiesSection;
