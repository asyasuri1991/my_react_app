import { createSlice } from '@reduxjs/toolkit';

interface ArticleInfo {
  id: number;
  section: string;
  date: string | number;
  title: string;
  coverImage: string;
  views: number;
  likes: number;
  comments: number;
  bookmarks: number;
  content: string;
  ingredients: string[];
  description: string[];
  user: {
    name: string;
    email: string;
    id: number;
    avatar: string;
  };
  user_id: number;
  preparation_time: string;
  cooking_time: string;
  all_time: string;
  cal: number;
  protein: number;
  fat: number;
  carb: number;
  portion: number;
}

interface StateStore {
  article: ArticleInfo;
  articles: [];
  // theme: "theme-dark" | "theme-light";
  isLoading: boolean;
  error: string | null;
  isAuth: boolean;
}

const initialState: StateStore = {
  article: {} as ArticleInfo,
  articles: [],
  // section: [],
  // theme: "theme-light",
  isLoading: false,
  error: null,
  isAuth: false,
};

export const stateSlice = createSlice({
  name: 'stateSlice',
  initialState,
  reducers: {
    setNewArticles: (state, action) => {
      // state.articles = action.payload;
      state.articles = action.payload.map((article: { id: number }) => ({
        ...article,
        key: article.id,
      }));
    },
  },
});

export const setNewArticles = stateSlice.actions;

export default stateSlice.reducer;
