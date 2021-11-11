/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext } from 'react';
import { toast } from 'react-toastify';
import { LoadingContext } from '../contexts/LoadingContext';
import axios from '../services/axios';

type propTypes = {
  getRequest: (url: string, callback: callbackType) => void;
  postRequest: (iurl: string, callback: callbackType, payload: any) => void;
};

type callbackType = (data: any) => void;

function requestApi(): propTypes {
  const { handleLoading } = useContext(LoadingContext);

  async function request(
    typeRequest: string,
    url: string,
    callback: callbackType,
    payload?: null,
  ) {
    try {
      handleLoading(true);
      let res = null;

      if (typeRequest === 'get') {
        const { data } = await axios.get(`/${url}`);
        res = data;
      } else {
        const { data } = await axios.post(`/${url}`, payload);
        res = data;
      }

      if (res) {
        callback(res);
      }

      handleLoading(false);
    } catch (err) {
      toast.error('Ocorreu um erro inesperado!');
      handleLoading(false);
    }
  }

  async function getRequest(url: string, callback: callbackType) {
    await request('get', url, callback);
  }

  async function postRequest(
    url: string,
    callback: callbackType,
    payload?: null,
  ) {
    await request('get', url, callback, payload);
  }

  return { getRequest, postRequest };
}

export default requestApi;
