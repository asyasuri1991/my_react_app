import { number, object, string, array } from 'yup';

export type CreateArticleForm = {
  title: string;
  description: string[];
  coverImage: string;
  content: string;
  section: string;
  ingredients: string[];
  portion: number;
  preparation_time: string;
  cooking_time: string;
  all_time: string;
  cal: number;
  protein: number;
  fat: number;
  carb: number;
}

export type CreateArticleParams = CreateArticleForm & {
  user_id: number;
  date: string;
  views: number;
  likes: number;
  comments: number;
  bookmarks: number;
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
  preparation_time: string().required('Ингридиенты обязательны').default(''),
  cooking_time: string().required('Ингридиенты обязательны').default(''),
  all_time: string().required('Ингридиенты обязательны').default(''),
  portion: number().required('Количество порций нужно указать').default(1),
  ingredients: array().required('Описание обязательно').ensure(),
  description: array().required('Описание обязательно').ensure(),
  coverImage: string().required('Обложка обязательна').default(''),
  content: string().required('Содержимое обязательно').default(''),
  section: string().default('Завтраки'),
});
