import React from "react";
import "./style.scss";

// Define the ColumnProps interface
interface ColumnProps {
  field?: string;
  header?: string;
  body?: any;
  sortable?: boolean;
  onSort?: (field: string) => void;
  isSorted?: boolean; // Added isSorted prop
  sortOrder?: number;
}

const Column = ({ field, header, body, sortable, onSort, isSorted, sortOrder }: ColumnProps): React.ReactElement => {
  
  const handleSortClick = () => {
    if (sortable && onSort) {
      console.log("clicked")
      onSort(field || ""); // Pass the field to the onSort handler
    }
  };

  return (
    <th onClick={handleSortClick}>
      {header}
      {sortable && <span className="clickable"> ↕ </span>}
    </th>
  );
};

export default Column;
