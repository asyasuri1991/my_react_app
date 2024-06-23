import s from './banner.module.css';
import Banner from 'assets/images/banner.jpg';

export const MainBanner = () => {
  return (
    <div className={s.container}>
      <div className={s.banner}>
        <div className={s.bannerContent}>
          <h1 className={s.bannerHeading}>Готовим с любовью</h1>
          <p className={s.bannerText}>
            От легких ужинов в будние дни до праздничных обедов — мои рецепты были протестированы и усовершенствованы,
            чтобы удовлетворить потребности домашних поваров любого уровня.
          </p>
        </div>
        <div className={s.bannerImg}>
          <img src={Banner} alt="изображение еды" />
        </div>
      </div>
    </div>
  );
};
