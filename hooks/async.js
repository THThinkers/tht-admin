import { useCallback } from "react";

export const useAsyncTask = ({ api, parameter, callback }) => {
  const onRequest = useCallback(async () => {
    try {
      const { data } = await api(parameter);
      callback(true, data);
    } catch (err) {
      callback(false, err.response);
    }
  }, [parameter]);
  return onRequest;
};
