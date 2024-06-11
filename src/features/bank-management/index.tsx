import bankApi from "@/api/bankApi";
import { EAppContrants } from "@/app/constrants";
import TablePagination from "@/components/common/table-pagination";
import useAccessToken from "@/hooks/useAccessToken";
import useHandleResponseError from "@/hooks/useHandleResponseError";
import usePagination from "@/hooks/usePagination";
import { IBank } from "@/models/bank";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Empty, Image, Table, type TableColumnsType } from "antd";
import dateFormat from "dateformat";
import React, { useCallback, useEffect, useMemo, useState } from "react";

interface BankManagementProps {}

const BankManagement: React.FunctionComponent<BankManagementProps> = () => {
  const handleResponseError = useHandleResponseError();
  const { headers } = useAccessToken();
  const {
    pagination,
    onChangeData,
    onChangePage,
    data: bankList,
  } = usePagination<IBank>();
  const [isLocalLoading, setLocalLoading] = useState<boolean>(false);

  const columns: TableColumnsType<IBank> = useMemo(
    () => [
      {
        title: "ID",
        dataIndex: "id",
        render: (id: string) => (
          <span className="text-base text-c-black-1">{id}</span>
        ),
      },
      {
        title: "Tên ngân hàng",
        dataIndex: "bankName",
        render: (bankName: string) => (
          <span className="text-base text-c-black-1">{bankName}</span>
        ),
      },
      {
        title: "Tên tài khoản",
        dataIndex: "accountName",
        render: (accountName: string) => (
          <span className="text-base uppercase text-c-black-1">
            {accountName}
          </span>
        ),
      },
      {
        title: "Số tài khoản",
        dataIndex: "accountNumber",
        render: (accountNumber: string) => (
          <span className="text-base uppercase text-c-black-1">
            {accountNumber}
          </span>
        ),
      },
      {
        title: "Mã QR",
        dataIndex: "qrCode",
        render: (qrCode: string) => (
          <Image
            src={qrCode}
            alt="qr code"
            className="max-w-[100px] max-h-[100px] object-contain border border-c-gray-1 rounded-md p-2 bg-gray-50 object-center"
          />
        ),
      },
      {
        title: "Ngày thêm",
        dataIndex: "createAt",
        render: (createAt: string) => (
          <span className="text-base uppercase text-c-black-1">
            {dateFormat(createAt, EAppContrants.DATE_FORMAT)}
          </span>
        ),
      },
    ],
    []
  );

  const getBankList = useCallback(async () => {
    setLocalLoading(true);
    const { ok, body, error, pagination } = await bankApi.getBankList(headers);
    setLocalLoading(false);
    if (ok && body && pagination) {
      onChangeData(body, pagination.total);
    }

    if (error) {
      handleResponseError(error);
    }
  }, [handleResponseError, onChangeData, headers]);

  useEffect(() => {
    getBankList();
  }, [getBankList]);

  return (
    <div className="px-10 py-8">
      <div className="flex items-center justify-between w-full mb-4">
        <h3 className="text-xl font-semibold text-c-blue-1">
          Danh sách tài khoản ngân hàng
        </h3>
        <Button
          type="primary"
          className="flex items-center h-10 gap-2 px-6 text-base font-medium"
          //   onClick={() => setShowAddModal(true)}
          icon={<PlusOutlined />}
        >
          Thêm tài khoản
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={bankList.items}
        pagination={false}
        loading={isLocalLoading}
        locale={{ emptyText: <Empty description="Không có dữ liệu" /> }}
        scroll={{ y: bankList.items.length > 4 ? 350 : undefined }}
      />

      <TablePagination
        total={bankList.total}
        size={pagination.size ?? 10}
        page={pagination.page}
        onPageChange={onChangePage}
      />
    </div>
  );
};

export default BankManagement;
