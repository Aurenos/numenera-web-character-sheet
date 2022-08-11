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
    <section className='flex flex-col prose'>
      <h2>Pools</h2>
      <div className='flex flex-row space-x-2'>
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
      </div>
    </section>
  );
};

export default StatPools;
