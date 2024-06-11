import { initialPagination } from "@/app/initial-states";
import { PaginationProps } from "@/models/pagination";
import { useCallback, useState } from "react";

const usePagination = <T>() => {
  interface IData {
    items: T[];
    total: number;
  }

  const [data, setData] = useState<IData>({ items: [], total: 0 });
  const [pagination, setPagination] =
    useState<PaginationProps>(initialPagination);

  const onChangePage = useCallback((e: number) => {
    setPagination((prev) => ({ ...prev, page: e }));
  }, []);

  const onChangeData = useCallback((value: T[], total: number) => {
    setData({ items: value, total });
  }, []);

  const resetPagination = useCallback(() => {
    setPagination({ ...initialPagination });
  }, []);

  return { pagination, onChangePage, data, onChangeData, resetPagination };
};

export default usePagination;
