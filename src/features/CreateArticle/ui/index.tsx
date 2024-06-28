import { Field, FieldArray, Form, Formik } from 'formik';
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
import { useAppDispatch } from 'store';

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
      <button className={s.addArticleButton} onClick={handleOpen}>
        Новый рецепт
      </button>
      <Modal open={open} onClose={handleClose}>
        <div className={s.createPostFormContainer}>
          <h2 className={s.heading}>Добавить рецепт</h2>
          <Formik
            initialValues={сreateArticleFormValidationScheme.getDefault()}
            onSubmit={val => {
              createArticle({
                ...val,
                user_id: userId,
              });
              handleClose();
            }}
            validateOnBlur
            validationSchema={сreateArticleFormValidationScheme}
            render={({ values }) => (
              // >
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
                  <span>Что понадобится для этого блюда? Укажите количество</span>
                  <FieldArray
                    name="ingredients"
                    render={arrayHelpers => (
                      <div>
                        {values.ingredients && values.ingredients.length > 1 ? (
                          values.ingredients.map((ingredient, index) => (
                            <div key={index} className={s.arrayInputBox}>
                              <Field name={`ingredients.${index}`} className={s.arrayInput} />
                              <button
                                type="button"
                                onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                                className={s.arrayButton}
                              >
                                -
                              </button>
                              <button
                                type="button"
                                onClick={() => arrayHelpers.insert(index, '')}
                                className={s.arrayButton}
                              >
                                +
                              </button>
                            </div>
                          ))
                        ) : (
                          <button type="button" onClick={() => arrayHelpers.push('')} className={s.arrayButtonPrimary}>
                            Добавить ингридиент
                          </button>
                        )}
                      </div>
                    )}
                  />
                </div>
                <div className={s.formField}>
                  <span>Как приготовить это блюдо?</span>
                  <FieldArray
                    name="description"
                    render={arrayHelpers => (
                      <div>
                        {values.description && values.description.length > 1 ? (
                          values.description.map((description, index) => (
                            <div key={index} className={s.arrayInputBox}>
                              <Field name={`description.${index}`} className={s.arrayInput} />
                              <button
                                type="button"
                                onClick={() => arrayHelpers.remove(index)}
                                className={s.arrayButton}
                              >
                                -
                              </button>
                              <button
                                type="button"
                                onClick={() => arrayHelpers.insert(index, '')}
                                className={s.arrayButton}
                              >
                                +
                              </button>
                            </div>
                          ))
                        ) : (
                          <button type="button" onClick={() => arrayHelpers.push('')} className={s.arrayButtonPrimary}>
                            Добавить шаг
                          </button>
                        )}
                      </div>
                    )}
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
                <div className={s.formButtonsContainer}>
                  <button type="submit" className={s.submitButton} disabled={isLoading}>
                    Добавить
                  </button>
                  <button className={s.resetButton} onClick={handleClose}>
                    Отмена
                  </button>
                </div>
              </Form>
            )}
          />
        </div>
      </Modal>
    </>
  );
};
