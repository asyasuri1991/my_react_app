import classes from 'classnames';
import { NavLink } from 'react-router-dom';
import { ROUTES } from 'router/routes';
import styles from './navbar.module.css';

export const Navbar = () => {

  return (
    <nav className={styles.navbar}>
      <ul className={styles.navbarMenu}>
        <li className={styles.navbarMenuItem}>
          <NavLink
            to={ROUTES.ROOT}
            className={({ isActive }) => classes(styles.navbarMenuLink, { [styles.active]: isActive })}
          >
            <span>Все рецепты</span>
          </NavLink>
        </li>
        <li className={styles.navbarMenuItem}>
          <NavLink
            to={ROUTES.BREAKFAST}
            className={({ isActive }) => classes(styles.navbarMenuLink, { [styles.active]: isActive })}
          >
            <span>Завтраки</span>
          </NavLink>
        </li>
        <li className={styles.navbarMenuItem}>
          <NavLink
            to={ROUTES.SALADS}
            className={({ isActive }) => classes(styles.navbarMenuLink, { [styles.active]: isActive })}
          >
            <span>Салаты</span>
          </NavLink>
        </li>
        <li className={styles.navbarMenuItem}>
          <NavLink
            to={ROUTES.DESSERTS}
            className={({ isActive }) => classes(styles.navbarMenuLink, { [styles.active]: isActive })}
          >
            <span>Десерты и выпечка</span>
          </NavLink>
        </li>
        <li className={styles.navbarMenuItem}>
          <NavLink
            to={ROUTES.SNACKS}
            className={({ isActive }) => classes(styles.navbarMenuLink, { [styles.active]: isActive })}
          >
            <span>Закуски</span>
          </NavLink>
        </li>
        <li className={styles.navbarMenuItem}>
          <NavLink
            to={ROUTES.LUNCH}
            className={({ isActive }) => classes(styles.navbarMenuLink, { [styles.active]: isActive })}
          >
            <span>Обеды и ужины</span>
          </NavLink>
        </li>
        <li className={styles.navbarMenuItem}>
          <NavLink
            to={ROUTES.SAUCE}
            className={({ isActive }) => classes(styles.navbarMenuLink, { [styles.active]: isActive })}
          >
            <span>Соусы</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
