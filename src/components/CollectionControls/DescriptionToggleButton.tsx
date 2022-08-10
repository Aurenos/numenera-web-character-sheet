import React from "react";

interface DescriptionToggleButtonProps {
  onClickHandler: React.MouseEventHandler<HTMLButtonElement>;
  descVisible: boolean;
}

const DescriptionToggleButton = (props: DescriptionToggleButtonProps) => {
  const { onClickHandler, descVisible } = props;
  return (
    <button
      className='btn btn-sm btn-square btn-ghost text-xl text-gray-600'
      onClick={onClickHandler}
    >
      {descVisible ? "^" : "v"}
    </button>
  );
};

export default DescriptionToggleButton;
