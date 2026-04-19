import api from "../api/axios";

// ====== NOTICE APIs ======
export const getNotices = () => api.get("/notices");
export const createNotice = (data) => api.post("/notices", data);
export const deleteNotice = (id) => api.delete(`/notices/${id}`);
export const getNoticeById = (id) => api.get(`/notices/${id}`);

// ====== ATTACHMENT APIs ======
export const uploadAttachment = (noticeId, file) => {
  const formData = new FormData();
  formData.append("file", file);
  return api.post(`/attachments/notice/${noticeId}`, formData);
};
export const getAttachments = (noticeId) => api.get(`/attachments/notice/${noticeId}`);
export const deleteAttachment = (id) => api.delete(`/attachments/${id}`);

// ====== QUERY APIs ======
export const getAllQueries = () => api.get("/queries/all");
export const getMyQueries = () => api.get("/queries/mine");
export const createQuery = (formData) => api.post("/queries", formData);
export const replyToQuery = (id, replyMessage) =>
  api.put(`/queries/${id}/reply`, { replyMessage });

// ====== ADMIN APIs ======
export const createUser = (params) =>
  api.post("/admin/create-user", null, { params });
