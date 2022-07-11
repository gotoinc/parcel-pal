export default api => ({
  getAll: params => api.get('/requests/all', { params }),
  deleteOne: (requestId, requestType) => api.delete(`/requests/${requestType}/${requestId}`),
  updateOne: (requestId, requestType, data) => api.patch(`/requests/${requestType}/${requestId}`, data),
  create: (requestType, userId, data) => api.post(`/requests/${requestType}/${userId}`, data)
})
