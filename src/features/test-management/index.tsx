import testApi from "@/api/testApi";
import { EAppContrants } from "@/app/constrants";
import { ETestLevel } from "@/enums/test";
import useAccessToken from "@/hooks/useAccessToken";
import useHandleResponseError from "@/hooks/useHandleResponseError";
import usePagination from "@/hooks/usePagination";
import { TestLevelColorMapper, TestLevelMapper } from "@/mappers";
import { PaginationProps } from "@/models/pagination";
import { ITest } from "@/models/test";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Empty,
  Input,
  Pagination,
  Select,
  Table,
  Tag,
  type TableColumnsType,
} from "antd";
import dateFormat from "dateformat";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import AddTest from "./components/modals/add-test-modal";

interface TestManagementProps {}

interface FilterProps {
  id: string;
  name: string;
  level: ETestLevel[];
}

const initialFilter: FilterProps = {
  id: "",
  name: "",
  level: [],
};

const TestManagement: React.FunctionComponent<TestManagementProps> = () => {
  const handleResponseError = useHandleResponseError();
  const { headers, isHeadersEmpty } = useAccessToken();
  const {
    pagination,
    data: testList,
    onChangeData,
    onChangePage,
    resetPagination,
  } = usePagination<ITest>();

  const [isLocalLoading, setLocalLoading] = useState<boolean>(false);
  const [filter, setFilter] = useState<FilterProps>(initialFilter);
  const [isShowAddModal, setShowAddModal] = useState<boolean>(false);

  const disableSearch = useMemo(
    () => !filter.id && !filter.name && !filter.level.length,
    [filter]
  );

  const onFilterChange = (
    key: keyof FilterProps,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFilter((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const columns: TableColumnsType<ITest> = useMemo(
    () => [
      {
        title: "ID",
        dataIndex: "id",
        render: (id: string) => (
          <span className="text-base text-c-black-1">{id}</span>
        ),
      },
      {
        title: "Name",
        dataIndex: "name",
        render: (name: string) => (
          <span className="text-base text-c-black-1">{name}</span>
        ),
      },
      {
        title: "Level",
        dataIndex: "level",
        render: (level: ETestLevel) => (
          <Tag
            color={TestLevelColorMapper[level]}
            className="text-base font-medium text-c-black-1"
          >
            {TestLevelMapper[level]}
          </Tag>
        ),
      },
      {
        title: "Created at",
        dataIndex: "createdAt",
        render: (createdAt: string) => (
          <span className="text-base text-c-black-1">
            {dateFormat(createdAt, EAppContrants.DATE_FORMAT)}
          </span>
        ),
      },
      {
        align: "center",
        title: "Action",
        render: (_, record: ITest) => (
          <div className="flex items-center gap-3">
            <Link
              to={`/tests/${record.id}`}
              type="primary"
              className="flex items-center justify-center min-w-[40px] min-h-[40px] text-lg text-white duration-200 rounded-md bg-c-blue-3 hover:opacity-80 w-fit hover:text-white"
            >
              <EditOutlined />
            </Link>
            {record.level !== ETestLevel.ENTRY_TEST && (
              <Button
                icon={<DeleteOutlined />}
                type="primary"
                danger
                className="!min-w-[40px] !min-h-[40px]"
              />
            )}
          </div>
        ),
      },
    ],
    []
  );

  const getAllTest = useCallback(
    async (pagi: PaginationProps, fil: FilterProps) => {
      if (isHeadersEmpty) return;

      setLocalLoading(true);
      const {
        ok,
        body,
        pagination: p,
        error,
      } = await testApi.getAllTest(headers, pagi, fil);
      setLocalLoading(false);

      if (error) {
        handleResponseError(error);
      }

      if (ok && body && p) {
        onChangeData(body, p.total);
      }
    },
    [handleResponseError, headers, isHeadersEmpty, onChangeData]
  );

  const onCloseAddModal = useCallback(
    (refresh: boolean) => {
      setShowAddModal(false);
      if (refresh) {
        resetPagination();
      }
    },
    [resetPagination]
  );

  useEffect(() => {
    getAllTest(pagination, filter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination, getAllTest]);

  return (
    <div className="px-10 py-8">
      <AddTest open={isShowAddModal} onClose={onCloseAddModal} />

      <div className="flex items-center justify-between w-full mb-4">
        <h3 className="text-xl font-semibold text-c-blue-1">Test list</h3>

        <Button
          className="flex items-center justify-center text-base font-medium"
          icon={<PlusOutlined />}
          type="primary"
          onClick={() => setShowAddModal(true)}
        >
          Add test
        </Button>
      </div>

      <div className="grid w-full grid-cols-4 gap-3 mb-4">
        <div className="flex flex-col items-start col-span-1 gap-2">
          <label className="text-sm">ID</label>
          <Input
            className="text-base"
            type="text"
            autoComplete="off"
            placeholder="Enter user id"
            onChange={(e) => onFilterChange("id", e)}
            value={filter.id}
          />
        </div>
        <div className="flex flex-col items-start col-span-1 gap-2">
          <label className="text-sm">Name</label>
          <Input
            className="text-base"
            type="text"
            autoComplete="off"
            placeholder="Enter user name"
            value={filter.name}
            onChange={(e) => onFilterChange("name", e)}
          />
        </div>
        <div className="flex flex-col items-start col-span-1 gap-2">
          <label className="text-sm">Level</label>
          <Select
            className="w-full"
            mode="multiple"
            options={Object.values(ETestLevel).map((level) => ({
              label: TestLevelMapper[level],
              value: level,
            }))}
            placeholder="Select user level"
            value={filter.level}
            onChange={(e) => setFilter((prev) => ({ ...prev, level: e }))}
          />
        </div>
        <div className="flex items-end col-span-1 gap-2">
          <Button
            type="primary"
            className="w-1/2"
            onClick={resetPagination}
            disabled={disableSearch}
          >
            Search
          </Button>
          <Button
            className="w-1/2"
            onClick={() => {
              setFilter(initialFilter);
              resetPagination();
            }}
          >
            Reset
          </Button>
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={testList.items}
        pagination={false}
        loading={isLocalLoading}
        locale={{ emptyText: <Empty description="Data not found" /> }}
        scroll={{ y: testList.items.length > 4 ? 300 : undefined }}
      />
      {!!testList.total && (
        <div className="flex items-center justify-end w-full mt-3">
          <Pagination
            total={testList.total}
            pageSize={10}
            current={pagination.page}
            onChange={onChangePage}
          />
        </div>
      )}
    </div>
  );
};

export default TestManagement;
