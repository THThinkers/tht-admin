import { useCallback, useState } from "react";

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

export const useAsyncAction = ({ api, callback = () => {} }) => {
  const [status, setStatus] = useState("INIT");
  const dispatchAction = async (...args) => {
    setStatus("WAITING");
    try {
      const { data } = await api(...args);
      setStatus("SUCCESS");
      callback(data, true);
      return data;
    } catch (err) {
      setStatus("FAILURE");
      callback(err);
    }
  };

  return [status, dispatchAction];
};
