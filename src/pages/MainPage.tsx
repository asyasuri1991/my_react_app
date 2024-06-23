import { ArticleList } from '../features/Articles/ui/ArticleList';
import { Slider } from 'shared/components/Slider';
import image from 'assets/images/author.jpg';
import { useSearchParams } from 'react-router-dom';
import Loader from 'shared/components/loader';
import { useGetArticlesQuery } from '../services/articles';
import s from 'features/mainPage/styles.module.css';
import { MainBanner } from 'shared/components/MainBanner';
import { Navbar } from 'shared/components/Navbar';

export const MainPage = () => {
  const [params, setParams] = useSearchParams();
  const section = params.get('section') || 'all';

  const page = Number(params.get('page') || 1);

  const setPage = (page: number) => {
    params.set('page', String(page));
    setParams(params);
  };

  const { data, isLoading, isFetching } = useGetArticlesQuery(page);

  if (isLoading) return <Loader />;
  if (!data?.items) return <div>There are not any articles</div>;

  return (
    <div>
      <MainBanner />
      <Navbar />
      <h2 className={s.heading}>Вся лента</h2>
      <ArticleList articles={data.items} />
      <div className={s.pagination}>
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
      </div>
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
    </div>
  );
};
