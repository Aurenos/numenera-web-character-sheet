import React, { useState } from "react";
import { SpecialAbility } from "../../lib/characterSheet";
import { Action } from "../../lib/reducer";
import CollapsibleDescription from "../CollectionControls/CollapsibleDescription";
import DeleteButton from "../CollectionControls/DeleteButton";
import CollapsibleToggleButton from "../Tools/CollapsibleToggleButton";

interface SpecialAbilityControlProps {
  dispatch: React.Dispatch<Action>;
  ability: SpecialAbility;
}

const SpecialAbilityControl = (props: SpecialAbilityControlProps) => {
  const [descCollapsed, setDescCollapsed] = useState<boolean>(true);
  const { dispatch, ability } = props;
  return (
    <div className='flex flex-col mb-2 border-b border-dotted border-slate-500'>
      <div className='flex flex-row mb-2 space-x-2'>
        <DeleteButton
          onClickHandler={() => {
            const action: Action = { t: "removeAbility", id: ability.id };
            if (props.ability.name !== "") {
              dispatch({
                t: "promptActionConfirmation",
                action: action,
                confirmationText: `Are you sure you want to delete the ability: ${props.ability.name}`,
              });
            } else {
              dispatch(action);
            }
          }}
        />
        <input
          className='text-center text-lg flex-grow input input-sm input-accent rounded-sm border-none'
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
        <CollapsibleToggleButton
          onClickHandler={() => setDescCollapsed(!descCollapsed)}
          isCollapsed={descCollapsed}
          toolTip={`${descCollapsed ? "Show" : "Hide"} Description`}
        />
      </div>
      <CollapsibleDescription
        description={ability.description}
        placeholder='Ability Description'
        descVisible={!descCollapsed}
        onChangeHandler={evt =>
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
