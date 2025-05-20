import { useDispatch } from 'react-redux';
import ContactList from '../components/ContactList/ContactList';
import { useEffect } from 'react';
import { fetchDataThunk } from '../redux/contactsOps';

const ContactsPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchDataThunk());
  }, [dispatch]);
  return (
    <div>
      <ContactList />
    </div>
  );
};

export default ContactsPage;
