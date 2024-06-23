import { Link } from 'react-router-dom';
import { ROUTES } from '../../../../router/routes';
import { Article } from '../../../types/article';
import { StatsButtons } from '../ArticleStatsButtons/StatsButtons';
import s from './post.module.css';

type PostCardProps = {
  postData: Article;
};

export const PostCard = (props: PostCardProps) => {
  const { postData } = props;

  const sectionLinks: Record<string, string> = {
    'Обеды и ужины': '/lunch',
    'Десерты и выпечка': '/desserts',
    Салаты: '/salads',
    Завтраки: '/breakfast',
    Закуски: '/snacks',
    Соусы: '/sauce',
  };
  const sectionLink = sectionLinks[postData.section];

  return (
    <div className={s.postCard}>
      
        <div className={s.coverImage}>
          <img src={postData.coverImage} alt="Cover" />
        </div>
      
      <div className={s.postCardBox}>
        {/* <div className={s.postCardContent}> */}
        <span className={s.postCardSection}>{sectionLink && <Link to={sectionLink}>{postData.section}</Link>}</span>
        <Link to={`${ROUTES.ARTICLE}/${postData.id}`}>
          <h3 className={s.postCardTitle}>{postData.title}</h3>
        </Link>
        <p className={s.postCardText}>{postData.content}</p>
      </div>

      <div className={s.postCardBottom}>
        <div className={s.postCardDate}>{postData.date}</div>
        <div className={s.postCardViews}>{postData.views}</div>
      </div>
      {/* <div className={s.postCardStatsContainer}>
          <StatsButtons likes={postData.likes} />
        </div> */}
      {/* </div> */}
    </div>
  );
};
