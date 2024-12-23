import React from "react";
import DateInput, { DateInputProps } from "./DateInput";
import TagsInput, { TagsInputProps } from "./TagsInput";
import BooleanInput, { BooleanInputProps } from "./BooleanInput";
import DefaultInput, { DefaultInputProps } from "./DefaultInput";
import { useInputContext } from "../../contexts/InputContext";

type ComponentPropsMap = {
  date: DateInputProps;
  tags: TagsInputProps;
  boolean: BooleanInputProps;
  default: DefaultInputProps;
};

const ValueInputRenderer: React.FC<{
  inputProps: ComponentPropsMap[keyof ComponentPropsMap];
}> = ({ inputProps }) => {
  const { currentColumn } = useInputContext();

  switch (currentColumn?.type) {
    case "date":
      return <DateInput {...(inputProps as DateInputProps)} />;
    case "tags":
      return <TagsInput {...(inputProps as TagsInputProps)} />;
    case "boolean":
      return <BooleanInput {...(inputProps as BooleanInputProps)} />;
    default:
      return <DefaultInput {...(inputProps as DefaultInputProps)} />;
  }
};

export default ValueInputRenderer;
