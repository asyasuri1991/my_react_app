import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CreateArticleForm } from '../features/CreateArticle/model/schemes/createArticles';
import { Article } from '../shared/types/article';
import { RootState } from 'store';

type PostCardProps = {
  postData: Article;
};

type ResponseList<Data> = {
  meta: {
    total_items: number;
    total_pages: number;
    current_page: number;
    per_page: number;
    remaining_count: number;
  };
  items: Data[];
};

export const articlesApi = createApi({
  reducerPath: 'articles',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://ef94cb56b136da80.mokky.dev',
    prepareHeaders: (headers, { getState }) => {
      const store = getState() as RootState;
      const token = store.userData.userData.token;
      if (token) {
        headers.set('Authorization', token);
      }
      return headers;
    },
  }),
  tagTypes: ['Articles'],
  endpoints: builder => ({
    getArticles: builder.query<ResponseList<Article>, number>({
      query: page => `articles?sortBy=id&page=${page}&limit=6`,
      providesTags: ['Articles'],
    }),
    createArticle: builder.mutation<unknown, CreateArticleForm & { userId: number }>({
      query: args => ({
        url: '/articles?_relations=users',
        method: 'POST',
        body: {
          date: new Date().toISOString(),
          views: 0,
          likes: 0,
          comments: 0,
          bookmarks: 0,
          ...args,
        },
      }),
      invalidatesTags: ['Articles'],
    }),
  }),
});

export const { useGetArticlesQuery, useLazyGetArticlesQuery, useCreateArticleMutation } = articlesApi;
