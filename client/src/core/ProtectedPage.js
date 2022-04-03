import { useUser } from 'core/user';
import { Navigate } from 'react-router-dom';

const ProtectedPage = ({ children }) => {
  const { isAdmin } = useUser();

  return isAdmin ? children : <Navigate to="/admin/login" />;
};

export default ProtectedPage;
