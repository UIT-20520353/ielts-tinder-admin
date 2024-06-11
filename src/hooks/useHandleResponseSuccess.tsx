import { CheckCircleOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import { useCallback, useMemo } from "react";

const useHandleResponseSuccess = () => {
  const title = useMemo(
    () => (
      <div className="flex flex-col items-center w-full gap-1">
        <CheckCircleOutlined className="text-3xl text-green-400" />
        <span className="text-lg font-medium text-green-400">Notification</span>
      </div>
    ),
    []
  );

  const handleResponseSuccess = useCallback(
    (message: string, afterClose?: (() => void) | undefined) => {
      const instance = Modal.success({
        title,
        content: (
          <div className="flex items-center justify-center w-full">
            <p className="text-base text-center">{message}</p>
          </div>
        ),
        centered: true,
        footer: (
          <div className="flex items-center justify-center w-full mt-2">
            <Button
              className="w-1/2 text-base font-medium bg-green-400 hover:!bg-green-500"
              type="primary"
              onClick={() => {
                if (afterClose) {
                  afterClose();
                }
                instance.destroy();
              }}
            >
              OK
            </Button>
          </div>
        ),
        icon: null,
      });
    },
    [title]
  );

  return handleResponseSuccess;
};

export default useHandleResponseSuccess;
