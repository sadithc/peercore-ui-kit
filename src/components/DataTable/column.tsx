import React from "react";
import "./style.scss";

// Define the ColumnProps interface
interface ColumnProps {
  field?: string;
  header?: string;
  body?: any;
}

const Column = ({ field, header, body }: ColumnProps): React.ReactElement => {
  return (
    <th>{header}</th>
  );
};

export default Column;
