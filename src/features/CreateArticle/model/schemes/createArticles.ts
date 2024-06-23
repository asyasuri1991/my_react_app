import { number, object, string, array } from 'yup';

export type CreateArticleForm = {
  title: string;
  description: string[];
  coverImage: string;
  content: string;
  section: string;
  ingredients: string[];
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
};

export const сreateArticleFormValidationScheme = object().shape({
  title: string()
    .min(3, 'Слишком коротко')
    .max(40, 'Слишком многословно')
    .required('Заголовок обязательный')
    .default(''),
  cal: number().required('Обязательное для заполнения поле').default(1),
  protein: number().required('Обязательное для заполнения поле').default(1),
  fat: number().required('Обязательное для заполнения поле').default(1),
  carb: number().required('Обязательное для заполнения поле').default(1),
  preparation: string().required('Обязательное для заполнения поле').default(''),
  cooking: string().required('Обязательное для заполнения поле ').default(''),
  all: string().required('Обязательное для заполнения поле').default(''),
  portion: number().required('Обязательное для заполнения поле').default(1),
  ingredients: array().required('Обязательное для заполнения поле').default(['']),
  description: array().required('Обязательное для заполнения поле').default(['']),
  coverImage: string().required('Обязательное для заполнения поле').default(''),
  content: string().required('Обязательное для заполнения поле').default(''),
  section: string().default('Завтраки'),
});
