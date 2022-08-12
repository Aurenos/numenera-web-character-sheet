import React, { useState } from "react";
import { InventoryItem } from "../../lib/characterSheet";
import { Action } from "../../lib/reducer";
import CollapsibleDescription from "../CollectionControls/CollapsibleDescription";
import DeleteButton from "../CollectionControls/DeleteButton";
import CollapsibleToggleButton from "../Tools/CollapsibleToggleButton";

interface InventoryItemControlProps {
  dispatch: React.Dispatch<Action>;
  item: InventoryItem;
}

const InventoryItemControl = (props: InventoryItemControlProps) => {
  const [descCollapsed, setDescCollapsed] = useState<boolean>(true);
  const { dispatch, item } = props;
  return (
    <div className='flex flex-col mb-2 border-b border-dotted border-slate-500'>
      <div className='flex flex-row mb-2 space-x-2'>
        <DeleteButton
          onClickHandler={() => {
            const action: Action = { t: "removeInventoryItem", id: item.id };
            if (props.item.name !== "") {
              dispatch({
                t: "promptActionConfirmation",
                action: action,
                confirmationText: `Are you sure you want to delete the item: ${props.item.name}`,
              });
            } else {
              dispatch(action);
            }
          }}
        />
        <input
          className='text-center flex-grow input input-sm text-lg rounded-sm input-accent border-none'
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
        <CollapsibleToggleButton
          onClickHandler={() => setDescCollapsed(!descCollapsed)}
          isCollapsed={descCollapsed}
          toolTip={`${descCollapsed ? "Show" : "Hide"} Description`}
        />
      </div>
      <CollapsibleDescription
        description={item.description}
        placeholder='Item Description'
        descVisible={!descCollapsed}
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
