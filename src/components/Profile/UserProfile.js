import classes from './UserProfile.module.css';
import { useContext, useState, useEffect } from 'react';
import AuthContext from '../../store/auth-context';
import Table from 'react-bootstrap/Table'

const UserProfile = () => {

  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  const [username, setusername] = useState();
  const [books, setBooks] = useState([]);
  const [filtered, setFiltered] = useState([]);

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
        setusername(user);
      }
    })

  useEffect(() => {
    fetch(
      'https://librarymanagamentapp-default-rtdb.firebaseio.com/IssuedBooks.json'
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const bookdetails = [];

        for (const key in data) {
          const book = {
            id: key,
            ...data[key]
          };

          bookdetails.push(book);
        }
        setBooks(bookdetails);
        const filtered = [];
        for (const key in books) {
          if (books[key].issuedTo === username) {
            const filt = {
              id: key,
              ...books[key]
            }

            filtered.push(filt);
          }
        }
        setFiltered(filtered);
      });
  }, []);


  return (
    <section className={classes.profile}>
      <h1>Books Issued:</h1><br />
      <div className="Status">
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Author</th>
              <th>Title Name</th>
              <th>Issued Date</th>
              <th>Due Date</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((filteredbook) => (
              <tr key={filteredbook.id}>
                <td>{filteredbook.author}</td>
                <td>{filteredbook.titleName}</td>
                <td>{filteredbook.issuedDate}</td>
                <td>{filteredbook.dueDate}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </section>
  );
};

export default UserProfile;


/**
      <br />
      <br /><br />
      <br /><br />
      <br /><br />
      <br /><br />
      <br />
      <hr />
      <br />
      <br />
      <h3>Change Password</h3>
      <ProfileForm />
 */