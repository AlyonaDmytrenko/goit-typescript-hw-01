import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { nanoid } from 'nanoid';
import * as Yup from 'yup';
// import { addContact } from '../../redux/contactsSlice';
import {
  FORM_INITIAL_VALUES,
  MAX_CHAR_NAME_VALIDATION,
  MIN_CHAR_NAME_VALIDATION,
} from '../../utils/constants';
import css from './contactForm.module.css';
import { addContactThunk } from '../../redux/contactsOps';

const contactSchema = Yup.object({
  name: Yup.string()
    .required('Contact name is required!')
    .min(
      MIN_CHAR_NAME_VALIDATION,
      `Your contact name must be greater than ${MIN_CHAR_NAME_VALIDATION} characters`
    )
    .max(
      MAX_CHAR_NAME_VALIDATION,
      `Your contact name must be less than ${MAX_CHAR_NAME_VALIDATION} characters`
    ),
  number: Yup.string().required('Contact number is required!').nullable(),
});

const ContactForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    const finalContact = {
      ...values,
      id: nanoid(),
    };
    dispatch(addContactThunk(finalContact));
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={FORM_INITIAL_VALUES}
      validationSchema={contactSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <label>
          <span className={css.name}>Name</span>
          <Field type="text" name="name" />
          <ErrorMessage component="p" name="name" />
        </label>
        <label>
          <span>Number</span>
          <Field type="text" name="number" />
          <ErrorMessage component="p" name="number" />
        </label>
        <button type="submit">Add contact</button>
      </Form>
    </Formik>
  );
};

export default ContactForm;
