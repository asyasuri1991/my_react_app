import type { Article, Article as ArticleType } from '../../shared/types/article';
import s from './profile.module.css';
import Image from 'assets/images/cook.jpg';
import { useAppSelector } from 'store';
import { UserInfo } from 'store/userData';
import { useEffect } from 'react';

type PostCardProps = {
  postData: UserInfo;
};

export const UserProfile = (props: PostCardProps) => {
  // const slidesList = props.postData.coverImage;
  // const avatar = props.postData.user.avatar;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div className={s.profileBox}>
        <div className={s.profileImage}>
          <img src={Image} alt="cook" className={s.cookImg} />
        </div>
        <div className={s.profileInfoBox}>
          <h2 className={s.profileTitle}>Автор рецептов</h2>
          <img src={props.postData.avatar} alt="avatar" className={s.profileAvatar} />
          <span className={s.profileText}>{props.postData.name}</span>
        </div>
      </div>
      <div className={s.profileBox}>
        <h3 className={s.profileSubtitle}>Рецепты автора</h3>
      </div>
    </>
  );
};
