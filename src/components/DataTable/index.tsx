import React, { useMemo, useState } from "react";
import "./style.scss";
import Table from "./Table";
import Column from "./column";
import { PaginatorTemplate, PaginatorNumbers } from "./Paginator"; // Importing paginator functions

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
  paginatorTemplate?: string;
  currentPageReportTemplate?: string;
  paginatorLeft?: React.ReactNode;
  paginatorRight?: React.ReactNode;
  rows?: number;
  onPageChange?: (e: { first: number; rows: number }) => void;
}

const DataTable = ({
  products, columns,
  children, header,
  footer, size, showGridlines,
  stripedRows = false,
  rowsPerPageOptions = [5, 10, 25, 50],
  paginator = false,
  paginatorTemplate = "FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink",
  currentPageReportTemplate = "{first} to {last} of {totalRecords}", paginatorLeft, paginatorRight,
  rows = 5,
  onPageChange
}: DataTableProps): React.ReactElement => {

  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rows);

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



  const goToFirstPage = () => {
    setCurrentPage(0);
  };

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
          {paginatorLeft && <div className="paginator-left">{paginatorLeft}</div>}
          {paginatorTemplate === "RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink" ||
            paginatorTemplate === " FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink" ||
            paginatorTemplate === " PrevPageLink CurrentPageReport NextPageLink LastPageLink" ||
            paginatorTemplate === " CurrentPageReport NextPageLink LastPageLink" ||
            paginatorTemplate === " NextPageLink LastPageLink" ||
            paginatorTemplate === " LastPageLink" ||
            paginatorTemplate === "" ? (
            <div className="paginator-template">
              <PaginatorTemplate
                currentPage={currentPage}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={rowsPerPageOptions}
                onPageChange={handlePageChange}
                goToFirstPage={goToFirstPage}
                goToLastPage={goToLastPage}
                paginatorTemplate={paginatorTemplate}
                currentPageReportTemplate={currentPageReportTemplate}
                totalRecords={totalRecords} totalPages={0} />
            </div>
          ) : (
            <div className="paginator-numbers">
              <PaginatorNumbers
                currentPage={currentPage}
                totalPages={totalPages}
                rowsPerPage={rowsPerPage}
                onPageChange={handlePageChange}
                goToFirstPage={goToFirstPage}
                goToLastPage={goToLastPage} rowsPerPageOptions={[]} paginatorTemplate={""} currentPageReportTemplate={""} totalRecords={0} />
            </div>
          )}
          {paginatorRight && <div className="paginator-right">{paginatorRight}</div>}
        </div>
      )}
    </div>
  );
};

export default DataTable;
