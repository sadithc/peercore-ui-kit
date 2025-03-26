import React from "react";
import "./style.scss";

// Define the ColumnProps interface
interface ColumnProps {
  field?: string;
  header?: string;
}

const Column = ({ field, header }: ColumnProps): React.ReactElement => {
  return (
    <th>{header}</th>
  );
};

export default Column;
