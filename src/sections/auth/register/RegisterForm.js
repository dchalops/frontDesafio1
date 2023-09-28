import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import { useNavigate } from 'react-router-dom';
// material
import { Stack, TextField, IconButton, InputAdornment, Alert, AlertTitle } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../../redux/actions/authActions';
// component
import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userRgister = useSelector((state) => state.userRgister);
  const { error: registerError, loading: registerLoading } = userRgister;

  const [showPassword, setShowPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().min(2, 'Demasiado corto!').max(50, 'Demasiado largo!').required('Nombre requerido'),
    lastName: Yup.string().min(2, 'Demasiado corto!').max(50, 'Demasiado largo!').required('Apellido requerido'),
    email: Yup.string().email('El correo electrónico debe ser una dirección de correo electrónico válida').required('Email es reuqrido'),
    password: Yup.string().required('Contraseña requerida'),
  });

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      documento: '',
      email: '',
      password: '',
    },
    validationSchema: RegisterSchema,
    onSubmit: () => {
      dispatch(register(values.firstName, values.lastName, values.documento, values.email, values.password));
    },
  });

  const { errors, touched, values, handleSubmit, isSubmitting, getFieldProps } = formik;
  useEffect(() => {
    if (userInfo) {
      navigate('/dashboard/app', { replace: true });
    }
  }, [navigate, userInfo]);
  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="First name"
              {...getFieldProps('firstName')}
              error={Boolean(touched.firstName && errors.firstName)}
              helperText={touched.firstName && errors.firstName}
            />

            <TextField
              fullWidth
              label="Last name"
              {...getFieldProps('lastName')}
              error={Boolean(touched.lastName && errors.lastName)}
              helperText={touched.lastName && errors.lastName}
            />
          </Stack>

          <TextField
            fullWidth
            autoComplete="documento"
            type="documento"
            label="Documento"
            {...getFieldProps('documento')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Contraseña"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />

          {registerError ? (
            <Alert severity="error">
              <AlertTitle>Error al registrarse</AlertTitle>
              {registerError}
            </Alert>
          ) : null}

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={registerLoading ? isSubmitting : null}
          >
            Registrar
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
