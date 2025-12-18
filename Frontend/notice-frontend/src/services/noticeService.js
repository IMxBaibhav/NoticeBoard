import axios from "axios";

const API = "http://localhost:8080/api/notices";

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getNotices = () =>
  axios.get(API, authHeader());

export const createNotice = (formData) =>
  axios.post(API, formData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "multipart/form-data",
    },
  });

export const deleteNotice = (id) =>
  axios.delete(`${API}/${id}`, authHeader());
