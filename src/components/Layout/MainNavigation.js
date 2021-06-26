import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import AuthContext from '../../store/auth-context';
import classes from './MainNavigation.module.css';

const MainNavigation = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  const [Admin, setAdmin] = useState(false);

  const adminNames = ["test7@test.com", "admin@test.com", "arjunv2001@test.com"]

  fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCiz7_PZ1ki4WFSAg10MthWs6XB5an_ZVc', {
    method: 'POST',
    body: JSON.stringify({ idToken: authCtx.token }),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => {
    // assumption: Always succeeds!
    return res.json();
  })
    .then(data => {
      if (isLoggedIn) {
        const user = data.users[0].email;
        if (adminNames.indexOf(user) !== -1) {
          setAdmin(true);
        }
      }
    })

  const logoutHandler = () => {
    setAdmin(false);
    authCtx.logout();
    // optional: redirect the user
  };

  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!isLoggedIn && (
            <li>
              <Link to='/auth'>Login</Link>
            </li>
          )}
          {isLoggedIn && !Admin && (
            <li>
              <Link to='/profile'>Profile</Link>
            </li>
          )}
          {isLoggedIn && Admin && (
            <li>
              <Link to='/add'>Add Book</Link>
            </li>
          )}
          {isLoggedIn && Admin && (
            <li>
              <Link to='/delete'>Delete Book</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <Link to='/searchTitle'>Search Title</Link>
            </li>
          )}
          {isLoggedIn && Admin && (
            <li>
              <Link to='/titletoorder'>Title To Order</Link>
            </li>
          )}
          {isLoggedIn && Admin && (
            <li>
              <Link to='/return'>Return</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
