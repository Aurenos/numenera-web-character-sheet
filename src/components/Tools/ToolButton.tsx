import React from "react";

interface ToolButtonProps {
  onClickHandler: React.MouseEventHandler<HTMLButtonElement>;
  toolTip: string;
  children: React.ReactNode;
  className?: string;
}

const ToolButton = (props: ToolButtonProps) => {
  const classes = `btn btn-square btn-outline ${props.className ?? ""}`;
  return (
    <div className='tooltip tooltip-left' data-tip={props.toolTip}>
      <button className={classes} onClick={props.onClickHandler}>
        {props.children}
      </button>
    </div>
  );
};

export default ToolButton;
