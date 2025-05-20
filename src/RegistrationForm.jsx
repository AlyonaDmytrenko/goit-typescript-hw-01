import { Field, Form, Formik, ErrorMessage } from 'formik';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { registerThunk } from './redux/auth/operations';

const RegistrationForm = () => {
  const dispatch = useDispatch();

  const initialValues = {
    name: '',
    email: '',
    password: '',
  };

  const validate = values => {
    const errors = {};
    if (!values.name.trim()) {
      errors.name = 'Name is required';
    }
    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }
    if (!values.password) {
      errors.password = 'Password is required';
    } else if (values.password.length < 7) {
      errors.password = 'Password must be at least 7 characters';
    }
    return errors;
  };

  const handleSubmit = async (
    values,
    { setStatus, setSubmitting, resetForm }
  ) => {
    setStatus(null);
    try {
      // dispatch returns a promise with unwrap() to throw on rejectWithValue
      await dispatch(registerThunk(values)).unwrap();
      resetForm();
    } catch (errorMessage) {
      setStatus(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div><Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, status }) => (
        <Form className="hero bg-base-200 min-h-screen">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl font-bold">Registration now!</h1>
              <p className="py-6">
                Provident cupiditate voluptatem et in. Quaerat fugiat ut
                assumenda excepturi exercitationem quasi. In deleniti eaque aut
                repudiandae et a id nisi.
              </p>
            </div>
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
              <div className="card-body">
                <fieldset className="fieldset space-y-4">
                  <div>
                    <label className="label">Name</label>
                    <Field
                      name="name"
                      type="text"
                      className="input w-full"
                      placeholder="Name"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div>
                    <label className="label">Email</label>
                    <Field
                      name="email"
                      type="email"
                      className="input w-full"
                      placeholder="Email"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div>
                    <label className="label">Password</label>
                    <Field
                      name="password"
                      type="password"
                      className="input w-full"
                      placeholder="Password"
                     
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-neutral mt-4 w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Registering...' : 'Registration'}
                  </button>
                  {status && (
                    <div className="text-red-600 text-sm mt-2 text-center">
                      {status}
                    </div>
                  )}
                  <div className="mt-2 text-center">
                    <Link to="/login" className="link link-hover">
                      You already have an account? Sign in!
                    </Link>
                  </div>
                </fieldset>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
    <div className="divider divider-primary">Primary</div>
            <Link to="/">Back to home</Link>
    </div>
    
    
    
  );
};

export default RegistrationForm;
