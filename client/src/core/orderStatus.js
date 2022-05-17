export const ORDER_STATUS = {
  READY: 0,
  PROCESSING: 1,
  SHIPPING: 2,
  DONE: 3,
};

export const ORDER_STATUS_LABEL = {
  [ORDER_STATUS.READY]: 'New',
  [ORDER_STATUS.PROCESSING]: 'Processing',
  [ORDER_STATUS.SHIPPING]: 'Shipping',
  [ORDER_STATUS.DONE]: 'Done',
};
