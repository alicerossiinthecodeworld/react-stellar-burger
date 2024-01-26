export const BASE_URL = 'https://norma.nomoreparties.space/api';

export type TServerResponse<T> = {
  success: boolean;
} & T;

export const checkResponse = <T,>(res: Response): Promise<T> => {
  if (res.ok) {
    return res.json();
  }
  return res.json().then((err: any) => Promise.reject(err));
};

const checkSuccess = <T,>(res: TServerResponse<T>) => {
  if (res && res.success) {
    return res;
  }
  return Promise.reject(`Ответ не success: ${JSON.stringify(res)}`);
};

export const request = async <T,>(endpoint: string, options?: RequestInit): Promise<T> => {
  return fetch(`${BASE_URL}${endpoint}`, options)
    .then((res) => checkResponse<TServerResponse<T>>(res))
    .then(checkSuccess);
};