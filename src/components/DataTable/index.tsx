import React from "react";
import "./style.scss";
import Table from "./Table";
import Column from "./column";

export interface ColumnDef {
  field?: string;
  header?: string;
}

export interface DataTableProps {
  products?: { code: string; name: string; category: string; quantity: number; test: string }[];
  columns?: ColumnDef[];
  children?: React.ReactNode;
}

const DataTable = ({ products, columns, children }: DataTableProps): React.ReactElement => {

  const columnElements = columns
  ? (columns || []).map((col) => <Column key={col.field} field={col.field} header={col.header} />)
    : React.Children.toArray(children);


  return (
    <div className="card">
      <Table value={products || []}>
     {columnElements}
      </Table>
    </div>
  );
};

export default DataTable;
