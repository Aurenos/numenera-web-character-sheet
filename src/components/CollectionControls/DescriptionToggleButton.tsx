import React from "react";

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
        className='btn btn-sm btn-square btn-ghost text-xl text-gray-600'
        onClick={onClickHandler}
      >
        {descVisible ? "^" : "v"}
      </button>
    </div>
  );
};

export default DescriptionToggleButton;
