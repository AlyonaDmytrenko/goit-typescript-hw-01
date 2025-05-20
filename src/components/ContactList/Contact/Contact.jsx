import { useDispatch } from 'react-redux';
import { deleteContactThunk } from '../../../redux/contactsOps';

const Contact = ({ id, name, number }) => {
  const dispatch = useDispatch();

  const onDelete = contactId => {
    dispatch(deleteContactThunk(contactId));
  };

  return (
    <form>
      <p>{name}</p>
      <p>{number}</p>
      <button type="button" onClick={() => onDelete(id)}>
        Delete
      </button>
    </form>
  );
};

export default Contact;
