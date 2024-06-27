import LikeIcon from 'assets/icons/heart.svg';
import ViewIcon from 'assets/icons/eye.svg';
import { useState } from 'react';
import { IconButton } from '../../../components/IconButton';
import s from './post.module.css';

type StatsButtonProps = {
  likes: number;
  views: number;
};

export const StatsButtons = (props: StatsButtonProps) => {
  const [likes, setLikes] = useState(props.likes);
  const [views, setViews] = useState(props.views);
  const onLikeClick = () => {
    setLikes(likes + 1);
  };

  return (
    <div className={s.stats}>
      <IconButton icon={<ViewIcon />}> {views}</IconButton>
      <IconButton icon={<LikeIcon color="red" />} onClick={onLikeClick}>
        {likes}
      </IconButton>
      {/* <IconButton> </IconButton>
      <IconButton> </IconButton> */}
    </div>
  );
};
