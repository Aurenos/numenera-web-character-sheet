import React, { useState } from "react";
import { InventoryItem } from "../../lib/characterSheet";
import { Action } from "../../lib/reducer";
import CollapsibleDescription from "../CollectionControls/CollapsibleDescription";
import DeleteButton from "../CollectionControls/DeleteButton";
import DescriptionToggleButton from "../CollectionControls/DescriptionToggleButton";

interface InventoryItemControlProps {
  dispatch: React.Dispatch<Action>;
  item: InventoryItem;
}

const InventoryItemControl = (props: InventoryItemControlProps) => {
  const [descVisible, setDescVisible] = useState<boolean>(false);
  const { dispatch, item } = props;
  return (
    <div className='flex flex-col mb-2'>
      <div className='flex flex-row mb-2 space-x-2'>
        <DeleteButton
          onClickHandler={() =>
            dispatch({ t: "removeInventoryItem", id: item.id })
          }
        />
        <input
          className='text-center'
          type='text'
          placeholder='Item Name'
          value={item.name}
          onChange={evt =>
            dispatch({
              t: "setInventoryItemName",
              id: item.id,
              name: evt.target.value,
            })
          }
        />
        <DescriptionToggleButton
          onClickHandler={() => setDescVisible(!descVisible)}
          descVisible={descVisible}
        />
      </div>
      <CollapsibleDescription
        description={item.description}
        placeholder='Item Description'
        descVisible={descVisible}
        onChangeHandler={evt =>
          dispatch({
            t: "setInventoryItemDescription",
            id: item.id,
            description: evt.target.value,
          })
        }
      />
    </div>
  );
};

export default InventoryItemControl;
