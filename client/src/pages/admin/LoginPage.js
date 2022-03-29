import { Helmet } from 'react-helmet';
import LoginForm from 'features/auth/LoginForm';

const LoginPage = () => (
  <>
    <Helmet>
      <title>Administrator - VELK</title>
    </Helmet>
    <LoginForm />
  </>
);

export default LoginPage;
