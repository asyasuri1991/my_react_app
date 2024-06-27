export type Article = {
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
};
