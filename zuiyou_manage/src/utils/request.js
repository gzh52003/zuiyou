/**
 * 二次封装
 */

import axios from "axios";

const request = axios.create({
  // baseURL: "42.194.179.50",
  baseURL: "http://42.194.179.50/zyapi",

  withCredentials: true,
});

export async function get(url, data = {}, config = {}) {
  const { data: result } = await request({
    ...config,
    url,
    method: "get",
    params: data,
  });
  return result;
}

export async function post(url, data, config = {}) {
  const { data: result } = await request({
    ...config,
    url,
    method: "post",
    data,
  });

  return result;
}

export async function put(url, data, config = {}) {
  const { data: result } = await request.put(url, data, config);

  return result;
}

export async function remove(url, data, config = {}) {
  const { data: result } = await request.delete(url, {
    ...config,
    params: data,
  });

  return result;
}

export default {
  get,
  post,
  put,
  remove,
  // patch
};
