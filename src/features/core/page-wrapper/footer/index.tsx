import s from './footer.module.css';
import Logo from 'assets/icons/logo_plate.png';

export const Footer = () => {
  return (
    <footer className={s.footerContainer}>
      <div className={s.footerContent}>
        <div className={s.footerBox}>
          <img src={Logo} alt="logo" className={s.footerLogo} />
          <span className={s.footerTitle}>Готовим с любовью</span>
        </div>
        <div className={s.footerBox}>
          <span className={s.footerText}>© ООО «Блог диджитал», 2024</span>
        </div>
      </div>
    </footer>
  );
};
