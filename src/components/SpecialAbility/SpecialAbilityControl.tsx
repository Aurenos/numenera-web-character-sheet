import React, { useState } from "react";
import { SpecialAbility } from "../../lib/characterSheet";
import { Action } from "../../lib/reducer";
import CollapsibleDescription from "../CollectionControls/CollapsibleDescription";
import DeleteButton from "../CollectionControls/DeleteButton";
import DescriptionToggleButton from "../CollectionControls/DescriptionToggleButton";

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
        <DeleteButton
          onClickHandler={() =>
            dispatch({ t: "removeAbility", id: ability.id })
          }
        />
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
        <DescriptionToggleButton
          onClickHandler={() => setDescVisible(!descVisible)}
          descVisible={descVisible}
        />
      </div>
      <CollapsibleDescription
        description={ability.description}
        descVisible={descVisible}
        onChangeHandler={evt =>
          dispatch({
            t: "setCypherDescription",
            id: ability.id,
            description: evt.target.value,
          })
        }
      />
    </div>
  );
};

export default SpecialAbilityControl;
