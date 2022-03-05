import { Header as HeaderWrapper } from '@mantine/core';

const Header = (props) => (
  <HeaderWrapper height={60} padding="xs" {...props}>
    <span>Logo</span>
  </HeaderWrapper>
);

export default Header;
