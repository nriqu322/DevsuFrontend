import {apiUrl} from './constants';

type Props = {
  service: string;
  body?: any;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
};

export const fetchApi = async <T>({
  service,
  body,
  method = 'GET',
}: Props): Promise<T> => {
  const response = await fetch(`${apiUrl}/${service}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method,
    body: JSON.stringify(body),
  });

  const result = await response.json();

  return result.data ?? result;
};
