import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8000/api/v1',
  headers: {
    'Content-Type': 'application/json',
    
  },
});

export const setClientHeader = (key, value) => {
  apiClient.defaults.headers.common[key] = value;
};

export const removeClientHeader = (key) => {
  delete apiClient.defaults.headers.common[key];
};

export default apiClient;
