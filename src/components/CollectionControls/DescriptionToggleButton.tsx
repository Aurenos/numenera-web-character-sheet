import React from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/outline";

interface DescriptionToggleButtonProps {
  onClickHandler: React.MouseEventHandler<HTMLButtonElement>;
  descVisible: boolean;
}

const DescriptionToggleButton = (props: DescriptionToggleButtonProps) => {
  const { onClickHandler, descVisible } = props;
  return (
    <div
      className='tooltip tooltip-right'
      data-tip={`${descVisible ? "Hide" : "Show"} Description`}
    >
      <button
        className='btn btn-sm btn-square btn-ghost text-gray-600'
        onClick={onClickHandler}
      >
        {descVisible ? (
          <ChevronUpIcon className='h-4 w-4' />
        ) : (
          <ChevronDownIcon className='h-4 w-4' />
        )}
      </button>
    </div>
  );
};

export default DescriptionToggleButton;
