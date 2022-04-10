import { NumberInput } from '@mantine/core';

const PriceInput = (props) => (
  <NumberInput
    {...props}
    precision={2}
    hideControls
    parser={(value) => value.replace(/€\s?|(,*)/g, '')}
    formatter={(value) => (Number.isNaN(parseFloat(value)) ? '€ ' : `€ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','))}
  />
);

export default PriceInput;
