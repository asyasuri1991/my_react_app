import s from './menu.module.css';
import { IMenuItem } from './item.interface';
import { useState } from 'react';
import classNames from 'classnames';
import { Router } from 'react-router-dom';
import CloseIcon from 'assets/icons/closeIcon.svg';

const menu: IMenuItem[] = [
  {
    name: 'Рецепты',
    link: '/',
    // children: [
    //   {
    //     name: 'Завтраки',
    //     link: '/breakfast',
    //   },
    //   {
    //     name: 'Салаты',
    //     link: '/salads',
    //   },
    // ],
  },
  {
    name: 'Обо мне',
    link: '/about',
  },
  {
    name: 'Контакты',
    link: '/contact',
  },
];

export const Menu = (): JSX.Element => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [level, setLevel] = useState<number>(1);
  const [currentMenu, setCurrentMenu] = useState<IMenuItem[][]>([menu]);
  const selectLevel = (level: number, menu?: IMenuItem[]) => {
    if (!menu) {
      return;
    }
    setLevel(level);
    setCurrentMenu(l => {
      l[level] = menu;
      return l;
    });
  };
  const backLevel = () => {
    setLevel(level - 1);
    setCurrentMenu(l => {
      l[level] = [];
      return l;
    });
  };

  return (
    <>
      {/* <button className={s.burgerButton} onClick={() => setIsOpened(true)}>
        <span className={s.burger}></span>
      </button> */}
      <nav className={s.menu} role="navigation">
        <div onClick={() => setIsOpened(false)} className={classNames(s.cover, { [s.coverShow]: isOpened })} />
        <div className={classNames(s.menuBox, { [s.menuBoxSnow]: isOpened })}>
          {/* <div className={s.menuHeader}>
            {level > 1 && (
              <button className={s.backButton} onClick={() => backLevel()}>
                Назад
              </button>
            )}
            {level === 1 && <div className={s.backButton}>Меню</div>}
            <button className={s.closeButton} onClick={() => setIsOpened(false)}>
            ❌
            </button>
          </div> */}
          <div className={s.level} style={{ transform: `translateX(calc(-100% * ${level - 1}- 24px*${level - 1} )` }}>
            {currentMenu.map((item, i) => (
              <ul key={i} className={s.menuList}>
                {item.map((m, index) => (
                  <li key={m.name}>
                    {m.children && (
                      <button className={s.item} onClick={() => selectLevel(level + 1, item)}>
                        {m.name}+
                      </button>
                    )}
                    {m.link && (
                      <a href={m.link} className={s.item}>
                        {m.name}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
};
