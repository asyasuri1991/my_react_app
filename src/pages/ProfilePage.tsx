import { ArticleList } from 'features/Articles/ui/ArticleList';
import { UserProfile } from 'features/ProfilePage';
import { SwipeGallery } from 'features/ProfilePage/ui/SwipeGallery';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from 'shared/components/loader';
import { Article } from 'shared/types/article';
import { UserInfo } from 'store/userData/index';

export const ProfilePage = () => {
  const { userId } = useParams();

  const [user, setUser] = useState<UserInfo | null>(null);

  const [article, setArticle] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://ef94cb56b136da80.mokky.dev/articles/${userId}`)
      .then(res => res.json())
      .then((userData: UserInfo) => {
        setUser(userData);
        console.log(userData);


        fetch(`https://ef94cb56b136da80.mokky.dev/articles?userId=${userId}`)
          .then(res => res.json())
          .then((articlesData: Article[]) => {
            setArticle(articlesData);
          })
          .catch(console.error)
          .finally(() => setIsLoading(false));
      })
      .catch(console.error);
  }, [userId]);

  if (!user || isLoading) return <Loader />;

  return (
    <div>      
      <UserProfile postData={user} />
      <SwipeGallery images={article}/>
    </div>
  );
};
