import Button from 'react-bootstrap/Button'
import "../../components/Forms/IssueBookForm"
import Form from 'react-bootstrap/Form'
import { useState, useRef, useContext, useEffect } from "react"
import Popup from './popup';
import AuthContext from '../../store/auth-context';

function BookItem(props) {
    const [isOpen, setIsOpen] = useState(false);
    const [Admin, setAdmin] = useState(false);
    const [booksmain, setbooksmain] = useState([]);

    useEffect(() => {
        fetch(
            'https://librarymanagamentapp-default-rtdb.firebaseio.com/Book.json'
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
                setbooksmain(bookdetails);
            });
    }, []);


    const authCtx = useContext(AuthContext);
    const isLoggedIn = authCtx.isLoggedIn;

    const ownerInputRef = useRef();
    //const authref = props.author;
    //const titleref = props.title;

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

    function submitHandler(event) {
        event.preventDefault();
        
        const enteredIssueName = ownerInputRef.current.value;
        const systemDate = new Date();
        const enteredDate = systemDate.toISOString().slice(0, 10);
        
        var future = new Date();
        future.setDate(future.getDate() + 14);
        const enteredDueDate = future.toISOString().slice(0, 10);

        const bookData = {
            issuedTo: enteredIssueName,
            dueDate: enteredDueDate,
            issuedDate: enteredDate,
            titleName: props.title,
            author: props.author,
        }

        fetch('https://librarymanagamentapp-default-rtdb.firebaseio.com/IssuedBooks.json', {
            method: 'POST',
            body: JSON.stringify(bookData),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(() => {
            alert('issued Sucessfully!')
            setIsOpen(!isOpen);
        })

        for (const key in booksmain) {
            if (booksmain[key].titleName === bookData["titleName"]) {
                booksmain[key].reOrderLevel = parseInt(booksmain[key].reOrderLevel) - 1;
            }
        }

        setbooksmain(booksmain);

        fetch(`https://librarymanagamentapp-default-rtdb.firebaseio.com/Book.json`, {
            method: 'PUT',
            body: JSON.stringify(booksmain),
            headers: {
                'Content-Type': 'application/json',
            },
        }
        ).then(response => {
            setIsOpen(!isOpen);
        }).catch(error => {
            console.log(error);
        })

    }

    const togglePopup = () => {
        setIsOpen(!isOpen);
    }

    return (
        <tr key={props.id}>
            <td><img height="200" src={props.image} alt={props.title} /></td>
            <td>{props.title}</td>
            <td>{props.author}</td>
            <td>{props.description}</td>
            {Admin && (<td>
                <Button onClick={togglePopup} className="Button" variant="primary">Issue
                </Button>
            </td>)}
            {isOpen && <Popup
                content={<>
                    <Form>
                        <p>{props.title}</p>
                        <p>{props.author}</p>
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>Issue to:</Form.Label>
                            <Form.Control type="text" ref={ownerInputRef} />
                        </Form.Group>
                        <br />
                        <Button onClick={submitHandler} className="SearchBookFormButton" variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </>
                }
                handleClose={togglePopup}
            />}
        </tr>

    );
}

export default BookItem;

/**

 */