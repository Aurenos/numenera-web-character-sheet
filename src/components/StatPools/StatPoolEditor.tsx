import React from "react";
import { StatPool, StatPoolName } from "../../lib/characterSheet";
import { Action } from "../../lib/reducer";

interface StatPoolEditorProps {
  dispatch: React.Dispatch<Action>;
  pool: StatPool;
  poolName: StatPoolName;
}

const StatPoolEditor = (props: StatPoolEditorProps) => {
  const { dispatch } = props;
  return (
    <div>
      <span>{props.poolName}</span>
      <input
        type='number'
        value={props.pool.currentValue}
        onChange={evt =>
          dispatch({
            t: "setPoolCurrent",
            pool: props.poolName,
            currentValue: parseInt(evt.target.value),
          })
        }
      />
      <input
        type='number'
        value={props.pool.maxValue}
        onChange={evt =>
          dispatch({
            t: "setPoolMaximum",
            pool: props.poolName,
            maxValue: parseInt(evt.target.value),
          })
        }
      />
      <input
        type='number'
        value={props.pool.edge}
        onChange={evt =>
          dispatch({
            t: "setPoolEdge",
            pool: props.poolName,
            edge: parseInt(evt.target.value),
          })
        }
      />
    </div>
  );
};

export default StatPoolEditor;
