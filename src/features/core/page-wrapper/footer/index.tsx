import { Container } from '@mui/material';
import s from './footer.module.css';
import Logo from 'assets/icons/logo_plate.png';

export const Footer = () => {
  return (
    <footer className={s.footerContainer}>
      <Container>
        <div className={s.footerContent}>
          <div className={s.footerBox}>
            <img src={Logo} alt="logo" className={s.footerLogo} />
            <span className={s.footerTitle}>Готовим с любовью</span>
          </div>
          <div className={s.footerBox}>
            <span className={s.footerText}>© «Семейные рецепты», 2024</span>
          </div>
        </div>
      </Container>
    </footer>
  );
};
