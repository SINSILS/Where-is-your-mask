import { Helmet } from 'react-helmet';
import LoginForm from 'features/auth/LoginForm';

const LoginPage = () => (
  <>
    <Helmet>
      <title>Administrator - Where is your mask?</title>
    </Helmet>
    <LoginForm />
  </>
);

export default LoginPage;
