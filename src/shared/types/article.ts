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
  userId: number;
  user: {
    fullName: string;
    email: string;
    id: number;
    avatar: string;
  };
  time: {
    preparation: string;
    cooking: string;
    all: string;
  };
  nutrients: {
    cal: number;
    protein: number;
    fat: number;
    carb: number;
  };
  portion: number;
};
