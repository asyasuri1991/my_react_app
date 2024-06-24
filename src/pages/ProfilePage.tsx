import { ArticleView } from 'features/Article/ui/Article';
import { UserProfile } from 'features/ProfilePage';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from 'shared/components/loader';
import { Article } from 'shared/types/article';
import { get } from 'transport';

export const ProfilePage = () => {
  const { userId } = useParams();

  const [articles, setArticles] = useState<Article[] | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    get<Article[]>(`/articles?${userId}`)
      
      .then(({data}) => {
        setArticles(data);
        console.log(data);
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, [userId]);

  if (!articles || isLoading) return <Loader />;

  return (
    <div>
      <h2>Hello, world</h2>

<UserProfile postData={{
        id: 0,
        section: '',
        date: '',
        title: '',
        coverImage: '',
        views: 0,
        likes: 0,
        comments: 0,
        bookmarks: 0,
        content: '',
        ingredients: [],
        description: [],
        userId: 0,
        user: {
          fullName: '',
          email: '',
          id: 0,
          avatar: ''
        },
        time: {
          preparation: '',
          cooking: '',
          all: ''
        },
        nutrients: {
          cal: 0,
          protein: 0,
          fat: 0,
          carb: 0
        },
        portion: 0
      }} />
    </div>
  );
};
