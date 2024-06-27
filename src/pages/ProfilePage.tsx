import { Container } from '@mui/material';
import { ArticleList } from 'features/Articles/ui/ArticleList';
import { UserProfile } from 'features/ProfilePage';
import { SwipeGallery } from 'features/ProfilePage/ui/SwipeGallery';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from 'shared/components/loader';
import { Article } from 'shared/types/article';
import { UserInfo } from 'store/userData/index';

export const ProfilePage = () => {
  const { user_id } = useParams();
  

  const [user, setUser] = useState<UserInfo | null>(null);
  const [article, setArticle] = useState<Article[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://ef94cb56b136da80.mokky.dev/articles/${user_id}`)
      .then(res => res.json())
      .then(userData => {
        if (userData) {
          setUser(userData.user);
        }

        fetch(`https://ef94cb56b136da80.mokky.dev/articles?user_id=${user_id}`)
          .then(res => res.json())
          .then((articlesData: Article[]) => {
            setArticle(articlesData);
          })
          .catch(console.error)
          .finally(() => setIsLoading(false));
      })
      .catch(console.error);
  }, [user_id]);

  if (!user || isLoading) return <Loader />;

  return (
    <Container>
      <UserProfile postData={user} />
      <SwipeGallery images={article} />
    </Container>
  );
};
