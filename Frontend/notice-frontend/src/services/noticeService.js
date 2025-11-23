import axios from "axios";

const API_URL = "http://localhost:8080/api/notices";


export const getNotices = () => axios.get(API_URL);
export const getNoticeById = (id) => axios.get(`${API_URL}/${id}`);
export const createNotice = (notice) => axios.post(API_URL, notice);
export const updateNotice = (id, notice) => axios.put(`${API_URL}/${id}`, notice);
export const deleteNotice = (id) => axios.delete(`${API_URL}/${id}`);
