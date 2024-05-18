import { AxiosInstance } from 'axios';

declare const apiClient: AxiosInstance;

export const setClientHeader: (key: string, value: string) => void;
export const removeClientHeader: (key: string) => void;

export default apiClient;
