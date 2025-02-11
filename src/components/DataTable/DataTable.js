import React, { useState, useMemo, useImperativeHandle, forwardRef } from "react";
import PropTypes from "prop-types";
import { useTable, useSortBy, usePagination } from "react-table";
import "./DataTable.css";

const DataTable = forwardRef(({ columns, data, pageSize }, ref) => {
  const [tableData, setTableData] = useState(data);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    nextPage,
    previousPage,
    state: { pageIndex },
  } = useTable(
    {
      columns: useMemo(() => columns, [columns]),
      data: useMemo(() => tableData, [tableData]),
      initialState: { pageIndex: 0, pageSize },
    },
    useSortBy,
    usePagination
  );

  // Expose methods cho parent component
  useImperativeHandle(ref, () => ({
    getValue: () => tableData,
    setValue: (newData) => setTableData(newData),
  }));

  return (
    <div className="data-table-container">
      <table {...getTableProps()} className="data-table">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  key={column.id}
                  className={column.isSorted ? (column.isSortedDesc ? "desc" : "asc") : ""}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={row.id}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()} key={cell.column.id}>
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {"<"} Trước
        </button>
        <span>
          Trang {pageIndex + 1} / {pageOptions.length}
        </span>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          Sau {">"}
        </button>
      </div>
    </div>
  );
});

DataTable.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  pageSize: PropTypes.number,
};

DataTable.defaultProps = {
  pageSize: 5,
};

export default DataTable;
