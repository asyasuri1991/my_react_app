import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from 'store';
import { post } from 'transport';
import { Article } from '../../../../shared/types/article';
import { CreateArticleForm } from '../schemes/createArticles';

export const createArticle = createAsyncThunk('article/createArticle', async (payload: CreateArticleForm, thunkApi) => {
  const state = thunkApi.getState() as RootState;

  const userId = state.userData.userData.id;

  if (!userId) {
    throw new Error('User is not authorized');
  }

  const body = {
    userId,
    date: new Date().toISOString(),
    views: 0,
    likes: 0,
    comments: 0,
    bookmarks: 0,
    ...payload,
  };

  const { data } = await post<Article>('/articles?_relations=users', body);

  return data;
});
