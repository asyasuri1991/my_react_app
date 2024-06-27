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

  return (
    <div className={s.postCard}>
        <div className={s.coverImage}>
          <img src={postData.coverImage} alt="Cover" />
        </div>
      <div className={s.postCardBox}>
        {/* <div className={s.postCardContent}> */}
        <span className={s.postCardSection}><Link to={`${ROUTES.SECTION}/${postData.section}`}>{postData.section}</Link></span>
        <Link to={`${ROUTES.ARTICLE}/${postData.id}`}>
          <h3 className={s.postCardTitle}>{postData.title}</h3>
        </Link>
        <p className={s.postCardText}>{postData.content}</p>
      </div>

      <div className={s.postCardBottom}>
        <div className={s.postCardDate}>{postData.date}</div>
        <div className={s.postCardViews}><StatsButtons views={postData.views} likes={postData.likes} /></div>
      </div>
      {/* <div className={s.postCardStatsContainer}>
          <StatsButtons likes={postData.likes} />
        </div> */}
      {/* </div> */}
    </div>
  );
};
