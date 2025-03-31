import React from 'react';

interface PaginatorProps {
  currentPage: number;
  totalPages: number;
  rowsPerPage: number;
  rowsPerPageOptions: number[];
  onPageChange: (e: { first: number; rows: number }) => void;
  goToFirstPage: () => void;
  goToLastPage: () => void;
  paginatorTemplate: string;
  currentPageReportTemplate: string;
  totalRecords: number;
}

export const PaginatorTemplate: React.FC<PaginatorProps> = ({
  currentPage,
  rowsPerPage,
  rowsPerPageOptions,
  onPageChange,
  goToFirstPage,
  goToLastPage,
  paginatorTemplate,
  currentPageReportTemplate,
  totalRecords,
  totalPages,
}: PaginatorProps) => {
  const handleRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRows = parseInt(e.target.value, 10);
    onPageChange({ first: 0, rows: newRows });
  };

  const template = paginatorTemplate.split(' ');
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px' }}>
      {template.map((item) => {
        switch (item) {
          case 'RowsPerPageDropdown':
            return (
              <div key="rowsPerPage" style={{ display: 'flex', alignItems: 'center' }}>
                <span>Rows per page: </span>
                <select value={rowsPerPage} onChange={handleRowsPerPageChange}>
                  {rowsPerPageOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            );
          case 'FirstPageLink':
            return (
              <button key="firstPage" onClick={goToFirstPage} disabled={currentPage === 0} style={{ padding: '5px 10px' }}>
                First
              </button>
            );
          case 'PrevPageLink':
            return (
              <button
                key="prevPage"
                onClick={() => onPageChange({ first: (currentPage - 1) * rowsPerPage, rows: rowsPerPage })}
                disabled={currentPage === 0}
                style={{ padding: '5px 10px' }}
              >
                Previous
              </button>
            );
          case 'NextPageLink':
            return (
              <button
                key="nextPage"
                onClick={() => onPageChange({ first: (currentPage + 1) * rowsPerPage, rows: rowsPerPage })}
                disabled={currentPage === totalPages - 1}
                style={{ padding: '5px 10px' }}
              >
                Next
              </button>
            );
          case 'LastPageLink':
            return (
              <button
                key="lastPage"
                onClick={goToLastPage}
                disabled={currentPage === totalPages - 1}
                style={{ padding: '5px 10px' }}
              >
                Last
              </button>
            );
          case 'CurrentPageReport':
            return (
              <span key="currentPageReport" style={{ padding: '5px 10px' }}>
                {currentPageReportTemplate
                  .replace('{first}', (currentPage * rowsPerPage + 1).toString())
                  .replace('{last}', ((currentPage + 1) * rowsPerPage).toString())
                  .replace('{totalRecords}', totalRecords.toString())}
              </span>
            );
          default:
            return null;
        }
      })}
    </div>
  );
};

export const PaginatorNumbers: React.FC<PaginatorProps> = ({
  currentPage,
  totalPages,
  rowsPerPage,
  onPageChange,
  goToFirstPage,
  goToLastPage,
}: PaginatorProps) => {
  const pageNumbers = [];
  const maxPagesToShow = 8;
  const startPage = Math.max(currentPage - Math.floor(maxPagesToShow / 2), 0);
  const endPage = Math.min(startPage + maxPagesToShow, totalPages);

  for (let i = startPage; i < endPage; i++) {
    pageNumbers.push(i + 1); // Create an array of page numbers starting from 1
  }

  return (
    <div className="flex">
      <button key="firstPage" onClick={goToFirstPage} disabled={currentPage === 0} style={{ padding: '5px 10px' }}>
        First
      </button>
      <button
        key="prevPage"
        onClick={() => onPageChange({ first: (currentPage - 1) * rowsPerPage, rows: rowsPerPage })}
        disabled={currentPage === 0}
        style={{ padding: '5px 10px' }}
      >
        Previous
      </button>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '5px', alignItems: 'center' }}>
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => onPageChange({ first: (number - 1) * rowsPerPage, rows: rowsPerPage })}
            style={{
              backgroundColor: currentPage === number - 1 ? 'lightblue' : 'transparent',
              padding: '5px 10px',
              border: '1px solid #ccc',
              cursor: 'pointer',
            }}
          >
            {number}
          </button>
        ))}
      </div>
      <button
        key="nextPage"
        onClick={() => onPageChange({ first: (currentPage + 1) * rowsPerPage, rows: rowsPerPage })}
        disabled={currentPage === totalPages - 1}
        style={{ padding: '5px 10px' }}
      >
        Next
      </button>
      <button
        key="lastPage"
        onClick={goToLastPage}
        disabled={currentPage === totalPages - 1}
        style={{ padding: '5px 10px' }}
      >
        Last
      </button>
    </div>
  );
};
