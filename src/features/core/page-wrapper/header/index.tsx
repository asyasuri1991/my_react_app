import Logo from 'assets/images/logo.png';
import SearchIcon from 'assets/icons/search.png';
import { ChangeEvent, useState, useEffect } from 'react';
import { Menu } from 'shared/components/Menu';
import s from './header.module.css';
import { ROUTES } from 'router/routes';
import { Link } from 'react-router-dom';
import { fetchData, UserProps } from 'services/users';
import { CreateArticleForm } from 'features/CreateArticle/ui';
import { SignForm } from 'features/auth/ui';
import AvatarIcon from 'assets/icons/user.png';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { useAppDispatch, useAppSelector } from 'store';
import { clearUserData, getToken, getUserAvatar } from 'store/userData';
import { STORAGE_KEYS, clearStorageItem } from 'utils/storage';

export const Header = ({ onSearchChange }: { onSearchChange?: (e: ChangeEvent<HTMLInputElement>) => void }) => {
  const [menuActive, setMenuActive] = useState(false);
  const dispatch = useAppDispatch();
  const [visibleModal, setVisibleModal] = useState(false);

  const avatar = useAppSelector(getUserAvatar);
  const [openModal, setOpenModal] = useState<boolean>(false);

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
  const token = useAppSelector(getToken);

  return (
    <header className={s.header}>
      <SignForm setVisibleModal={setVisibleModal} visibleModal={visibleModal} />
      <div className={s.headerContainer}>
        <div className={s.logo}>
          <Link to={ROUTES.ROOT}>
            <img src={Logo} alt="logo" className={s.logoImg} />
          </Link>
        </div>

        <div className={s.centerSection}>
          <img src={SearchIcon} alt="поиск" className={s.searchIcon} />
          <input
            type="text"
            placeholder="Что бы Вы хотели приготовить?"
            className={s.searchInput}
            onChange={onSearchChange}
          />
        </div>
        {token ? (
          <>
            {avatar ? (
                <img className={s.avatar} src={avatar} alt="avatar" />
            ) : (
                <img className={s.avatar} src={AvatarIcon} alt="avatar" />
            )}

            <button className={s.headerLogIn} onClick={handleOpen}>
              Выйти
            </button>

            <Dialog
              open={openModal}
              keepMounted
              onClose={handleClose}
              aria-describedby="alert-dialog-slide-description"
            >
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
    </header>
  );
};
