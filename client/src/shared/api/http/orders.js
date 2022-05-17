import api from 'core/api';

export const getOrders = () => api.get('orders/').then((x) => x.data.orders);

export const createOrder = (order) => api.post('orders/', order).then((x) => x.data);
