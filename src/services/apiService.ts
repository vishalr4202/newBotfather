/* eslint-disable class-methods-use-this */
import axios, { Method, AxiosInstance } from 'axios';
import { setJWTToken, getJWTToken ,setRole} from '../utilities/tokenUtitlity';

type HeaderType = {
    'Content-Type': string;
    Authorization: string;
};

type RequestObjectType = {
    method: Method;
    url: string;
    responseType: any;
    data: any;
    headers: HeaderType;
};

class ApiService {
    private service: AxiosInstance;
    private currentUrl: string;

    constructor() {
        const service = axios.create({
            headers: {}
        });
        this.service = service;
        this.currentUrl = '';
    }

    getHeader = (contentType?: string | null): any => {
        if (contentType === 'multipart/form-data') {
            return {
                'Content-Type': 'multipart/form-data',
                Authorization: getJWTToken()
            };
        } else {
            return {
                'Content-Type': 'application/json;charset=UTF-8',
                Authorization:  getJWTToken()
            };
        }
    };

    getFormattedError = (err: any): any => {
        try {
            if (err?.data?.status) {
                console.log(err,"err 1")
                return {
                    status:  err?.data?.status,
                    message: err?.data?.message,
                    apiErrStatus: err?.data?.status,
                };
            }
            if(err?.data?.data){
                console.log(err,"err 2")
                return {
                    status:err?.data?.statusCode,
                    message:err?.data?.data
                };
            }
            if (err?.data?.status && err?.data?.data) {
                console.log(err,"err 3")
                return {
                    status: err?.data?.status,
                    message: err?.data?.data,
                    apiErrStatus: err?.data?.status,
                };
            }
            if (err?.data?.status && !err?.data?.data) {
                console.log(err,"err 4")
                return {
                    status: err?.data?.status,
                    message: err?.data?.data,
                    apiErrStatus: err?.data?.status,
                };
            }
            if(err?.message && !err?.data){
                console.log(err,"err 5")
                return{
                    status:err?.status,
                    message:err?.message
                }  
            }
            if(err?.data?.fs_error && err?.data?.fs_error?.status === 401){
                console.log(err,"err 6")
                return{
                    status:err?.data?.fs_error?.status,
                    message:err?.data?.fs_error?.reason
                }
            }
            if(err?.data?.fs_error){
                console.log(err,"err 6")
                return{
                    status:err?.data?.fs_error?.status,
                    message:err?.data?.fs_error?.reason
                }
            }
             
            return {
                status: err?.status,
                message: 'Something went wrong',
                Error: err.message
            };
        } catch (e: any) {
            return {
                status: 'error',
                message: 'Something went wrong',
                details: 'Internal Server Error'
            };
        }
    };

    get(path: string, params: any) {
        this.currentUrl = path;
        return this.service
            .request({
                method: 'GET',
                url: path,
                params: params,
                headers: this.getHeader()
            })
            .then((response: any) => {
                response?.data?.token && setJWTToken(response?.data?.token); 
                response?.data?.token && setRole(response?.data?.role);
                console.log(response,"sdfasdsacs")
                return response?.data || response;
            })
            .catch((e: any) => {
                console.log(e?.response?.data,"in get err")
                let resObj
                if(e?.response?.data &&  (e?.response?.data?.code == 401 || e?.response?.data?.status == 401)){
                    resObj = {
                       status: e?.response?.data?.status,
                       message: "Please Login to the broker to view these details",
                   };
               }
               if(e?.response?.data && (e?.response?.data?.code != 401 && e?.response?.data?.status != 401)){
                resObj = {
                   status: e?.response?.data?.status,
                   message: e?.response?.data?.message,
               };
           }
            return this.handleError(resObj)
        });
    }

    put(path: string, payload: any, options = {}) {
        return this.service
            .request(this.getRequestObject('PUT', path, payload, options))
            .then((response: any) => response.data || response)
            .catch((e: any) => this.handleError(e));
    }

    patch(path: string, payload: any, options = {}) {
        return this.service
            .request(this.getRequestObject('PATCH', path, payload, options))
            .then((response: any) => response.data || response)
            .catch((e: any) => this.handleError(e));
    }

    delete(path: string, params: any) {
        this.currentUrl = path;
        return this.service
            .request({
                method: 'DELETE',
                url: path,
                params: params,
                headers: this.getHeader()
            })
            .then((response: any) => {
                response?.data?.token && setJWTToken(response?.data?.token);
                return response?.data || response;
            })
            .catch((e: any) => this.handleError(e));
    }

    post(path: string, payload: any, options = {}, contentType = null) {
        return this.service
            .request(this.getRequestObject('POST', path, payload, options, contentType))
            .then((response: any) => {
                response?.data?.token && setJWTToken(response?.data?.token);  
                response?.data?.token && setRole(response?.data?.role);
                return response?.data || response;
            })
            .catch((e: any) => {
                console.log(e?.response?.data,"resp")
                let resObj
                if(e?.response?.data?.error){
                     resObj = {
                        status: e?.response?.data?.code,
                        message: e?.response?.data?.error?.message,
                    };
                }
                else if(e?.response?.data?.message){
                    resObj = {
                        status: e?.response?.data?.status,
                        message: e?.response?.data?.message,
                    };
                }
                else{
                     resObj = {
                        status: e?.response?.status,
                        data: e?.response?.data,
                    };
                }
                
                console.log(resObj,"err obj")
                return this.handleError(resObj);
            });
    }

    getRequestObject = (
        method: Method,
        path: string,
        payload: any,
        options: any,
        contentType?: null
    ): RequestObjectType => {
        this.currentUrl = path;
        return {
            method: method,
            url: path,
            responseType: options?.responseType || 'json',
            data: payload,
            headers: this.getHeader(contentType)
        };
    };

    handleError = (error: any): Promise<never> => {
        return Promise.reject(this.getFormattedError(error));
    };
}

const apiServiceInst = new ApiService();

export default apiServiceInst;
