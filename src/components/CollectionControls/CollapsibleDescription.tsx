import React from "react";
import Collapsible from "../Tools/Collapsible";

interface CollapsibleDescriptionProps {
  onChangeHandler: React.ChangeEventHandler<HTMLTextAreaElement>;
  descVisible: boolean;
  description: string;
  placeholder: string;
}

const CollapsibleDescription = (props: CollapsibleDescriptionProps) => {
  const { onChangeHandler, description, descVisible } = props;
  return (
    <Collapsible isCollapsed={!descVisible}>
      <textarea
        className='textarea w-full rounded-br-sm rounded-bl-sm rounded-tl-none rounded-tr-none bg-base-200 text-base textarea-accent border-none'
        placeholder={props.placeholder}
        value={description}
        onChange={onChangeHandler}
      />
    </Collapsible>
  );
};

export default CollapsibleDescription;
