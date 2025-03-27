import React, { useMemo, useState } from "react";
import "./style.scss";
import Table from "./Table";
import Column from "./column";

export interface ColumnDef {
  field?: string;
  header?: string;
  body?: (rowData: any) => React.ReactNode;
}

export interface DataTableProps {
  products?: { [key: string]: any }[];
  columns?: ColumnDef[];
  children?: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  size?: "small" | "normal" | "large";
  showGridlines?: boolean;
  stripedRows?: boolean;
  rowsPerPageOptions?: number[];
  paginator?: boolean;
  onPageChange?: (e: { first: number; rows: number }) => void;
}

const DataTable = ({
  products, columns,
  children, header,
  footer, size, showGridlines,
  stripedRows = false,
  rowsPerPageOptions = [5, 10, 25, 50],
  paginator = false, onPageChange
}: DataTableProps): React.ReactElement => {

  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const totalRecords = products ? products.length : 0;
  const totalPages = Math.ceil(totalRecords / rowsPerPage);
  const pagedProducts = useMemo(() => {
    return products?.slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage) || [];
  }, [currentPage, rowsPerPage, products]);


  const handlePageChange = (e: { first: number; rows: number }) => {
    setCurrentPage(e.first / e.rows);
    setRowsPerPage(e.rows);
    if (onPageChange) {
      onPageChange(e);
    }
  };


  const handleRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRows = parseInt(e.target.value, 10);
    setRowsPerPage(newRows);
    setCurrentPage(0);
  };

  const goToFirstPage = () => {
    setCurrentPage(0);
  };

  // Navigate to the last page
  const goToLastPage = () => {
    setCurrentPage(totalPages - 1);
  };

  const columnElements = columns
    ? (columns || []).map((col) => <Column key={col.field} field={col.field} header={col.header} body={col.body} />)
    : React.Children.toArray(children);


  return (
    <div className="card">
      {header && <div>{header}</div>}
      <Table
        value={pagedProducts}
        size={size}
        showGridlines={showGridlines}
        stripedRows={stripedRows}

      >
        {columnElements}
      </Table>
      {footer && <div>{footer}</div>}
      {paginator && totalRecords > 5 && (
        <div className="paginator">
          <div>
            <span>Rows per page: </span>
            <select value={rowsPerPage} onChange={handleRowsPerPageChange}>
              {rowsPerPageOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div>
          <button
               onClick={goToFirstPage}
               disabled={currentPage === 0}
            >
              Preview First Page 
            </button>
            <button
              onClick={() => handlePageChange({ first: (currentPage - 1) * rowsPerPage, rows: rowsPerPage })}
              disabled={currentPage === 0}
            >
              Previous
            </button>
            <span>{`${currentPage + 1} / ${Math.ceil(totalRecords / rowsPerPage)}`}</span>
            <button
              onClick={() => handlePageChange({ first: (currentPage + 1) * rowsPerPage, rows: rowsPerPage })}
              disabled={currentPage === Math.ceil(totalRecords / rowsPerPage) - 1}
            >
              Next
            </button>
            <button
               onClick={goToLastPage}
               disabled={currentPage === totalPages - 1}
            >
              Preview Last Page
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;
