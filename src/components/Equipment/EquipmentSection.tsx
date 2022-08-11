import React from "react";
import { InventoryItem, SpecialAbility } from "../../lib/characterSheet";
import { Action } from "../../lib/reducer";
import InventoryItemControl from "./InventoryItemControl";

interface EquipmentSectionProps {
  dispatch: React.Dispatch<Action>;
  inventory: InventoryItem[];
  armor: number;
}

const EquipmentSection = (props: EquipmentSectionProps) => {
  const { dispatch, inventory } = props;
  return (
    <section className='flex flex-col prose'>
      <h2>Equipment</h2>
      <div className='flex flex-row space-x-4'>
        <div className='form-control w-24'>
          <label className='label mx-auto'>
            <span className='label-text'>Armor</span>
          </label>
          <input
            className='input input-bordered text-center input-primary w-12 mx-auto'
            placeholder='Armor'
            type='number'
            value={props.armor}
            onChange={evt =>
              dispatch({ t: "setArmor", armor: parseInt(evt.target.value) })
            }
          />
        </div>
        <div className='divider divider-horizontal' />
        <div className='flex flex-col justify-end flex-grow'>
          {inventory.map(item => (
            <InventoryItemControl
              key={item.id}
              dispatch={dispatch}
              item={item}
            />
          ))}
          <button
            className='btn btn-primary align-baseline w-1/2 mx-auto'
            onClick={() => dispatch({ t: "addInventoryItem" })}
          >
            Add Inventory Item
          </button>
        </div>
      </div>
    </section>
  );
};

export default EquipmentSection;
