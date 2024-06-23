import { useState } from 'react';
import Select from '../Select';
import { baseInstance } from 'transport';
import { Article } from 'shared/types/article';

const options = [
  { value: '-likes', label: 'Понравившиеся (DESC)' },
  { value: 'likes', label: 'Понравившиеся (ASC)' },
  { value: '-views', label: 'Просмотры (DESC)' },
  { value: 'views', label: 'Просмотры (ASC)' },
  { value: '-date', label: 'По дате (DESC)' },
  { value: 'date', label: 'По дате (ASC)' },
];

export const SortSelect = () => {
  const [sort, setSort] = useState('likes');
  const [articles, setArticles] = useState<Article[] | null>(null);

  function handleSortOrderChange(value: any) {
    setSort(value);
  }
  const sortArticles = async () => {
    try {
      const { data } = await baseInstance.get(`/articles?sortBy=${options}`);
      setSort(data);
      console.log(data);
    } catch (e) {
      console.error('Error while fetching expenses');
    }
  };
  sortArticles();
  return <Select value={sort} onChange={handleSortOrderChange} options={options} />;
};
