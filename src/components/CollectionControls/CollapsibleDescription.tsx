import React from "react";

interface CollapsibleDescriptionProps {
  onChangeHandler: React.ChangeEventHandler<HTMLTextAreaElement>;
  descVisible: boolean;
  description: string;
  placeholder: string;
}

const CollapsibleDescription = (props: CollapsibleDescriptionProps) => {
  const { onChangeHandler, description, descVisible } = props;
  return (
    <div
      className={`collapse collapse-${descVisible ? "open" : "close"} w-full`}
    >
      <div className='flex collapse-content'>
        <textarea
          className='textarea w-full rounded-none bg-base-200 text-base'
          placeholder={props.placeholder}
          value={description}
          onChange={onChangeHandler}
        />
      </div>
    </div>
  );
};

export default CollapsibleDescription;
