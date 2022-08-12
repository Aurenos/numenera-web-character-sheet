import React from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/outline";

interface CollapsibleToggleButtonProps {
  onClickHandler: React.MouseEventHandler<HTMLButtonElement>;
  isCollapsed: boolean;
  toolTip: string;
}

const CollapsibleToggleButton = (props: CollapsibleToggleButtonProps) => {
  const { onClickHandler, isCollapsed } = props;
  return (
    <div className='tooltip tooltip-right' data-tip={props.toolTip}>
      <button
        className='btn btn-sm btn-square btn-ghost text-gray-600'
        onClick={onClickHandler}
      >
        {isCollapsed ? (
          <ChevronDownIcon className='h-4 w-4' />
        ) : (
          <ChevronUpIcon className='h-4 w-4' />
        )}
      </button>
    </div>
  );
};

export default CollapsibleToggleButton;
