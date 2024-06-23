import { useSearchParams } from "react-router-dom";
import { useGetArticlesQuery } from "services/articles";
import s from './pagination.module.css';
import Loader from "../loader";

export const Pagination = () => {
  const [params, setParams] = useSearchParams();
  const section = params.get('section') || 'all';

  const page = Number(params.get('page') || 1);

  const setPage = (page: number) => {
    params.set('page', String(page));
    setParams(params);
  };

  const { data, isLoading, isFetching } = useGetArticlesQuery(page);
  
  if (isLoading) return <Loader />;
  if (!data?.items) return <div>There are not any articles</div>;
  return (
    <div className={s.pagination}>
      <button
        className={s.paginationBtn}
        onClick={() => {
          setPage(page - 1);
        }}
        disabled={isFetching || page === 1}
      >
        Назад
      </button>
      <button
        className={s.paginationBtn}
        onClick={() => setPage(page + 1)}
        disabled={isFetching || data.meta.total_pages === page}
      >
        Вперёд
      </button>
    </div>
  );
};
