import React from "react";

interface DeleteButtonProps {
  onClickHandler: React.MouseEventHandler<HTMLButtonElement>;
}

const DeleteButton = (props: DeleteButtonProps) => {
  return (
    <div className='tooltip' data-tip='Delete'>
      <button
        className='btn btn-sm btn-square btn-ghost opacity-50 rounded-none hover:opacity-100 hover:btn-error '
        onClick={props.onClickHandler}
      >
        —
      </button>
    </div>
  );
};

export default DeleteButton;
