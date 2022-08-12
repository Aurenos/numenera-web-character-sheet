import React, { useState } from "react";
import { Cypher } from "../../lib/characterSheet";
import { Action } from "../../lib/reducer";
import CollapsibleDescription from "../CollectionControls/CollapsibleDescription";
import DeleteButton from "../CollectionControls/DeleteButton";
import CollapsibleToggleButton from "../Tools/CollapsibleToggleButton";

interface CypherControlProps {
  dispatch: React.Dispatch<Action>;
  cypher: Cypher;
}

const CypherControl = (props: CypherControlProps) => {
  const [descCollapsed, setDescCollapsed] = useState<boolean>(true);
  const { dispatch, cypher } = props;
  return (
    <div className='flex flex-col mb-2 border-b border-dotted border-slate-500'>
      <div className='flex flex-row mb-2 space-x-2'>
        <DeleteButton
          onClickHandler={() => {
            const action: Action = { t: "removeCypher", id: cypher.id };
            if (props.cypher.name !== "") {
              dispatch({
                t: "promptActionConfirmation",
                action: action,
                confirmationText: `Are you sure you want to delete the cypher: ${props.cypher.name}`,
              });
            } else {
              dispatch(action);
            }
          }}
        />

        <input
          className='text-center flex-grow input input-sm text-lg rounded-sm input-accent border-none'
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
        <CollapsibleToggleButton
          onClickHandler={() => setDescCollapsed(!descCollapsed)}
          isCollapsed={descCollapsed}
          toolTip={`${descCollapsed ? "Show" : "Hide"} Description`}
        />
      </div>
      <CollapsibleDescription
        description={cypher.description}
        placeholder='Cypher Description'
        descVisible={!descCollapsed}
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
