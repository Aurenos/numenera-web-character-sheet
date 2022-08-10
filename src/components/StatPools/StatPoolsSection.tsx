import React from "react";
import { Action, State } from "../../lib/reducer";
import StatPoolEditor from "./StatPoolEditor";

interface StatPoolsProps {
  dispatch: React.Dispatch<Action>;
  state: State;
}

const StatPools = (props: StatPoolsProps) => {
  const { dispatch, state } = props;
  return (
    <section className='mx-auto'>
      <StatPoolEditor
        poolName='Might'
        pool={state.sheet.mightPool}
        dispatch={dispatch}
      />
      <StatPoolEditor
        poolName='Speed'
        pool={state.sheet.speedPool}
        dispatch={dispatch}
      />
      <StatPoolEditor
        poolName='Intellect'
        pool={state.sheet.intellectPool}
        dispatch={dispatch}
      />
    </section>
  );
};

export default StatPools;
