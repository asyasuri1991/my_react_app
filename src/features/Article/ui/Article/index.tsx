import { StatsButtons } from 'shared/features/Article/ArticleStatsButtons/StatsButtons';
import s from './post.module.css';
import type { Article as ArticleType } from '../../../../shared/types/article';
import { Link } from 'react-router-dom';
import { ROUTES } from 'router/routes';
import { Container } from '@mui/material';
import { useEffect } from 'react';

type ArticleProps = {
  article: ArticleType;
};

export const ArticleView = ({ article }: ArticleProps) => {
  const ingredientsList = article.ingredients;
  const descriptionList = article.description;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container>
      <div className={s.postCard}>
        <div className={s.postCardBreadcrumbsContainer}>
          <ul className={s.postCardBreadcrumbs}>
            <li className={s.postCardBreadcrumbsItem}>
              <Link to={ROUTES.ROOT} className={s.postCardBreadcrumbsLink}>
                Все рецепты
              </Link>
            </li>
            <li className={s.postCardBreadcrumbsItem}>
              <span>
                <Link to={`${ROUTES.SECTION}/${article.section}`} className={s.postCardBreadcrumbsLink}>
                  {article.section}
                </Link>
              </span>
            </li>
            <li className={s.postCardBreadcrumbsItem}>
              <span>{article.title}</span>
            </li>
          </ul>
        </div>

        <div className={s.postCardInfo}>
          <div className={s.postCardImage}>
            <img src={article.coverImage} alt="Cover" />
          </div>
          <div className={s.postCardBox}>
            <div className={s.postCardRow}>
              <span className={s.postCardText}>{article.date}</span>{' '}
              <div className={s.postCardStatsContainer}>
                <StatsButtons likes={article.likes} views={article.views} />
              </div>
            </div>
            <div className={s.postCardBlock}>
              <h2 className={s.postCardTitle}>{article.title}</h2>
              <p className={s.postCardText}>{article.content}</p>
            </div>
          </div>
        </div>

        <div className={s.postCardBox}>
          <div className={s.postCardTimeContainer}>
            <div className={s.postCardTimeBox}>
              <span className={s.postCardTimeSubitle}>Подготовка</span>
              <span className={s.postCardText}>{article.preparation_time}</span>
            </div>
            <div className={s.postCardTimeBox}>
              <span className={s.postCardTimeSubitle}>Готовка</span>
              <span className={s.postCardText}>{article.cooking_time}</span>
            </div>
            <div className={s.postCardTimeBox}>
              <span className={s.postCardTimeSubitle}>Общее время</span>
              <span className={s.postCardText}>{article.all_time}</span>
            </div>
            <div className={s.postCardTimeBox}>
              <span className={s.postCardTimeSubitle}>Число порций</span>
              <span className={s.postCardText}>{article.portion}</span>
            </div>
          </div>
          <div className={s.postCardContent}>
            <h3 className={s.postCardSubtitle}>Ингридиенты</h3>
            <div className={s.postCardIngredients}>
              <ul className={s.postCardIngredientsList}>
                {ingredientsList.map((ingredient: string, index: number) => (
                  <li key={index} className={s.postCardIngredientsListItem}>
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>
            <h3 className={s.postCardSubtitle}>Приготовление</h3>
            <div className={s.postCardDescription}>
              <ul className={s.postCardDescriptionList}>
                {descriptionList.map((description: string, index: number) => (
                  <li key={index} className={s.postCardDescriptionListItem}>
                    {description}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className={s.postCardNutrientsContainer}>
            <table className={s.postCardNutrientsTable}>
              <caption className={s.postCardNutrientsTitle}>
                Пищевая ценность блюда {article.title} (на 100 грамм)
              </caption>
              <thead className={s.postCardNutrientsTableHead}>
                <tr>
                  <th scope="col" className={s.postCardNutrientsTableItem}>
                    Калории
                  </th>
                  <th scope="col" className={s.postCardNutrientsTableItem}>
                    Белки
                  </th>
                  <th scope="col" className={s.postCardNutrientsTableItem}>
                    Жиры
                  </th>
                  <th scope="col" className={s.postCardNutrientsTableItem}>
                    Углеводы
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row" className={s.postCardNutrientsTableItem}>
                    {article.cal} ккал.
                  </th>
                  <td className={s.postCardNutrientsTableItem}>{article.protein} гр.</td>
                  <td className={s.postCardNutrientsTableItem}>{article.fat} гр.</td>
                  <td className={s.postCardNutrientsTableItem}>{article.carb} гр.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h3 className={s.postCardSubtitle}>Вам также может понравиться</h3>
        </div>
      </div>
    </Container>
  );
};
