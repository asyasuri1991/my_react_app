import { ArticleList } from '../features/Articles/ui/ArticleList';
import { Slider } from 'shared/components/Slider';
import image from 'assets/images/author.jpg';
import { useSearchParams } from 'react-router-dom';
import Loader from 'shared/components/loader';
import { useGetArticlesQuery, useLazyGetArticlesQuery } from '../services/articles';
import s from 'features/mainPage/styles.module.css';
import { MainBanner } from 'shared/components/MainBanner';
import { Container } from '@mui/material';
import { useState, useEffect } from 'react';
import Select from 'shared/components/Select';
import { Article } from 'shared/types/article';
import { baseInstance, get } from 'transport';
import { SelectAll } from '@mui/icons-material';
import { useDebounce } from 'hooks/useDebounce';
import { useAppDispatch } from 'store';
import { setNewArticles } from 'store/articleData';

export const MainPage = () => {
  const dispatch = useAppDispatch();

  const [articles, setArticles] = useState<Article[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  const [params, setParams] = useSearchParams();
  const section = params.get('section') || 'all';

  // const debouncedValue = useDebounce(search, 300);

  useEffect(() => {
    setIsLoading(true);

    get<Article[]>(`/articles`, { params: section === 'all' ? {} : { section } })
      .then(({ data }) => {
        setArticles(data);
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, [section]);

  // const page = Number(params.get('page') || 1);

  // const setPage = (page: number) => {
  //   params.set('page', String(page));
  //   setParams(params);
  // };

  // const { data, isLoading, isFetching } = useGetArticlesQuery(page);

  // if (isLoading) return <Loader />;
  // if (!articles) return <div>There are not any articles</div>;

  // useEffect(() => {
  //   const searchArticles = async () => {
  //     try {
  //       const { data } = await baseInstance.get(
  //        debouncedValue ? `/articles?title=*${debouncedValue}*` : `/articles`
  //       );
  //       dispatch(setNewArticles(data));
  //     } catch (e) {
  //       console.error("Error while searching");
  //     }
  //   };

  //   void searchArticles();
  // }, [debouncedValue]);

  return (
    <Container>
      <MainBanner />
      <h2 className={s.heading}>Вся лента</h2>
      <div className={s.pageSelect}>
        <Select
          value={section}
          onChange={e => {
            params.set('section', e.target.value);
            setParams(params);
          }}
          options={[
            { label: 'Все рецепты', value: 'all' },
            { label: 'Завтраки', value: 'Завтраки' },
            { label: 'Салаты', value: 'Салаты' },
            { label: 'Десерты и выпечка', value: 'Десерты и выпечка' },
            { label: 'Обеды и ужины', value: 'Обеды и ужины' },
            { label: 'Закуски', value: 'Закуски' },
            { label: 'Соусы', value: 'Соусы' },
          ]}
        />
      </div>
      {isLoading && <Loader />}

      {!!articles && !isLoading && <ArticleList articles={articles} />}
      {/* <div className={s.pagination}>
        <button
          className={s.paginationBtn}
          onClick={() => {
            setPage(page - 1);
          }}
          disabled={isFetching || page === 1}
        >
          Назад
        </button>
        <button
          className={s.paginationBtn}
          onClick={() => setPage(page + 1)}
          disabled={isFetching || data.meta.total_pages === page}
        >
          Вперёд
        </button>
      </div> */}
      <Slider
        slides={[
          {
            id: 1,
            text: 'Я очень люблю свою семью, готовить вкусняшки для них и вместе с ними. Если у вас не получается готовить с любовью, просто поделитесь моими рецептами с близкими, уверена, они поймут намек!',
            image,
          },
          {
            id: 2,
            text: 'Присылайте мне семейные или просто любимые рецепты на почту, и я с радостью размещу их на страницах своего блога. И не забудьте подписаться на меня в facebook, instagram и вконтакте, а читать кулинарные заметки можно в телеграм канале!',
            image,
          },
        ]}
      />
    </Container>
  );
};
