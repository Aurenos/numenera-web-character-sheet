import React from "react";
import { Cypher } from "../../lib/characterSheet";
import { Action } from "../../lib/reducer";
import CypherControl from "./CypherControl";

interface CyphersSectionProps {
  dispatch: React.Dispatch<Action>;
  cyphers: Cypher[];
  cypherLimit: number;
}

const CyphersSection = (props: CyphersSectionProps) => {
  const { dispatch } = props;
  return (
    <section className='flex flex-col prose'>
      <h2>Cyphers</h2>
      <div className='flex flex-row space-x-4'>
        <div className='form-control w-24'>
          <label className='label mx-auto'>
            <span className='label-text'>Cypher Limit</span>
          </label>
          <input
            className='input input-bordered text-center input-primary w-12 mx-auto'
            type='number'
            value={props.cypherLimit}
            onChange={evt =>
              dispatch({
                t: "setCypherLimit",
                cypherLimit: parseInt(evt.target.value),
              })
            }
          />
        </div>
        <div className='divider divider-horizontal' />
        <div className='flex flex-col justify-end flex-grow'>
          {props.cyphers.map(cypher => (
            <CypherControl
              key={cypher.id}
              cypher={cypher}
              dispatch={dispatch}
            />
          ))}
          <button
            className='btn btn-primary w-1/2 mx-auto'
            onClick={() => dispatch({ t: "addCypher" })}
          >
            Add Cypher
          </button>
        </div>
      </div>
    </section>
  );
};

export default CyphersSection;
