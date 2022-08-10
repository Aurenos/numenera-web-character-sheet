import React from "react";

interface CollapsibleDescriptionProps {
  onChangeHandler: React.ChangeEventHandler<HTMLTextAreaElement>;
  descVisible: boolean;
  description: string;
}

const CollapsibleDescription = (props: CollapsibleDescriptionProps) => {
  const { onChangeHandler, description, descVisible } = props;
  return (
    <div
      className={`collapse collapse-${descVisible ? "open" : "close"} w-full`}
    >
      <div className='flex collapse-content'>
        <textarea
          className='textarea p-1 w-full rounded-none'
          placeholder='Cypher Description'
          value={description}
          onChange={onChangeHandler}
        />
      </div>
    </div>
  );
};

export default CollapsibleDescription;
