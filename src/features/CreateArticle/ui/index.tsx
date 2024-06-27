import { Field, Form, Formik } from 'formik';
import s from './createArticleForm.module.css';

import { Navigate, useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { FormikInput } from '../../../shared/components/FormikInput';
import { сreateArticleFormValidationScheme } from '../model/schemes/createArticles';

import type { FieldProps } from 'formik';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ROUTES } from '../../../router/routes';
import { useCreateArticleMutation } from '../../../services/articles';
import { getUserId } from '../../../store/userData';
import Modal from '@mui/material/Modal';

const options = [
  { label: 'Завтраки', value: 'Завтраки' },
  { label: 'Салаты', value: 'Салаты' },
  { label: 'Десерты и выпечка', value: 'Десерты и выпечка' },
  { label: 'Обеды и ужины', value: 'Обеды и ужины' },
  { label: 'Закуски', value: 'Закуски' },
  { label: 'Соусы', value: 'Соусы' },
];

export const CreateArticleForm = () => {
  const navigate = useNavigate();
  const userId = useSelector(getUserId);
  const [createArticle, { isLoading, isSuccess }] = useCreateArticleMutation();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (isSuccess) {
      navigate(ROUTES.ROOT);
    }
  }, [isSuccess, navigate]);

  if (!userId) return;

  return (
    <>
      <button className={s.headerSubscribe} onClick={handleOpen}>
        Новый рецепт
      </button>
      <Modal open={open} onClose={handleClose}>
        {/* <Box sx={style}> */}
        <div className={s.createPostFormContainer}>
          <h2 className={s.heading}>Добавить рецепт</h2>
          <Formik
            initialValues={сreateArticleFormValidationScheme.getDefault()}
            onSubmit={val => {
              createArticle({
                ...val,
                user_id: userId,
              });

              // dispatch(createArticle(val))
              //   .unwrap()
              //   .then(() => {
              //     navigate(ROUTES.ROOT);
              //   });
            }}
            validateOnBlur
            validationSchema={сreateArticleFormValidationScheme}
          >
            <Form>
              <div className={s.formField}>
                <span>Выберите категорию</span>
                <Field name="section">
                  {({ field, form }: FieldProps) => (
                    <Select
                      value={options.find(({ value }) => field.value === value)}
                      onChange={(val, meta) => {
                        form.setFieldValue(field.name, val?.value || '');
                      }}
                      onBlur={field.onBlur}
                      options={options}
                    />
                  )}
                </Field>
              </div>
              <div className={s.formField}>
                <FormikInput label="Заголовок" name="title" placeholder="Что приготовим?" />
              </div>
              <div className={s.formField}>
                <FormikInput
                  label="Краткое описание"
                  type="textarea"
                  name="content"
                  placeholder="Добавьте краткое описание Вашему рецепту"
                />
              </div>
              <div className={s.formField}>
                <FormikInput label="Обложка" name="coverImage" placeholder="Добавьте ссылку на изображение" />
              </div>
              <div className={s.formField}>
                <FormikInput
                  label="Ингридиенты"
                  type="textarea"
                  name="ingredients"
                  placeholder="Перечислите ингредиенты (в квадратных скобках, каждый ингридиент в кавычках, через запятую)"
                />
              </div>
              <div className={s.formField}>
                <FormikInput
                  label="Приготовление"
                  type="textarea"
                  name="description"
                  placeholder="Опишите процесс приготовления (в квадратных скобках, каждый шаг в кавычках, через запятую)"
                />
              </div>
              <div className={s.formField}>
                <FormikInput
                  label="Количество порций"
                  name="portion"
                  placeholder="Если не уверены, напишите примерно"
                />
              </div>
              <div className={s.formField}>
                <FormikInput label="Подготовка" name="preparation_time" placeholder="Время на подготовку" />
              </div>
              <div className={s.formField}>
                <FormikInput label="Готовка" name="cooking_time" placeholder="Время приготовления" />
              </div>
              <div className={s.formField}>
                <FormikInput label="Общее время" name="all_time" placeholder="Общее время" />
              </div>
              <div className={s.formField}>
                <FormikInput label="Калории" name="cal" placeholder="Сколько калорий в 100 гр Вашего блюда?" />
              </div>
              <div className={s.formField}>
                <FormikInput label="Белки" name="protein" />
              </div>
              <div className={s.formField}>
                <FormikInput label="Жиры" name="fat" />
              </div>
              <div className={s.formField}>
                <FormikInput label="Углеводы" name="carb" />
              </div>
              <button type="submit" className={s.submitButton} disabled={isLoading}>
                Добавить
              </button>
              <button className={s.resetButton} onClick={handleClose}>
                Отмена
              </button>
            </Form>
          </Formik>
        </div>
        {/* </Box> */}
      </Modal>
    </>
  );
};
