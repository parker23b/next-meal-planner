import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

interface ApiResponse<T = any> {
  data: T | null;
  error: AxiosError<unknown, any> | null;
}

const useAxios = () => {
  const makeRequest = async <T>(
    config: AxiosRequestConfig,
    responseType?: "json" | "text" | "blob"
  ): Promise<ApiResponse<T>> => {
    try {
      const response: AxiosResponse<T> = await axios({
        ...config,
        responseType: responseType || "json",
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          ...config.headers,
        },
      });
      return { data: response.data, error: null };
    } catch (error) {
      return { data: null, error: error as AxiosError<unknown, any> };
    }
  };

  const handleErrorMessage = (error: AxiosError<unknown, any>) => {
    return error;
  };

  const get = async <T>(
    url: string,
    responseType?: "json" | "text" | "blob",
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> => {
    return makeRequest<T>({ ...config, method: "get", url }, responseType);
  };

  const post = async <T>(
    url: string,
    data?: any,
    responseType?: "json" | "text" | "blob",
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> => {
    return makeRequest<T>(
      { ...config, method: "post", url, data },
      responseType
    );
  };

  const put = async <T>(
    url: string,
    data?: any,
    responseType?: "json" | "text" | "blob",
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> => {
    return makeRequest<T>(
      { ...config, method: "put", url, data },
      responseType
    );
  };

  const del = async <T>(
    url: string,
    responseType?: "json" | "text" | "blob",
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> => {
    return makeRequest<T>({ ...config, method: "delete", url }, responseType);
  };

  return {
    get,
    post,
    put,
    delete: del,
    handleErrorMessage,
  };
};

export default useAxios;
