import { PostCard } from 'shared/features/Article/ArticleCard';
import { Article } from 'shared/types/article';
import { Grid } from '@mui/material';

type ArticleListProps = {
  articles: Article[];
};

export const ArticleList = ({ articles }: ArticleListProps) => {

  return (
    <Grid container spacing={2}>
      {articles.map((article, index) => (
        <Grid item key={index} xs={12} sm={6} md={4} lg={4}>
          <PostCard postData={article} />
        </Grid>
      ))}
    </Grid>
  );
};
