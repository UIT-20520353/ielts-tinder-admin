import { HttpError } from "@/models/http";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import { useCallback, useMemo } from "react";
import useAccessToken from "./useAccessToken";
import { useErrorTranslate } from "./useAppTranslate";

const useHandleResponseError = () => {
  const e = useErrorTranslate();
  const { logout } = useAccessToken();

  const title = useMemo(
    () => (
      <div className="flex flex-col items-center w-full gap-1">
        <ExclamationCircleOutlined className="text-3xl text-red-500" />
        <span className="text-lg font-medium text-red-500">
          {e("error.title")}
        </span>
      </div>
    ),
    [e]
  );

  const handleResponseError = useCallback(
    (error: HttpError, onOk?: () => void) => {
      if (
        error.unauthorized &&
        error.message !== "error.validate.user.is-not-admin" &&
        error.message !== "error.validate.login.invalid-credential"
      ) {
        logout();
        return;
      }

      const instance = Modal.error({
        title,
        content: (
          <div className="flex items-center justify-center w-full">
            <p className="text-base text-center">{e(error.message)}</p>
          </div>
        ),
        centered: true,
        footer: (
          <div className="flex items-center justify-center w-full mt-2">
            <Button
              className="w-1/2"
              danger
              type="primary"
              onClick={() => {
                instance.destroy();
                if (onOk) {
                  onOk();
                }
              }}
            >
              OK
            </Button>
          </div>
        ),
        icon: null,
      });
    },
    [e, title, logout]
  );

  return handleResponseError;
};

export default useHandleResponseError;
