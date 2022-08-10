import React from "react";
import { SpecialAbility } from "../../lib/characterSheet";
import { Action } from "../../lib/reducer";

interface SpecialAbilityControlProps {
  dispatch: React.Dispatch<Action>;
  ability: SpecialAbility;
}

const SpecialAbilityControl = (props: SpecialAbilityControlProps) => {
  const { dispatch, ability } = props;
  return (
    <div className='flex flex-col'>
      <div className='flex flex-row mb-2'>
        <div className='tooltip tooltip-left' data-tip='Delete'>
          <button
            className='btn btn-sm btn-square btn-ghost opacity-50 rounded-none hover:opacity-100 hover:btn-error '
            onClick={() => dispatch({ t: "removeAbility", id: ability.id })}
          >
            —
          </button>
        </div>
        <input
          type='text'
          placeholder='Ability Name'
          value={ability.name}
          onChange={evt =>
            dispatch({
              t: "setAbilityName",
              id: ability.id,
              name: evt.target.value,
            })
          }
        />
      </div>
      <textarea
        placeholder='Ability Description'
        value={ability.description}
        onChange={evt =>
          dispatch({
            t: "setAbilityDescription",
            id: ability.id,
            description: evt.target.value,
          })
        }
      />
    </div>
  );
};

export default SpecialAbilityControl;
