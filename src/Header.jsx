import clsx from 'clsx';
import { NavLink } from 'react-router-dom';
import { selectIsLoggedIn, selectUser } from './redux/auth/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { logoutThunk } from './redux/auth/operations';

const setActiveClass = ({ isActive }) => {
  return clsx(isActive && 'text-red-500');
};

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return (
    <div>
      <h2>Auth</h2>
      {isLoggedIn && <h2>{user.name}</h2>}
      <nav>
        <NavLink className={setActiveClass} to="/">
          Home
        </NavLink>
        <NavLink className={setActiveClass} to="/contacts">
          Contacts
        </NavLink>
        {!isLoggedIn && (
          <>
            <NavLink className={setActiveClass} to="/login">
              Login
            </NavLink>
            <NavLink className={setActiveClass} to="/register">
              Register
            </NavLink>
          </>
        )}
        {isLoggedIn && (
          <button
            onClick={() => dispatch(logoutThunk())}
            className="btn btn-primary"
          >
            Logout
          </button>
        )}
      </nav>
    </div>
  );
};

export default Header;
