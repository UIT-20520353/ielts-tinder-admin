import hotelApi from "@/api/hotelApi";
import { useAppDispatch } from "@/app/hooks";
import TablePagination from "@/components/common/table-pagination";
import { EHotelStatus } from "@/enums/hotel";
import useAccessToken from "@/hooks/useAccessToken";
import useConfirmPopup from "@/hooks/useConfirmPopup";
import useHandleResponseError from "@/hooks/useHandleResponseError";
import useHandleResponseSuccess from "@/hooks/useHandleResponseSuccess";
import usePagination from "@/hooks/usePagination";
import { HotelStatusColorMapper, HotelStatusMapper } from "@/mappers";
import { IHotel } from "@/models/hotel";
import { IPropertyProvince } from "@/models/province";
import { addLoading, removeLoading } from "@/redux/global-slice";
import { EditOutlined, PlusOutlined, RestOutlined } from "@ant-design/icons";
import { Button, Empty, Table, Tag, type TableColumnsType } from "antd";
import React, { useCallback, useEffect, useMemo, useState } from "react";

interface HotelManagementProps {}

const HotelManagement: React.FunctionComponent<HotelManagementProps> = () => {
  const dispatch = useAppDispatch();
  const { headers, isHeadersEmpty } = useAccessToken();
  const handleResponseError = useHandleResponseError();
  const handleResponseSuccess = useHandleResponseSuccess();
  const showConfirmPopup = useConfirmPopup();
  const {
    onChangeData,
    data: hotelList,
    resetPagination,
    pagination,
    onChangePage,
  } = usePagination<IHotel>();

  const [isLocalLoading, setLocalLoading] = useState<boolean>(false);

  const onDeleteHotel = useCallback(
    async (id: number) => {
      if (isHeadersEmpty) return;

      dispatch(addLoading());
      const { ok, error } = await hotelApi.deleteHotel(id, headers);
      dispatch(removeLoading());

      if (error) {
        handleResponseError(error);
      }

      if (ok) {
        handleResponseSuccess("Xóa khách sạn thành công", resetPagination);
      }
    },
    [
      isHeadersEmpty,
      dispatch,
      headers,
      handleResponseError,
      handleResponseSuccess,
      resetPagination,
    ]
  );

  const showPopupConfirmDelete = useCallback(
    (id: number) => {
      showConfirmPopup("Xác nhận xóa khách sạn này?", () => onDeleteHotel(id));
    },
    [showConfirmPopup, onDeleteHotel]
  );

  const columns: TableColumnsType<IHotel> = useMemo(
    () => [
      {
        title: "ID",
        dataIndex: "id",
        render: (id: string) => (
          <span className="text-base text-c-black-1">{id}</span>
        ),
      },
      {
        title: "Tên khách sạn",
        dataIndex: "name",
        render: (name: string) => (
          <span className="text-base text-c-black-1">{name}</span>
        ),
      },
      {
        title: "Địa chỉ",
        dataIndex: "province",
        render: (province: IPropertyProvince) => (
          <span className="text-base text-c-black-1">{`${province.district.ward.wardName}, ${province.district.districtName}, ${province.provinceName}`}</span>
        ),
      },
      {
        title: "Tình trạng",
        dataIndex: "status",
        render: (status: EHotelStatus) => (
          <Tag
            color={HotelStatusColorMapper[status]}
            className="text-base font-medium"
          >
            {HotelStatusMapper[status]}
          </Tag>
        ),
      },
      {
        title: "Hành động",
        render: (_, record: IHotel) => (
          <div className="flex items-center gap-2">
            <Button
              type="primary"
              className="!min-w-[40px] !min-h-[40px]"
              // onClick={() => setSelectedRow(record)}
              icon={<EditOutlined className="text-xl" />}
            />

            <Button
              type="primary"
              danger
              className="!min-w-[40px] !min-h-[40px]"
              onClick={() => showPopupConfirmDelete(record.id)}
              icon={<RestOutlined className="text-xl" />}
            />
          </div>
        ),
      },
    ],
    [showPopupConfirmDelete]
  );

  const getAllHotels = useCallback(async () => {
    if (isHeadersEmpty) return;

    setLocalLoading(true);
    const { ok, body, pagination, error } = await hotelApi.getAllHotels(
      headers
    );
    setLocalLoading(false);

    if (ok && body && pagination) {
      onChangeData(body, pagination.total);
    }

    if (error) {
      handleResponseError(error);
    }
  }, [handleResponseError, headers, isHeadersEmpty, onChangeData]);

  useEffect(() => {
    getAllHotels();
  }, [getAllHotels]);

  return (
    <div className="px-10 py-8">
      <div className="flex items-center justify-between w-full mb-4">
        <h3 className="text-xl font-semibold text-c-blue-1">
          Danh sách khách sạn
        </h3>
        <Button
          type="primary"
          className="flex items-center h-10 gap-2 px-6 text-base font-medium"
          //   onClick={() => setShowAddModal(true)}
          icon={<PlusOutlined />}
        >
          Thêm khách sạn
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={hotelList.items}
        pagination={false}
        loading={isLocalLoading}
        locale={{ emptyText: <Empty description="Không có dữ liệu" /> }}
        scroll={{ y: hotelList.items.length > 4 ? 350 : undefined }}
      />

      <TablePagination
        total={hotelList.total}
        size={pagination.size ?? 10}
        page={pagination.page}
        onPageChange={onChangePage}
      />
    </div>
  );
};

export default HotelManagement;
