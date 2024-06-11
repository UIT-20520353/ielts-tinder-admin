import userApi from "@/api/userApi";
import { initialUserDetail } from "@/app/initial-states";
import SkeletonLoader from "@/components/common/skeleton-loader";
import useAccessToken from "@/hooks/useAccessToken";
import useHandleResponseError from "@/hooks/useHandleResponseError";
import {
  TestLevelColorMapper,
  TestLevelMapper,
  UserRoleMapper,
  UserStatusColorMapper,
  UserStatusMapper,
} from "@/mappers";
import { UserDetailProps } from "@/models/user";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Image, Tag, Typography } from "antd";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface UserDetailPageProps {}

const UserDetailPage: React.FunctionComponent<UserDetailPageProps> = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { accessToken } = useAccessToken();
  const handleResponseError = useHandleResponseError();
  const [userDetail, setUserDetail] =
    useState<UserDetailProps>(initialUserDetail);
  const [loadImgError, setLoadImgError] = useState<boolean>(false);

  const infoColumns = useMemo(
    (): { label: string; dataIndex: string }[] => [
      { label: "ID", dataIndex: "id" },
      { label: "Full name", dataIndex: "firstName" },
      { label: "Email", dataIndex: "email" },
      { label: "Age", dataIndex: "age" },
      { label: "Level", dataIndex: "level" },
      { label: "Status", dataIndex: "status" },
    ],
    []
  );

  const getUserDetail = useCallback(
    async (id: string, token: string) => {
      const { ok, body, error } = await userApi.getUserDetail(
        { Authorization: `Bearer ${token}` },
        id
      );
      if (ok && body) {
        setUserDetail(body);
      }

      if (error) {
        handleResponseError(error);
      }
    },
    [handleResponseError]
  );

  const getValueRender = useCallback(
    (key: string): string | number => {
      switch (key) {
        case "firstName":
          return `${userDetail.firstName} ${userDetail.lastName}`;
        case "role":
          return UserRoleMapper[userDetail[key]];
        case "id":
        case "email":
        case "age":
          return userDetail[key];
        default:
          return "";
      }
    },
    [userDetail]
  );

  useEffect(() => {
    if (userId) {
      getUserDetail(userId, accessToken);
    }
  }, [userId, getUserDetail, accessToken]);

  return (
    <div className="px-10 pt-4 pb-8">
      <div className="flex items-center w-full">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center justify-center w-10 h-10 duration-200 bg-gray-200 rounded-md hover:bg-gray-300"
        >
          <ArrowLeftOutlined className="flex items-center justify-center text-lg font-semibold text-black" />
        </button>
        <h3 className="flex-1 text-xl font-semibold text-center text-c-blue-1">
          User information
        </h3>
      </div>
      <div className="w-full p-5 mt-3 bg-white rounded-md shadow-sm">
        <div className="grid w-full grid-cols-3 gap-3">
          <div className="col-span-1">
            {loadImgError ? (
              <SkeletonLoader width={300} height={300} />
            ) : (
              <Image
                src={userDetail.avatar}
                alt="avatar"
                className="max-w-[300px] max-h-[300px] object-center rounded-md object-contain"
                onError={() => setLoadImgError(true)}
              />
            )}
          </div>
          <div className="flex flex-col items-start col-span-2 gap-1">
            <Typography.Title level={4}>Description</Typography.Title>
            <p className="text-base">
              {userDetail.description || "No description provided."}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mt-10">
          {infoColumns.map((c) => (
            <div
              key={`user-detail-infor-${c.dataIndex}`}
              className="flex flex-col items-start col-span-1 gap-1"
            >
              <span className="text-sm text-c-blue-4">{c.label}</span>
              {c.dataIndex === "status" && (
                <Tag
                  bordered={false}
                  color={UserStatusColorMapper[userDetail.status]}
                  className="text-xl font-semibold "
                >
                  {UserStatusMapper[userDetail.status]}
                </Tag>
              )}
              {c.dataIndex === "level" && (
                <Tag
                  bordered={false}
                  color={TestLevelColorMapper[userDetail.level]}
                  className="text-xl font-semibold "
                >
                  {TestLevelMapper[userDetail.level]}
                </Tag>
              )}
              {c.dataIndex !== "status" && (
                <span className="text-xl font-semibold text-c-blue-1">
                  {getValueRender(c.dataIndex)}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserDetailPage;
