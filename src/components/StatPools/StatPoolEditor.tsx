import React from "react";
import { match } from "ts-pattern";
import { StatPool, StatPoolName } from "../../lib/characterSheet";
import { Action } from "../../lib/reducer";

interface StatPoolEditorProps {
  dispatch: React.Dispatch<Action>;
  pool: StatPool;
  poolName: StatPoolName;
}

const StatPoolEditor = (props: StatPoolEditorProps) => {
  const { dispatch } = props;
  const poolColor = match<StatPoolName, string>(props.poolName)
    .with("Might", () => "bg-red-300")
    .with("Speed", () => "bg-yellow-300")
    .with("Intellect", () => "bg-blue-300")
    .exhaustive();
  return (
    <div className='flex flex-col border border-neutral rounded-lg'>
      <h4 className='mx-auto my-0'>{props.poolName}</h4>
      <div className='grid grid-cols-2 grid-rows-2'>
        <div className='col-span-2 flex flex-col border-b p-1 border-neutral'>
          <input
            className='input input-ghost w-full mx-auto text-2xl text-center border-none focus:outline-none focus:bg-transparent'
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
          <span className='text-xs mx-auto'>Current</span>
        </div>
        <div
          className={`flex flex-col p-1 border-r border-neutral rounded-bl-lg ${poolColor}`}
        >
          <input
            className='input input-ghost w-full mx-auto text-xl text-center border-none focus:outline-none focus:bg-transparent'
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
          <span className='text-xs mx-auto'>Maximum</span>
        </div>
        <div className={`flex flex-col p-1 rounded-br-lg ${poolColor}`}>
          <input
            className='input input-ghost w-full mx-auto text-lg text-center border-none focus:outline-none focus:bg-transparent'
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
          <span className='text-xs mx-auto'>Edge</span>
        </div>
      </div>
    </div>
  );
};

export default StatPoolEditor;
