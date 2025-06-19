import axios, { AxiosError } from "axios";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_BACKEND_URL + "/api";

export const fetcherGet = async <T>(url: string): Promise<T | undefined> =>
    axios.get<T>(url)
        .then((res: { data: T }) => res.data)
        .catch((err: AxiosError) => {
            if (err?.message?.startsWith("Network Error")) {
                throw { message: "Network Error" };
            }
            if (err.response?.status === 404) {
                return undefined;
            }
            throw err.response;
        });

export const fetcherPost = <T>(url: string, body: object = {}) =>
    axios.post<T>(url, body)
        .then((res: { data: T }) => {
            return {data: res.data, err: undefined}
        })
        .catch((err: AxiosError) => {
            return {data: null, err: err.response}
        })

export const fetcherPut = <T>(url: string, body: object = {}) =>
    axios.put<T>(url, body)
        .then((res: import("axios").AxiosResponse<T>) => {
            return {data: res, err: undefined}
        })
        .catch((err: AxiosError) => {
            return {data: undefined, err: err.response}
        })

export const fetcherDelete = <T>(url: string) =>
    axios.delete<T>(url)
        .then((res: import("axios").AxiosResponse<T>) => {
            return { data: res.data, err: undefined };
        })
        .catch((err: AxiosError) => {
            return { data: undefined, err: err.response };
        });
