import { NumberInput } from '@mantine/core';

const QuantityInput = ({ label, value, onChange }) => (
  <NumberInput label={label} placeholder="Quantity" max={999} min={1} value={value} onChange={onChange} />
);

export default QuantityInput;
