import React from "react";
import "./style.scss";

export interface TableProps {
  value: any[];
  children?: React.ReactNode;
}

const Table = ({ value, children }: TableProps): React.ReactElement => {
  const columns = React.Children.toArray(children) as React.ReactElement<{ header: string; field: string }>[];

  return (
    <div>
      <table>
        <thead>
          <tr className="header">
            {columns.map((column, index) => (
              <th key={index}>{column.props.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {value.map((row, rowIndex) => (
            <tr className="row" key={rowIndex}>
              {columns.map((column, colIndex) => (
                <td className="box" key={colIndex}>{row[column.props.field]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
