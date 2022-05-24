import api from 'core/api';

export const getOrders = () => api.get('orders/').then((x) => x.data.orders);

export const getOrder = (id) => api.get(`orders/${id}`).then((x) => x.data);

export const createOrder = (order) => api.post('orders/', order).then((x) => x.data);

export const updateOrderStatus = (id, status) => api.post(`orders/${id}/status?status=${status}`);
