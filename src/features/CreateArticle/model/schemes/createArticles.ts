import { number, object, string } from 'yup';

export type CreateArticleForm = {
  title: string;
  description: string;
  coverImage: string;
  content: string;
  section: string;
  ingredients: string;
  portion: number;
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
};

export type CreateArticleParams = CreateArticleForm & {
  userId: number;
  date: string;
  views: number;
  likes: number;
  comments: number;
  bookmarks: number;
  fullName: string;
  email: string;
  avatar: string;
};

export const сreateArticleFormValidationScheme = object().shape({
  title: string()
    .min(3, 'Слишком коротко')
    .max(40, 'Слишком многословно')
    .required('Заголовок обязательный')
    .default(''),
  cal: number().required('Количество порций нужно указать').default(1),
  protein: number().required('Количество порций нужно указать').default(1),
  fat: number().required('Количество порций нужно указать').default(1),
  carb: number().required('Количество порций нужно указать').default(1),
  preparation: string().required('Ингридиенты обязательны').default(''),
  cooking: string().required('Ингридиенты обязательны').default(''),
  all: string().required('Ингридиенты обязательны').default(''),
  portion: number().required('Количество порций нужно указать').default(1),
  ingredients: string().required('Ингридиенты обязательны').default(''),
  description: string().required('Описание обязательно').default(''),
  coverImage: string().required('Обложка обязательна').default(''),
  content: string().required('Содержимое обязательно').default(''),
  section: string().default('Завтраки'),
});
