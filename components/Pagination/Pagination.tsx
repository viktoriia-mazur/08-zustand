"use client";

import ReactPaginateImport from "react-paginate";

import css from "./Pagination.module.css";

const ReactPaginate =
  (ReactPaginateImport as { default?: typeof ReactPaginateImport }).default ??
  ReactPaginateImport;

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (selected: number) => void;
}

export default function Pagination({
  page,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <ReactPaginate
      containerClassName={css.pagination}
      activeClassName={css.active}
      previousLabel="<"
      nextLabel=">"
      breakLabel="..."
      pageCount={totalPages}
      forcePage={page - 1}
      onPageChange={({ selected }) => onPageChange(selected + 1)}
    />
  );
}