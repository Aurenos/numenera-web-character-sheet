import React, { useState } from "react";
import { Cypher } from "../../lib/characterSheet";
import { Action } from "../../lib/reducer";
import CollapsibleDescription from "../CollectionControls/CollapsibleDescription";
import DeleteButton from "../CollectionControls/DeleteButton";
import DescriptionToggleButton from "../CollectionControls/DescriptionToggleButton";

interface CypherControlProps {
  dispatch: React.Dispatch<Action>;
  cypher: Cypher;
}

const CypherControl = (props: CypherControlProps) => {
  const [descVisible, setDescVisible] = useState<boolean>(false);
  const { dispatch, cypher } = props;
  return (
    <div className='flex flex-col mb-2 border-b border-dotted border-slate-500'>
      <div className='flex flex-row mb-2 space-x-2'>
        <DeleteButton
          onClickHandler={() => dispatch({ t: "removeCypher", id: cypher.id })}
        />

        <input
          className='text-center flex-grow input input-sm text-lg rounded-none'
          type='text'
          placeholder='Cypher Name'
          value={cypher.name}
          onChange={evt =>
            dispatch({
              t: "setCypherName",
              id: cypher.id,
              name: evt.target.value,
            })
          }
        />
        <label className='input-group w-auto'>
          <span className='px-2'>Level</span>
          <input
            className='input input-bordered input-sm w-12 text-lg text-center'
            type='number'
            value={cypher.level}
            onChange={evt =>
              dispatch({
                t: "setCypherLevel",
                id: cypher.id,
                level: parseInt(evt.target.value),
              })
            }
          />
        </label>
        <DescriptionToggleButton
          onClickHandler={() => setDescVisible(!descVisible)}
          descVisible={descVisible}
        />
      </div>
      <CollapsibleDescription
        description={cypher.description}
        placeholder='Cypher Description'
        descVisible={descVisible}
        onChangeHandler={evt =>
          dispatch({
            t: "setCypherDescription",
            id: cypher.id,
            description: evt.target.value,
          })
        }
      />
    </div>
  );
};

export default CypherControl;
