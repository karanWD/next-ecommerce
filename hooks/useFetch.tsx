import React, {useState} from 'react';
import axios, {AxiosRequestConfig} from "axios";
import {getCookie} from "cookies-next";
import {ApiRoutes} from "../enums/ApiRoutes";
import {ResponseTypes} from "../types";
import {toast} from "react-toastify";

const instance = axios.create({
    baseURL: ApiRoutes.BASE_URL,
});

instance.interceptors.request.use(req => {
    const cookie = getCookie("user") && JSON.parse(getCookie("user") as string)
    req.headers = {
        'Authorization': `Bearer ${cookie.token}`
    }
    return req;
});

instance.interceptors.response.use(
    res => res,
    err => {
        console.log(err)
    }
);

const UseFetch = ():ResponseTypes => {
    const [response, setResponse] = useState<Omit<ResponseTypes, "request">>({
        response: null ,
        loading: false,
        error: null,
    });

    const request = async (axiosParams: AxiosRequestConfig) => {
        try {
            await setResponse({
                loading: true,
                response: null,
                error: null
            })
            const res = await instance.request(axiosParams)
            await setResponse({
                loading: false,
                response: res.data,
                error: null
            })
            return Promise.resolve(res.data)
        } catch (e: any) {
            setResponse({
                loading: false,
                response: null,
                error: e
            });
            toast.error("خطا در درخواست")
            return Promise.reject(e.message)
        }
    };

    return {...response, request}
};

export default UseFetch;
