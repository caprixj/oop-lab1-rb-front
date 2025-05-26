import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { useMemo } from 'react';

export default function useApiClient() {
  const { getAccessTokenSilently } = useAuth0();
  const audience = process.env.REACT_APP_AUTH0_AUDIENCE;

  return useMemo(() => {
    const client = axios.create({
      baseURL: 'http://localhost:8080/room-booking/api'
    });
    client.interceptors.request.use(async (config) => {
      const token = await getAccessTokenSilently({ audience });
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    });
    return client;
  }, [getAccessTokenSilently, audience]);
}
