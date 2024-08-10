import { useState } from "react";
import { toast } from "react-toastify";
import { axios } from "../services/api/request/axiosConfig";

const useAxiosPost = () => {
  const [response, setResponse] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const postData = (
    url,
    payload,
    callBack,
    isToast,
    successMessage,
    errorMessage
  ) => {
    setLoading && setLoading(true);
    axios
      .post(url, payload)
      .then((res) => {
        setResponse(res?.data);
        callBack && callBack(res?.data);
        setLoading(false);
        if (isToast) {
          toast.success(
            res?.message ||
              res?.data?.message ||
              successMessage ||
              res?.data?.[0]?.message ||
              "Submitted Successfully"
          );
        }
      })
      .catch((err) => {
        setResponse([]);
        setError(err);
        setLoading(false);
        if (isToast) {
          toast.warn(
            err?.response?.data?.message ||
              errorMessage ||
              err?.response?.data?.[0]?.message ||
              "Failed, try again"
          );
        }
      });
  };

  return [response, postData, loading, setResponse, error];
};

export default useAxiosPost;
