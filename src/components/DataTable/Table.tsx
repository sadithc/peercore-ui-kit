import React from "react";
import "./style.scss";

export interface TableProps {
  value: any[];
  children?: React.ReactNode;
  size?: "small" | "normal" | "large";
  showGridlines?: boolean;
  stripedRows?: boolean;
 }

const Table = ({ value, children, size = "small", showGridlines = false, stripedRows = false }: TableProps): React.ReactElement => {
  const columns = React.Children.toArray(children) as React.ReactElement<{ header: string; field: string; body?: (rowData: any) => React.ReactNode }>[];

  return (
    <div>
      <table className={` table ${size}`}>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th className={`header ${showGridlines ? "show-gridlines" : ""} `} key={index}>{column.props.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {value.map((row, rowIndex) => (
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
