import React, { useMemo, useState } from "react";
import "./style.scss";

export interface TableProps {
  value: any[];
  children?: React.ReactNode;
  size?: "small" | "normal" | "large";
  showGridlines?: boolean;
  stripedRows?: boolean;
}

const Table = ({ value, children, size = "small", showGridlines = false, stripedRows = false }: TableProps): React.ReactElement => {
  const columns = React.Children.toArray(children) as React.ReactElement<{ header: string; field: string; body?: (rowData: any) => React.ReactNode; sortable: true; onSort: (field: string) => void; }>[];

  const [sortField, setSortField] = useState<string | null>(null); // The field we are sorting by
  const [sortOrder, setSortOrder] = useState(1); // 1 for ascending, -1 for descending

  // Sort the data based on sortField and sortOrder
  const sortedData = useMemo(() => {
    if (!sortField) return value; // If no sorting field, return the data as is

    // Sort the data based on the current sort field and order
    return [...value].sort((a, b) => {
      const fieldA = a[sortField];
      const fieldB = b[sortField];

      if (fieldA < fieldB) return -sortOrder;
      if (fieldA > fieldB) return sortOrder;
      return 0;
    });
  }, [value, sortField, sortOrder]);

  const handleSort = (field: string) => {
    if (field === sortField) {
      // If the same field is clicked, toggle the order
      setSortOrder(prevOrder => -prevOrder);
    } else {
      // If a new field is clicked, sort ascending by default
      setSortField(field);
      setSortOrder(1);
    }
  };

  return (
    <div>
      <table className={` table ${size}`}>
        <thead>
            {columns.map((column, index) => (
              <th className={`header ${showGridlines ? "show-gridlines" : ""} ${column.props.field === sortField ? "active-sort" : ""
                } `} key={index}>{column.props.header}
                {column.props.sortable && (
                  <span className="clickable" onClick={() => handleSort(column.props.field || "")}>
                    &#x2195;
                  </span>
                )}
              </th>
            ))}
            </thead>
        <tbody>
          {sortedData.map((row, rowIndex) => (
            <tr className={`row ${stripedRows && rowIndex % 2 === 1 ? "striped" : ""} `} key={rowIndex}>
              {columns.map((column, colIndex) => (
                <td className={`box ${showGridlines ? "show-gridlines" : ""}`} key={colIndex}>
                  {column.props.body ? column.props.body(row) : row[column.props.field]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
