import { PostCard } from 'shared/features/Article/ArticleCard';
import { Article } from 'shared/types/article';
import s from 'features/Articles/ui/articleList.module.css';

type ArticleListProps = {
  articles: Article[];
};

export const ArticleList = ({ articles }: ArticleListProps) => {
  return (
    <div className={s.container}>
      <div className={s.articleList}>
        {articles.map((article, index) => (
          <PostCard postData={article} key={index} />
        ))}
      </div>
    </div>
  );
};
