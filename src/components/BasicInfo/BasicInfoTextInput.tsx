import React from "react";

interface BasicInfoTextInputProps {
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
  currentValue: string | number;
  placeholder?: string;
  name?: string;
  type: "text" | "number";
  className?: string;
}
const baseClasses = "input input-ghost hover:bg-indigo-50 text-lg px-1 ";
const BasicInfoTextInput = (props: BasicInfoTextInputProps) => {
  let classes = baseClasses.concat(props.className ?? "");
  return (
    <input
      className={classes}
      type={props.type}
      name={props.name}
      placeholder={props.placeholder}
      value={props.currentValue}
      onChange={props.handleChange}
    />
  );
};

export default BasicInfoTextInput;
