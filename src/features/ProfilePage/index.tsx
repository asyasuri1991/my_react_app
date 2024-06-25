import type { Article, Article as ArticleType } from '../../shared/types/article';
import s from './profile.module.css';
import Image from 'assets/images/cook.jpg';
import AvatarIcon from 'assets/icons/Userlcon.png';
import { useAppSelector } from 'store';
import { getUserAvatar } from 'store/userData';

type PostCardProps = {
  postData: Article;
};

export const UserProfile = (props: PostCardProps) => {
  const slidesList = props.postData.coverImage;
  const avatar = props.postData.user.avatar;

  return (
    <>
      <div className={s.container}>
        <div className={s.profileBox}>
          <div className={s.profileImage}>
            <img src={Image} alt="cook" />
          </div>
          <div className={s.profileInfoBox}>
            <h2 className={s.profileTitle}>Автор рецептов</h2>
            {/* {avatar ? (
                <img className={s.profileAvatar} src={props.postData.user.avatar} alt="avatar" />
              ) : (
                <img className={s.profileAvatar} src={AvatarIcon} alt="avatar" />
              )}  */}
            <img src={props.postData.user.avatar} alt="avatar" className={s.profileAvatar} />
            <span className={s.profileText}>{props.postData.user.fullName}</span>
          </div>
        </div>
        <div className={s.profileBox}>
          <h3 className={s.profileSubtitle}>Рецепты автора</h3>
        </div>
      </div>
    </>
  );
};
