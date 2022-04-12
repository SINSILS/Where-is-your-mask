import { Button, createStyles, Group, Paper, PasswordInput, Text, TextInput } from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import * as yup from 'yup';
import { useUser } from 'core/user';
import { useNavigate } from 'react-router-dom';
import { login } from 'shared/api/http/user';
import useNotification from 'core/notification';

const useStyles = createStyles((theme) => ({
  form: {
    padding: theme.spacing.xl,
    width: 500,
    maxWidth: `calc(100vw - ${theme.spacing.xl * 2}px)`,
  },
}));

const SCHEMA = yup.object().shape({
  email: yup.string().required('Email is required').email('Invalid email'),
  password: yup.string().required('Password is required'),
});

const LoginForm = () => {
  const { showSuccessNotification, showErrorNotification } = useNotification();

  const { setAccessToken } = useUser();

  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    schema: yupResolver(SCHEMA),
  });

  const { classes } = useStyles();

  const handleLogin = (credentials) =>
    login(credentials)
      .then(({ accessToken }) => {
        setAccessToken(accessToken);
        navigate('/', { replace: true });
        showSuccessNotification({ message: 'Logged in as admin' });
      })
      .catch(() => showErrorNotification({ message: 'Invalid credentials' }));

  return (
    <Paper shadow="xs" mx="auto" mt={100} className={classes.form}>
      <form onSubmit={form.onSubmit(handleLogin)}>
        <Text weight={600} size="lg" mb="md">
          Login as an Administrator
        </Text>
        <TextInput label="Email" placeholder="your@email.com" {...form.getInputProps('email')} />
        <PasswordInput mt="sm" label="Password" {...form.getInputProps('password')} />
        <Group position="right" mt="md">
          <Button type="submit">Login</Button>
        </Group>
      </form>
    </Paper>
  );
};

export default LoginForm;
