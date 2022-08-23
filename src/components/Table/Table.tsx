import React, { useEffect, useState } from "react";
import styles from "./Table.module.css";

export type Align = "center" | "right" | "left";
export type PaginationOption = {
  rowPerPage: number;
};
export type Column = {
  id: string;
  label: string;
  align?: Align;
};
export type TableProps = {
  columns: Column[];
  rows: any[];
  pagination?: PaginationOption;
  handlePageChange?: (page: number) => void;
};

type PaginationProps = {
  rowPerPage: number;
  total: number;
  currentPage: number;
  onNext: () => void;
  onPrevious: () => void;
};

const Pagination: React.FC<PaginationProps> = ({ rowPerPage, total, currentPage, onNext, onPrevious }) => {
  if (total < 1) return null;
  const totalPages = Math.floor(total / rowPerPage) + (total % rowPerPage > 0 ? 1 : 0);
  const nextEnabled = currentPage + 1 < totalPages;
  const previousEnabled = currentPage > 0;
  console.log(`Showing ${currentPage * rowPerPage + 1} - ${Math.min(currentPage * rowPerPage + rowPerPage, total)} of ${total}`);
  return (
    <div>
      <button disabled={!previousEnabled} onClick={onPrevious}>
        Previous
      </button>{" "}
      |{" "}
      <button disabled={!nextEnabled} onClick={onNext}>
        Next
      </button>
    </div>
  );
};

export const Table: React.FunctionComponent<TableProps> = ({ columns = [], rows = [], pagination }) => {
  const [currentPage, setCurrentPage] = useState(0);
  useEffect(() => {}, [currentPage]);
  return (
    <div className="table-container">
      {pagination ? (
        <Pagination
          onPrevious={() => setCurrentPage((c) => c - 1)}
          onNext={() => setCurrentPage((c) => c + 1)}
          currentPage={currentPage}
          total={rows.length}
          rowPerPage={pagination.rowPerPage}
        ></Pagination>
      ) : null}
      <table className={styles.table} cellPadding={0} cellSpacing={0}>
        <thead className={styles.tableHead}>
          <tr>
            {columns.map((column) => {
              return (
                <th key={column.id} align={column.align} className={styles.headCell}>
                  {column.label}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className={styles.tableBody}>
          {rows
            .slice(currentPage * pagination?.rowPerPage!, currentPage * pagination?.rowPerPage! + pagination?.rowPerPage!)
            .map((row, index) => {
              return (
                <tr key={index} className={styles.row}>
                  {columns.map((column) => {
                    let value = row[column.id];
                    return (
                      <td align={column.align} className={styles.cell}>
                        {value}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};
