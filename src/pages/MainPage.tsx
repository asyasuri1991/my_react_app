import { ArticleList } from '../features/Articles/ui/ArticleList';
import { Slider } from 'shared/components/Slider';
import image from 'assets/images/author.jpg';
import image1 from 'assets/images/hand-drawn-world-vegetarian-day-illustration.png';
import { useSearchParams } from 'react-router-dom';
import Loader from 'shared/components/loader';
import s from 'features/mainPage/styles.module.css';
import { MainBanner } from 'shared/components/MainBanner';
import { useState, useEffect, SyntheticEvent } from 'react';
import { Article } from 'shared/types/article';
import { get } from 'transport';
import { Container, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

export const MainPage = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  const [params, setParams] = useSearchParams();
  const section = params.get('section') || 'all';
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    setIsLoading(true);

    get<Article[]>(`/articles`, { params: section === 'all' ? {} : { section } })
      .then(({ data }) => {
        setArticles(data);
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, [section]);

  useEffect(() => {
    setIsLoading(true);

    get<Article[]>(`/articles?title=*${searchValue}`)
      .then(({ data }) => {
        setArticles(data);
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, [searchValue]);

  const titles = articles.map(obj => obj.title.toLocaleLowerCase().trim());
  console.log(titles);

  return (
    <Container>
      <MainBanner />
      <h2 className={s.heading}>Вся лента</h2>
      <TextField
        sx={{ mb: 2 }}
        fullWidth
        placeholder="Что бы Вы хотели приготовить?"
        className={s.searchInput}
        onChange={e => setSearchValue(e.currentTarget.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <div className={s.pageSelect}>
        <Tabs
          value={section}
          onChange={(e: SyntheticEvent, newValue: string) => {
            params.set('section', newValue);
            setParams(params);
          }}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="Все рецепты" value="all" />
          <Tab label="Завтраки" value="Завтраки" />
          <Tab label="Десерты и выпечка" value="Десерты и выпечка" />
          <Tab label="Обеды и ужины" value="Обеды и ужины" />
          <Tab label="Закуски" value="Закуски" />
          <Tab label="Соусы" value="Соусы" />
        </Tabs>
      </div>
      {isLoading && <Loader />}
      {!isLoading &&
        (searchValue ? (
          <>
            {articles.filter(article => article.title.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()))
              .length > 0 ? (
              <ArticleList
                articles={articles.filter(article =>
                  article.title.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()),
                )}
              />
            ) : (
              <p>Блюдо не найдено</p>
            )}
          </>
        ) : (
          <ArticleList articles={articles} />
        ))}

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
            image: image1,
          },
        ]}
      />
    </Container>
  );
};
