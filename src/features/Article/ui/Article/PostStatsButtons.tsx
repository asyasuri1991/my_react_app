import { useState } from 'react';
import { Article } from 'shared/types/article';
import styles from './postStatsButtons.module.css';
import { IconButton } from 'shared/components/IconButton';
import HeartIcon from 'assets/icons/heart.svg';
import ViewIcon from 'assets/icons/eye.svg';

type PostStatsButtonsProps = Pick<Article, 'views' | 'likes' | 'comments' | 'bookmarks'>;

export const PostStatsButtons = (props: PostStatsButtonsProps) => {
  const [likes, setLikes] = useState(0);

  const onLikeClick = () => {
    setLikes(prev => prev + 1);
  };

  return (
    <div className={styles.stats}>
      <IconButton icon={<ViewIcon  height={20} width={20} />}>{props.views}</IconButton>
      <IconButton icon={<HeartIcon height={20} width={20} />} onClick={onLikeClick}>
        {likes}
      </IconButton>
      {/* <IconButton icon="Comments">{props.comments}</IconButton> */}
      {/* <IconButton icon="Bookmarks">{props.bookmarks}</IconButton> */}
    </div>
  );
};
