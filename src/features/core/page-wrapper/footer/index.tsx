import s from './footer.module.css';

export const Footer = () => {
  return (
    <footer className={s.footerContainer}>
      <nav className={s.footerMenu}>
        <ul className={s.footerMenuList}>
          <li className={s.footerMenuListItem}>Рецепты</li>
          <li className={s.footerMenuListItem}>Обо мне</li>
          <li className={s.footerMenuListItem}>Контакты</li>
        </ul>
      </nav>
    </footer>
  );
};
