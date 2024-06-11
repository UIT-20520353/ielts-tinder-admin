import { Pagination } from "antd";
import React from "react";

interface TablePaginationProps {
  total: number;
  size: number;
  page: number;
  onPageChange: (page: number) => void;
}

const TablePagination: React.FunctionComponent<TablePaginationProps> = ({
  total,
  onPageChange,
  size,
  page,
}) => {
  return (
    !!total && (
      <div className="flex items-center justify-end w-full mt-3">
        <Pagination
          total={total}
          pageSize={size}
          current={page}
          onChange={onPageChange}
        />
      </div>
    )
  );
};

export default TablePagination;
