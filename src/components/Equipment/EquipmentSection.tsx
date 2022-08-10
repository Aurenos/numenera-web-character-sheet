import React from "react";
import { InventoryItem, SpecialAbility } from "../../lib/characterSheet";
import { Action } from "../../lib/reducer";
import InventoryItemControl from "./InventoryItemControl";

interface SpecialAbilitiesSectionProps {
  dispatch: React.Dispatch<Action>;
  inventory: InventoryItem[];
}

const SpecialAbilitiesSection = (props: SpecialAbilitiesSectionProps) => {
  const { dispatch, inventory } = props;
  return (
    <section className='mx-auto flex flex-col'>
      {inventory.map(item => (
        <InventoryItemControl key={item.id} dispatch={dispatch} item={item} />
      ))}
      <button
        className='btn btn-primary'
        onClick={() => dispatch({ t: "addInventoryItem" })}
      >
        Add Inventory Item
      </button>
    </section>
  );
};

export default SpecialAbilitiesSection;
