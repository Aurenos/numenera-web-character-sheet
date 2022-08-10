import React, { useState } from "react";
import { Cypher } from "../../lib/characterSheet";
import { Action } from "../../lib/reducer";

interface CypherControlProps {
  dispatch: React.Dispatch<Action>;
  cypher: Cypher;
}

const CypherControl = (props: CypherControlProps) => {
  const [descVisible, setDescVisible] = useState<boolean>(false);
  const { dispatch, cypher } = props;
  return (
    <div className='flex flex-col mb-2'>
      <div className='flex flex-row mb-2 space-x-2'>
        <div className='tooltip tooltip-left' data-tip='Delete'>
          <button
            className='btn btn-sm btn-square btn-ghost opacity-50 rounded-none hover:opacity-100 hover:btn-error '
            onClick={() => dispatch({ t: "removeCypher", id: cypher.id })}
          >
            —
          </button>
        </div>
        <input
          className='text-center'
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
        <div className='tooltip' data-tip='Level'>
          <input
            className='input input-bordered input-sm w-16'
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
        </div>
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
            placeholder='Cypher Description'
            value={cypher.description}
            onChange={evt =>
              dispatch({
                t: "setCypherDescription",
                id: cypher.id,
                description: evt.target.value,
              })
            }
          />
        </div>
      </div>
    </div>
  );
};

export default CypherControl;
