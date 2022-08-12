import React from "react";

interface CollapsibleProps {
  children: React.ReactNode;
  isCollapsed: boolean;
}

const Collapsible = (props: CollapsibleProps) => {
  return (
    <div
      className={`collapse collapse-${
        props.isCollapsed ? "close" : "open"
      } w-full`}
    >
      <div className='flex collapse-content'>{props.children}</div>
    </div>
  );
};

export default Collapsible;
