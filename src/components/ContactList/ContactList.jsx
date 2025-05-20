import { useSelector } from 'react-redux';
import Contact from './Contact/Contact';
import {
  selectFilteredContacts,
  selectLoading,
  selectError,
} from '../../redux/selectors';
import NameFilter from '../Filter/NameFilter';

const ContactList = () => {
  const filteredContacts = useSelector(selectFilteredContacts);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>Server is dead</h2>;
  }

  return (
    <div>
      <NameFilter />
      <ul>
        {filteredContacts.map(contact => (
          <li key={contact.id}>
            <Contact
              id={contact.id}
              name={contact.name}
              number={contact.number}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
