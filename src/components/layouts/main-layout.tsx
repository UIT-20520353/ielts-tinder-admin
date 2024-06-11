import authApi from "@/api/authApi";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import logo from "@/assets/logo.png";
import useAccessToken from "@/hooks/useAccessToken";
import useHandleResponseError from "@/hooks/useHandleResponseError";
import { selectProfile, setProfile } from "@/redux/auth-slice";
import {
  addLoading,
  removeLoading,
  selectIsLoading,
} from "@/redux/global-slice";
import {
  FileTextOutlined,
  HomeOutlined,
  LogoutOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Layout, Spin } from "antd";
import clsx from "clsx";
import React, {
  Fragment,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

const { Header, Content, Sider } = Layout;

interface MainLayoutProps {}

interface MenuItemProps {
  label: string;
  to: string;
  icon: ReactNode;
}

const MainLayout: React.FunctionComponent<MainLayoutProps> = () => {
  const isLoading = useAppSelector(selectIsLoading);
  const profile = useAppSelector(selectProfile);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleResponseError = useHandleResponseError();
  const { accessToken, logout } = useAccessToken();

  const dropdownItems: MenuProps["items"] = useMemo(
    () => [
      {
        key: "logout",
        label: (
          <button className="flex items-center gap-2" onClick={logout}>
            <span className="text-base">Đăng xuất</span>
            <LogoutOutlined className="text-xl" />
          </button>
        ),
      },
    ],
    [logout]
  );

  const menuItems: MenuItemProps[] = useMemo(
    () => [
      {
        label: "Dashboard",
        to: "/",
        icon: <HomeOutlined className="text-2xl" />,
      },
      {
        label: "User management",
        to: "/users",
        icon: <TeamOutlined className="text-2xl" />,
      },
      {
        label: "Test manegement",
        to: "/tests",
        icon: <FileTextOutlined className="text-2xl" />,
      },
    ],
    []
  );

  const getUserProfile = useCallback(
    async (token: string) => {
      dispatch(addLoading());
      const { ok, body, error } = await authApi.getUserProfile(token);
      dispatch(removeLoading());
      if (ok && body) {
        dispatch(setProfile(body));
      }
      if (error) {
        handleResponseError(error);
      }
    },
    [handleResponseError, dispatch]
  );

  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
    } else {
      getUserProfile(accessToken);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken, getUserProfile]);

  return (
    <Layout className="relative min-h-screen">
      <Sider className="overflow-auto main-layout__sider" width={250}>
        <div className="flex items-center justify-center w-full h-16 gap-3">
          <img src={logo} alt="logo" className="w-12 h-12" />
          <div className="flex flex-col items-start">
            <span className="text-xl font-bold text-c-blue-1">
              IELTS TINDER
            </span>
            <span className="text-sm font-thin">Communication</span>
          </div>
        </div>
        <div className="flex flex-col items-start w-full gap-3">
          {menuItems.map((item, index) => (
            <NavLink
              key={`sider-menu-item-${index}`}
              className={({ isActive }) =>
                clsx(
                  "flex items-center w-full gap-6 text-lg font-medium duration-200 hover:text-c-blue-2",
                  {
                    "text-c-blue-2": isActive,
                    "text-c-gray-1": !isActive,
                  }
                )
              }
              to={item.to}
            >
              {({ isActive }) => (
                <Fragment>
                  <div
                    className={clsx("w-[6px] h-14 rounded-e-[10px]", {
                      "bg-c-blue-2": isActive,
                      "bg-transparent": !isActive,
                    })}
                  />
                  <div className="flex items-center gap-3 h-14">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                </Fragment>
              )}
            </NavLink>
          ))}
        </div>
      </Sider>
      <Layout>
        <Header className="flex items-center justify-end h-16 bg-white">
          <Dropdown
            menu={{ items: dropdownItems }}
            placement="bottomRight"
            arrow
          >
            <div className="flex items-center gap-3 cursor-pointer h-fit">
              <span className="text-base font-semibold">
                {`${profile.firstName} ${profile.lastName}`}
              </span>
              <div className="flex items-center justify-center p-3 bg-gray-200 rounded-full">
                <UserOutlined className="text-xl " />
              </div>
            </div>
          </Dropdown>
        </Header>
        <Content className="max-h-[calc(100vh-64px)] min-h-[calc(100vh-64px)] overflow-auto">
          {<Outlet />}
        </Content>
      </Layout>

      {!!isLoading && (
        <div className="z-[2000] absolute top-0 left-0 flex items-center justify-center w-full min-h-screen bg-black opacity-60">
          <Spin size="large" />
        </div>
      )}
    </Layout>
  );
};

export default MainLayout;
