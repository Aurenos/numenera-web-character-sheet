import React from "react";
import { Cypher } from "../../lib/characterSheet";
import { Action } from "../../lib/reducer";
import CypherControl from "./CypherControl";

interface CyphersSectionProps {
  dispatch: React.Dispatch<Action>;
  cyphers: Cypher[];
}

const CyphersSection = (props: CyphersSectionProps) => {
  const { dispatch } = props;
  return (
    <section className='mx-auto flex flex-col'>
      {props.cyphers.map(cypher => (
        <CypherControl key={cypher.id} cypher={cypher} dispatch={dispatch} />
      ))}
      <button
        className='btn btn-primary'
        onClick={() => dispatch({ t: "addCypher" })}
      >
        Add Cypher
      </button>
    </section>
  );
};

export default CyphersSection;
