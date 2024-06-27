import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Loader from '../shared/components/loader';
import { Article } from '../shared/types/article';
import { ArticleList } from 'features/Articles/ui/ArticleList';
import { get } from 'transport';
import { ROUTES } from 'router/routes';
import s from 'features/SectionPage/section.module.css';
import { Container } from '@mui/material';

export const SectionPage = () => {
  const { section } = useParams();

  const [articles, setArticles] = useState<Article[] | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    get<Article[]>(`/articles`, { params: section === 'all' ? {} : { section } })
      .then(({ data }) => {
        setArticles(data);
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, [section]);

  // const showArticles = async () => {
  //   try {
  //     const { data } = await baseInstance.get(`/articles?/${section}`);
  //     setArticles(articles);
  //   } catch (e) {
  //     console.error('Error while fetching expenses');
  //   }
  // };
  // showArticles();

  if (isLoading) return <Loader />;
  if (!articles) return <div>There are not any articles</div>;
  return (
    <Container>
      <Link to={ROUTES.ROOT}>
        <button className={s.button}>На главную</button>
      </Link>
      <ArticleList articles={articles} />
      </Container>
  );
};
