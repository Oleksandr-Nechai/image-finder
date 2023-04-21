import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FcSearch } from 'react-icons/fc';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

// import PropTypes from 'prop-types';

import {
  Shape,
  Container,
  Input,
  ErrorStyle,
  Button,
} from './Searchbar.styled.js';

function Searchbar({ onSubmitForm }) {
  const handleFormSubmit = (values, actions) => {
    if (!values.nameImage.trim()) {
      return;
    }
    const nameImage = values.nameImage.toLowerCase();
    onSubmitForm(nameImage);
    actions.resetForm();
  };

  const initialValues = {
    nameImage: '',
  };

  const SignupSchema = Yup.object({
    nameImage: Yup.string()
      .min(2, 'Too Short!')
      .max(20, 'Too Long!')
      .required('Required'),
  });
  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={handleFormSubmit}
        validationSchema={SignupSchema}
      >
        <Shape>
          <Container>
            <label>
              <Input type="text" name="nameImage" placeholder="Spring" />
            </label>

            <Button type="submit">
              <FcSearch />
            </Button>
          </Container>
          <ErrorMessage
            name="nameImage"
            render={msg => <ErrorStyle>{Notify.failure(msg)}</ErrorStyle>}
          />
        </Shape>
      </Formik>
    </>
  );
}

export default Searchbar;
