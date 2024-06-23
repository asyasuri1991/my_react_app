import { ArticleList } from 'features/Articles/ui/ArticleList';
import { useState } from 'react';
import { Article } from 'shared/types/article';
import s from 'features/mainPage/styles.module.css';
import { MainBanner } from 'shared/components/MainBanner';
import { Navbar } from 'shared/components/Navbar';
import { baseInstance } from 'transport';
import { useAppDispatch } from 'store';

export const LunchPage = () => {
  const dispatch = useAppDispatch();

  const [articles, setArticles] = useState<Article[] | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const showArticles = async () => {
    try {
      const { data } = await baseInstance.get('/articles?section=Обеды и ужины');
      setArticles(data);
    } catch (e) {
      console.error('Error while fetching expenses');
    }
  };
  showArticles();

  return (
    <div>
      <MainBanner/>
      <Navbar/>
      <h2 className={s.heading}>Обеды и ужины</h2>
      {!articles && isLoading && <div>Loading...</div>}
      {!!articles && !isLoading && <ArticleList articles={articles} />}
    </div>
  );
};
