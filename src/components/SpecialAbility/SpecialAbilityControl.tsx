import React, { useState } from "react";
import { SpecialAbility } from "../../lib/characterSheet";
import { Action } from "../../lib/reducer";

interface SpecialAbilityControlProps {
  dispatch: React.Dispatch<Action>;
  ability: SpecialAbility;
}

const SpecialAbilityControl = (props: SpecialAbilityControlProps) => {
  const [descVisible, setDescVisible] = useState<boolean>(false);
  const { dispatch, ability } = props;
  return (
    <div className='flex flex-col mb-2'>
      <div className='flex flex-row mb-2 space-x-2'>
        <div className='tooltip tooltip-left' data-tip='Delete'>
          <button
            className='btn btn-sm btn-square btn-ghost opacity-50 rounded-none hover:opacity-100 hover:btn-error '
            onClick={() => dispatch({ t: "removeAbility", id: ability.id })}
          >
            —
          </button>
        </div>
        <input
          className='text-center'
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
        <button
          className='btn btn-sm btn-square btn-ghost text-xl text-gray-600'
          onClick={() => setDescVisible(!descVisible)}
        >
          {descVisible ? "^" : "v"}
        </button>
      </div>
      <div
        className={`collapse collapse-${descVisible ? "open" : "close"} w-full`}
      >
        <div className='flex collapse-content'>
          <textarea
            className='textarea p-1 w-full rounded-none'
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
      </div>
    </div>
  );
};

export default SpecialAbilityControl;
