import userApi from "@/api/userApi";
import { useAppDispatch } from "@/app/hooks";
import { ETestLevel } from "@/enums/test";
import { EUserStatus } from "@/enums/user";
import useAccessToken from "@/hooks/useAccessToken";
import useConfirmPopup from "@/hooks/useConfirmPopup";
import useHandleResponseError from "@/hooks/useHandleResponseError";
import useHandleResponseSuccess from "@/hooks/useHandleResponseSuccess";
import usePagination from "@/hooks/usePagination";
import {
  TestLevelColorMapper,
  TestLevelMapper,
  UserStatusColorMapper,
  UserStatusMapper,
} from "@/mappers";
import { PaginationProps } from "@/models/pagination";
import { UserDetailProps } from "@/models/user";
import { addLoading, removeLoading } from "@/redux/global-slice";
import { EyeOutlined, LockOutlined, UnlockOutlined } from "@ant-design/icons";
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
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

interface UserManagementProps {}

interface FilterProps {
  id: string;
  name: string;
  status: EUserStatus[];
  email: string;
  level: ETestLevel[];
}

const initialFilter: FilterProps = {
  id: "",
  name: "",
  status: [],
  email: "",
  level: [],
};

const UserManagement: React.FunctionComponent<UserManagementProps> = () => {
  const dispatch = useAppDispatch();
  const handleResponseError = useHandleResponseError();
  const handleResponseSuccess = useHandleResponseSuccess();
  const showConfirmPopup = useConfirmPopup();
  const { accessToken, headers, isHeadersEmpty } = useAccessToken();
  const {
    pagination,
    data: userList,
    onChangeData,
    onChangePage,
    resetPagination,
  } = usePagination<UserDetailProps>();

  const [isLocalLoading, setLocalLoading] = useState<boolean>(false);
  const [filter, setFilter] = useState<FilterProps>(initialFilter);

  const disableSearch = useMemo(
    () =>
      !filter.id &&
      !filter.name &&
      !filter.status.length &&
      !filter.email &&
      !filter.level.length,
    [filter]
  );

  const onFilterChange = (
    key: keyof FilterProps,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFilter((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const getUserList = useCallback(
    async (pagi: PaginationProps, fil: FilterProps) => {
      setLocalLoading(true);
      const {
        ok,
        body,
        error,
        pagination: p,
      } = await userApi.getUserList(
        {
          Authorization: `Bearer ${accessToken}`,
        },
        pagi,
        fil
      );
      setLocalLoading(false);
      if (ok && body && p) {
        onChangeData(body, p.total);
      }

      if (error) {
        handleResponseError(error);
      }
    },
    [handleResponseError, accessToken, onChangeData]
  );

  const onBlockUser = useCallback(
    async (id: number) => {
      if (isHeadersEmpty) return;

      dispatch(addLoading());
      const { ok, error } = await userApi.blockUser(headers, id);
      dispatch(removeLoading());
      if (error) {
        handleResponseError(error);
      }
      if (ok) {
        handleResponseSuccess("Block user successfully", resetPagination);
      }
    },
    [
      dispatch,
      isHeadersEmpty,
      headers,
      handleResponseError,
      handleResponseSuccess,
      resetPagination,
    ]
  );

  const onUnblockUser = useCallback(
    async (id: number) => {
      if (isHeadersEmpty) return;

      dispatch(addLoading());
      const { ok, error } = await userApi.unblockUser(headers, id);
      dispatch(removeLoading());
      if (error) {
        handleResponseError(error);
      }
      if (ok) {
        handleResponseSuccess("Unblock user successfully", resetPagination);
      }
    },
    [
      dispatch,
      isHeadersEmpty,
      headers,
      handleResponseError,
      handleResponseSuccess,
      resetPagination,
    ]
  );

  const showConfirmBlockOrUnblock = useCallback(
    (id: number, status: EUserStatus) => {
      showConfirmPopup(
        `Are you sure you want to ${
          status === EUserStatus.ACTIVE ? "block" : "unblock"
        }`,
        () => {
          if (status === EUserStatus.ACTIVE) {
            onBlockUser(id);
          } else {
            onUnblockUser(id);
          }
        }
      );
    },
    [showConfirmPopup, onBlockUser, onUnblockUser]
  );

  const columns: TableColumnsType<UserDetailProps> = useMemo(
    () => [
      {
        title: "ID",
        dataIndex: "id",
        key: "id",
        render: (id: string) => (
          <span className="text-base text-c-black-1">{id}</span>
        ),
      },
      {
        title: "Full name",
        render: (_, record: UserDetailProps) => (
          <span className="text-base text-c-black-1">{`${
            record.firstName ?? ""
          } ${record.lastName ?? ""}`}</span>
        ),
      },
      {
        width: "20%",
        title: "Email",
        dataIndex: "email",
        render: (email: string) => (
          <span className="text-base text-c-black-1">{email}</span>
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
        title: "Status",
        dataIndex: "status",
        render: (status: EUserStatus) => (
          <Tag
            color={UserStatusColorMapper[status]}
            className="text-base font-medium text-c-black-1"
          >
            {UserStatusMapper[status]}
          </Tag>
        ),
      },
      {
        title: "Action",
        key: "action",
        render: (_, record: UserDetailProps) => (
          <div className="flex items-center gap-3">
            <Link
              to={`/users/${record.id}`}
              type="primary"
              className="flex items-center justify-center min-w-[40px] min-h-[40px] text-lg text-white duration-200 rounded-md bg-c-blue-3 hover:opacity-80 w-fit hover:text-white"
            >
              <EyeOutlined />
            </Link>
            <Button
              icon={
                record.status === EUserStatus.ACTIVE ? (
                  <LockOutlined className="text-2xl" />
                ) : (
                  <UnlockOutlined className="text-2xl" />
                )
              }
              type="primary"
              danger={record.status === EUserStatus.ACTIVE}
              className="!min-w-[40px] !min-h-[40px]"
              onClick={() =>
                showConfirmBlockOrUnblock(record.id, record.status)
              }
            />
          </div>
        ),
      },
    ],
    [showConfirmBlockOrUnblock]
  );

  useEffect(() => {
    getUserList(pagination, filter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getUserList, pagination]);

  return (
    <div className="px-10 py-8">
      <div className="w-full mb-4">
        <h3 className="text-xl font-semibold text-c-blue-1">User list</h3>
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
          <label className="text-sm">Email</label>
          <Input
            className="text-base"
            type="text"
            autoComplete="off"
            placeholder="Enter email"
            value={filter.email}
            onChange={(e) => onFilterChange("email", e)}
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
        <div className="flex flex-col items-start col-span-1 gap-2">
          <label className="text-sm">Status</label>
          <Select
            className="w-full"
            mode="multiple"
            options={[
              {
                label: UserStatusMapper[EUserStatus.ACTIVE],
                value: EUserStatus.ACTIVE,
              },
              {
                label: UserStatusMapper[EUserStatus.BLOCKED],
                value: EUserStatus.BLOCKED,
              },
            ]}
            placeholder="Select user status"
            value={filter.status}
            onChange={(e) => setFilter((prev) => ({ ...prev, status: e }))}
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
      </div>
      <Table
        columns={columns}
        dataSource={userList.items}
        pagination={false}
        loading={isLocalLoading}
        locale={{ emptyText: <Empty description="Data not found" /> }}
        scroll={{ y: userList.items.length > 4 ? 300 : undefined }}
      />
      {!!userList.total && (
        <div className="flex items-center justify-end w-full mt-3">
          <Pagination
            total={userList.total}
            pageSize={10}
            current={pagination.page}
            onChange={onChangePage}
          />
        </div>
      )}
    </div>
  );
};

export default UserManagement;
