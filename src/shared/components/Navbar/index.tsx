import classes from 'classnames';
import { NavLink, useSearchParams } from 'react-router-dom';
import { ROUTES } from 'router/routes';
import styles from './navbar.module.css';
import { useEffect, useState } from 'react';
import { baseInstance } from 'transport';
import { Article } from 'shared/types/article';
import Select from '../Select';

export const Navbar = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [params, setParams] = useSearchParams();
  const section = params.get('section') || 'all';
  useEffect(() => {
    setIsLoading(true);

    const queryParams = section === 'all' ? '' : `?section=${section}`;

    fetch(`https://ef94cb56b136da80.mokky.dev/articles${queryParams}`)
      .then(res => res.json())
      .then((articlesData: Article[]) => {
        setArticles(articlesData);
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, [section]);
  //   <Select
  //   value={section}
  //   onChange={e => {
  //     params.set('section', e.target.value);
  //     setParams(params);
  //   }}
  //   options={[
  //     { label: 'Все', value: 'all' },
  //     { label: 'Путешествия', value: 'Путешествия' },
  //     { label: 'Животные', value: 'Животные' },
  //   ]}
  // />
  return ( <div></div>
  //       <Select
  //   value={section}
  //   onChange={e => {
  //     params.set('section', e.target.value);
  //     setParams(params);
  //   }}
  //   options={[
  //     { label: 'Все', value: 'all' },
  //     { label: 'Завтраки', value: 'Завтраки' },
  //     { label: 'Салаты', value: 'Салаты' },
  //     { label: 'Десерты и выпечка', value: 'Десерты и выпечка' },
  //     { label: 'Обеды и ужины', value: 'Обеды и ужины' },
  //     { label: 'Закуски', value: 'Закуски' },
  //     { label: 'Соусы', value: 'Соусы' },

  //   ]}
  // />
    // <nav className={styles.navbar}>
    //   <ul className={styles.navbarMenu}>
    //     <li className={styles.navbarMenuItem}>
    //       <button
    //         value={section}
    //         onClick={e => {
    //           params.set('section', e.target.value);
    //           setParams(params);
    //         }}
    //         className={styles.navbarMenuLink}
    //       >
    //         <span>Все рецепты</span>
    //       </button>
    //     </li>
    //     <li className={styles.navbarMenuItem}>
    //       <button
    //         value={Завтраки}
    //         onClick={e => {
    //           params.set('section', e.target.value);
    //           setParams(params);
    //         }}
    //         className={styles.navbarMenuLink}
    //       >
    //         <span>Завтраки</span>
    //       </button>
    //     </li>
    //     <li className={styles.navbarMenuItem}>
    //       <button value={section} className={styles.navbarMenuLink}>
    //         <span>Салаты</span>
    //       </button>
    //     </li>
    //     <li className={styles.navbarMenuItem}>
    //       <button value={section} className={styles.navbarMenuLink}>
    //         <span>Десерты и выпечка</span>
    //       </button>
    //     </li>
    //     <li className={styles.navbarMenuItem}>
    //       <button value={section} className={styles.navbarMenuLink}>
    //         <span>Закуски</span>
    //       </button>
    //     </li>
    //     <li className={styles.navbarMenuItem}>
    //       <button value={section} className={styles.navbarMenuLink}>
    //         <span>Обеды и ужины</span>
    //       </button>
    //     </li>
    //     <li className={styles.navbarMenuItem}>
    //       <button value={section} className={styles.navbarMenuLink}>
    //         <span>Соусы</span>
    //       </button>
    //     </li>
    //   </ul>
    // </nav>
  );
};
