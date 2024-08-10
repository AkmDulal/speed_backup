import { useState } from "react";
import { axios } from "../services/api/request/axiosConfig";

const useAxiosGet = () => {
  const [response, setResponse] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getData = (url, cb, errorCB) => {
    setLoading(true);
    axios
      .get(url)
      .then((res) => {
        setResponse(res?.data);
        setLoading(false);
        cb && cb(res?.data);
      })
      .catch((err) => {
        setResponse([]);
        setError(err);
        setLoading(false);
        errorCB && errorCB(err);
      });
  };

  return [response, getData, loading, setResponse, error];
};

export default useAxiosGet;
