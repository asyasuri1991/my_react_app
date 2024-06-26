import Logo from 'assets/images/logo.png';
import { useState, useEffect } from 'react';
import s from './header.module.css';
import { ROUTES } from 'router/routes';
import { Link } from 'react-router-dom';
import { CreateArticleForm } from 'features/CreateArticle/ui';
import { SignForm } from 'features/auth/ui';
import AvatarIcon from 'assets/icons/user.png';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { useAppDispatch, useAppSelector } from 'store';
import { clearUserData, getUserAvatar, setIsAuth, setUserInfo } from 'store/userData';
import { STORAGE_KEYS, clearStorageItem } from 'utils/storage';
import { baseInstance } from 'transport';
import { AppBar, Box, Container, Toolbar } from '@mui/material';

export const Header = () => {
  const dispatch = useAppDispatch();
  const [visibleModal, setVisibleModal] = useState(false);
  const avatar = useAppSelector(getUserAvatar);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [userId, setUserId] = useState(null);

  const handleOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const logoutHandler = () => {
    dispatch(clearUserData());
    clearStorageItem(STORAGE_KEYS.TOKEN);
    clearStorageItem(STORAGE_KEYS.USER_DATA);
  };

  const storedToken = localStorage.getItem('token');
  
  useEffect(() => {
    const checkIsAuth = async () => {
      if (storedToken) {
        try {
          const { data } = await baseInstance.get('/auth_me', {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          });
          setUserId(data.id);

          dispatch(setUserInfo(data));
          dispatch(setIsAuth(true));
        } catch (e) {
          console.error(e);
        }
      } else {
        dispatch(setIsAuth(false));
      }
    };

    void checkIsAuth();
  }, [dispatch, storedToken]);

  return (
    <AppBar position="static" className={s.header}>
      <Container>
        <Toolbar className={s.toolbar}>
          <SignForm setVisibleModal={setVisibleModal} visibleModal={visibleModal} />
          <Link to={ROUTES.ROOT}>
            <Box component="img" src={Logo} alt="logo" sx={{ width: { sm: 226, xs: 130 }, objectFit: 'cover' }} />
          </Link>
          <div className={s.headerAccount}>
            {storedToken ? (
              <>
                <Link to={`${ROUTES.PROFILE}/${userId}`}>
                  {avatar ? (
                    <img className={s.avatar} src={avatar} alt="avatar" />
                  ) : (
                    <img className={s.avatar} src={AvatarIcon} alt="avatar" />
                  )}
                </Link>
                <button className={s.headerLogIn} onClick={handleOpen}>
                  Выйти
                </button>
                <Dialog open={openModal} onClose={handleClose}>
                  <DialogTitle>Вы точно хотите выйти?</DialogTitle>
                  <DialogActions>
                    <Button onClick={handleClose}>Нет</Button>
                    <Button onClick={logoutHandler}>Да</Button>
                  </DialogActions>
                </Dialog>
              </>
            ) : (
              <button className={s.headerLogIn} onClick={() => setVisibleModal(true)}>
                Войти
              </button>
            )}
            <CreateArticleForm />
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
