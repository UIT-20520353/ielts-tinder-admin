import { QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import { useCallback, useMemo } from "react";

const useConfirmPopup = () => {
  const title = useMemo(
    () => (
      <div className="flex flex-col items-center w-full gap-1">
        <QuestionCircleOutlined className="text-3xl text-yellow-400" />
        <span className="text-lg font-medium text-yellow-400">
          Notification
        </span>
      </div>
    ),
    []
  );

  const showConfirmPopup = useCallback(
    (message: string, onOk: () => void) => {
      const instance = Modal.success({
        title,
        content: (
          <div className="flex items-center justify-center w-full">
            <p className="text-base text-center">{message}</p>
          </div>
        ),
        centered: true,
        footer: (
          <div className="flex items-center justify-center w-full gap-3 mt-2">
            <Button
              className="w-1/3 font-medium text-white bg-yellow-400 hover:!bg-yellow-500"
              type="primary"
              onClick={() => {
                onOk();
                instance.destroy();
              }}
            >
              OK
            </Button>
            <Button
              className="w-1/3 font-medium text-black"
              type="default"
              onClick={() => instance.destroy()}
            >
              Cancel
            </Button>
          </div>
        ),
        icon: null,
      });
    },
    [title]
  );

  return showConfirmPopup;
};

export default useConfirmPopup;
