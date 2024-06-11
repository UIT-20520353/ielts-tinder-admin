import { EAppContrants } from "@/app/constrants";
import { useAppDispatch } from "@/app/hooks";
import { HttpHeaders } from "@/models/http";
import { clearAuthState } from "@/redux/auth-slice";
import { useCallback, useMemo } from "react";
import { useLocalStorage } from "usehooks-ts";

const useAccessToken = () => {
  const dispatch = useAppDispatch();
  const [accessToken, setAccessToken, removeAccessToken] = useLocalStorage(
    EAppContrants.LOCAL_STORAGE_ACCESS_TOKEN,
    ""
  );

  const logout = useCallback(() => {
    dispatch(clearAuthState());
    removeAccessToken();
  }, [removeAccessToken, dispatch]);

  const isHeadersEmpty = useMemo(() => !accessToken, [accessToken]);

  const headers = useMemo(
    (): HttpHeaders => ({ Authorization: `Bearer ${accessToken}` }),
    [accessToken]
  );

  return {
    isHeadersEmpty,
    headers,
    accessToken,
    setAccessToken,
    removeAccessToken,
    logout,
  };
};

export default useAccessToken;
