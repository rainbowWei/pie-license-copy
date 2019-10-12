/**
 * Created by bingqx on 2017/4/11.
 */
import axios from 'axios';
import qs from 'qs';

let base = Config.licenseserverurl;
let basepush = Config.pushserverurl;

export const getpush = (params) => { return axios.post(`${basepush}/service/v1/user/login`,JSON.stringify(params));};


//用户管理...

//登陆验证
export const login = (params) => { return axios.post(`${base}/license/v1/user/login`,JSON.stringify(params));};

//注册验证
export const signup = (params) => { return axios.post(`${base}/license/v1/user/signup`,JSON.stringify(params));};

//检测是否存在相同的用户
export const checksamename = (params) => {return axios.post(`${base}/license/v1/user/checksamename`,JSON.stringify(params));};

//更新用户密码
export const updatepasswd = (params) => {return axios.post(`${base}/license/v1/user/updatepasswd`,JSON.stringify(params));};

//更新用户信息
export const updateinfo = (params) => {return axios.post(`${base}/license/v1/user/updateinfo?sessionid=${params.sessionid}`,JSON.stringify(params.para));};

//删除用户信息
export const remove = (params) => {return axios.post(`${base}/license/v1/user/remove`,qs.stringify(params));};

//获取用户信息
export const getuserinfo = (params) => {return axios.post(`${base}/license/v1/user/getuserinfo`,qs.stringify(params));};

//获取用户数量
export const getusercount = (params) => {return axios.post(`${base}/license/v1/user/getusercount`,JSON.stringify(params));};

//获取用户列表
export const getuserinfos = (params) => {return axios.post(`${base}/license/v1/user/getuserinfos`,qs.stringify(params));};

//搜索用户
export const searchusers = (params) => {return axios.post(`${base}/license/v1/user/searchusers`,JSON.stringify(params));};


//许可管理...

//创建许可
export const create = (params) => {return axios.post(`${base}/license/v1/license/create?sessionid=${params.sessionid}`,JSON.stringify(params.para));};

//许可下载
export const download = (params) => {return axios.post(`${base}/license/v1/license/download`,JSON.stringify(params));};

//添加许可类型
export const addlicenseinfo = (params) => {return axios.post(`${base}/license/v1/license/addlicenseinfo?sessionid=${params.sessionid}`,JSON.stringify(params.para));};

//获取用户已有的许可权限
export const userlicenseinfo = (params) => {return axios.post(`${base}/license/v1/license/userlicenseinfo`,qs.stringify(params));};

//移除用户的许可类型
export const removelicenseinfo = (params) => {return axios.post(`${base}/license/v1/license/removelicenseinfo`,qs.stringify(params));};

