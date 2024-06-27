import { ChangeEvent, Dispatch, FormEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { ROUTES } from '../../../router/routes';
import { useAppDispatch } from '../../../store';
import { getIsLoading, getToken, setIsAuth } from '../../../store/userData';
import { postAuthData } from '../../../store/userData/effects';
import { AuthFormData } from '../../../store/userData/types';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import SimpleSnackbar from 'shared/components/SimpleSnackBar/SimpleSnackBar';
import { fetchData } from 'services/users';
import { Modal } from '@mui/material';
import { useForm } from 'react-hook-form';
import { baseInstance } from 'transport';

interface SignModalProps {
  visibleModal: boolean;
  setVisibleModal: Dispatch<boolean>;
}

interface DataItem {
  id: number;
  role?: string;
  name: string;
  email: string;
  password: string;
  avatar?: string;
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export const SignForm = ({ visibleModal, setVisibleModal }: SignModalProps) => {
  const dispatch = useAppDispatch();
  const isLoading = useSelector(getIsLoading);

  const [isLogin, setIsLogin] = useState<boolean>(true);

  const [emailModalNeeded, setEmailModalNeeded] = useState<boolean>(false);
  const closeEmailModal = () => {
    setEmailModalNeeded(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<DataItem>({
    mode: 'onChange',
  });

  const onSubmit = async (dataForm: DataItem) => {
    if (dataForm.name) {
      try {
        const { data } = await baseInstance.post('/register', dataForm);

        dispatch(postAuthData(dataForm));
        localStorage.setItem('token', data.token);

        dispatch(setIsAuth(true));
        setVisibleModal(false);

        reset();
      } catch (e) {
        console.error(e);
      }

      return;
    }

    try {
      // const users = await fetchData();
      // console.log(users);

      // const existingEmails = users.map((item: DataItem) => item.email);
      // if (!existingEmails.includes(dataForm.email)) {
      //   setEmailModalNeeded(true);
      //   return;
      // } else 
        dispatch(postAuthData(dataForm));
        dispatch(setIsAuth(true));
        reset();
        setVisibleModal(false);
      
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {isLogin ? (
        <Modal
          open={visibleModal}
          onClose={() => {
            setVisibleModal(false);
          }}
        >
          <Box sx={style}>
            <Typography variant="h6" component="h2">
              Вход
            </Typography>
            <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Почта"
                autoComplete="email"
                {...register('email', {
                  required: 'Почта обязательный параметр',

                  pattern: {
                    value:
                      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
                    message: 'Почта введена неверно',
                  },
                })}
                error={!!errors.email}
                helperText={errors.email ? errors.email.message : ''}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Пароль"
                type="password"
                id="password"
                autoComplete="current-password"
                {...register('password', {
                  required: 'Пароль обязательный параметр',
                })}
                error={!!errors.password}
                helperText={errors.password ? errors.password.message : ''}
              />
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={isLoading}>
                {isLoading ? 'Обработка данных...' : 'Войти'}
              </Button>
              {emailModalNeeded && (
                <div>
                  <SimpleSnackbar
                    colorName="error"
                    text="This email is not registered! Please sign up first!"
                    closeModal={closeEmailModal}
                  />
                </div>
              )}
              <Grid container>
                <Grid item>
                  <Button onClick={() => setIsLogin(false)}>Еще не со мной? Зарегистрируйтесь</Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Modal>
      ) : (
        <Modal
          open={visibleModal}
          onClose={() => {
            setVisibleModal(false);
            setIsLogin(true);
          }}
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Регистрация
            </Typography>
            <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="given-name"
                    required
                    fullWidth
                    id="name"
                    label="Логин"
                    autoFocus
                    {...register('name', {
                      required: 'Логин обязательный параметр',
                      minLength: {
                        value: 2,
                        message: 'Минимальная длина 1 символ',
                      },
                    })}
                    error={!!errors.name}
                    helperText={errors.name ? errors.name.message : ''}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Почта"
                    autoComplete="email"
                    {...register('email', {
                      required: 'Почта обязательный параметр',

                      pattern: {
                        value:
                          /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
                        message: 'Почта введена неверно',
                      },
                    })}
                    error={!!errors.email}
                    helperText={errors.email ? errors.email.message : ''}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Пароль"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    {...register('password', {
                      required: 'Пароль обязательный параметр',
                    })}
                    error={!!errors.password}
                    helperText={errors.password ? errors.password.message : ''}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Аватар"
                    type="avatar"
                    id="avatar"
                    autoComplete="new-avatar"
                    {...register('avatar')}
                  />
                </Grid>
              </Grid>
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Зарегистрироваться
              </Button>
              <Grid container justifyContent="flex-start">
                <Grid item>
                  <Button onClick={() => setIsLogin(true)}>Уже зарегистрированы? Войдите</Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Modal>
      )}
    </>
  );
};
