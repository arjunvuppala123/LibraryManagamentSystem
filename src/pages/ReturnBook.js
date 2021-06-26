import ReturnBookForm from "../components/Forms/BookReturnForm"
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Popup from '../components/BookDetails/popup';
import React, { useState, useEffect, useContext } from "react"
import AuthContext from '../store/auth-context';

function ReturnBook() {
    const [books, setBooks] = useState([]);
    const [booksmain, setbooksmain] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [Admin, setAdmin] = useState(false);

    const authCtx = useContext(AuthContext);
    const isLoggedIn = authCtx.isLoggedIn;

    const adminNames = ["test7@test.com", "admin@test.com", "arjunv2001@test.com"]


    let title = []
    for (const i in books) {
        title.push(books[i].titleName);
    }


    const id = []
    for (const i in books) {
        id.push(books[i].id);
    }

    const titleId = []
    for (const i in booksmain) {
        titleId.push(booksmain[i].titleId);
    }


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
                setBooks(bookdetails);
            });

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

                setbooksmain(bookdetails);
            });

    }, [booksmain]);

    const returnHandler = (bookId) => {
        fetch(
            `https://librarymanagamentapp-default-rtdb.firebaseio.com/IssuedBooks/${bookId}.json`,
            {
                method: 'DELETE'
            }
        ).then(response => {
            setBooks(prevbooksmain =>
                prevbooksmain.filter(book => book.id !== bookId)
            );
            setIsOpen(!isOpen);
        }).catch(error => {
            console.log('Something went wrong!');
        });


        for(const key in books){
            if(books[key].id === bookId){
                title = books[key].titlename
            }
        }

        for (const key in books) {
            if (title.indexOf(books[key].titleName) !== -1) {
                books[key].reOrderLevel = parseInt(books[key].reOrderLevel) + 1;
            }
        }
        setBooks(books);

        fetch(`https://librarymanagamentapp-default-rtdb.firebaseio.com/Book.json`, {
            method: 'PUT',
            body: JSON.stringify(books),
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
        <div>
            <h1>This is the Return book page</h1>
            <ReturnBookForm />
            <div className="Status">
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Title Name</th>
                            <th>Author</th>
                            <th>Issued by:</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {booksmain.map((book) => (
                            <tr key={book.id}>
                                <td>{book.titleName}</td>
                                <td>{book.author}</td>
                                <td>{book.issuedTo}</td>
                                {Admin && <td><Button onClick={togglePopup} className="Button" variant="primary">Return</Button></td>}
                                {isOpen && <Popup
                                    content={<>
                                        <p>Do you want to return this book?<Button onClick={() => returnHandler(book.id)}>YES</Button></p>
                                    </>
                                    }
                                    handleClose={togglePopup}
                                />
                                }
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
}

export default ReturnBook;

/**
         for (const key in booksmain) {
            if (titleId.indexOf(booksmain[key].titleId) !== -1) {
                booksmain[key].issuedTo = "";
                booksmain[key].issueDate = "";
                booksmain[key].dueDate = "";
            }
        }
        setbooksmain(booksmain);

        fetch(
            `https://librarymanagamentapp-default-rtdb.firebaseio.com/bookDetails.json`,{
                method: 'PUT',
                body: JSON.stringify(booksmain),
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        ).then(response => {
            setBooks(prevBooks =>
                prevBooks.filter(book => book.id !== bookId)
            );
        }).catch(error => {
            console.log('Something went wrong!');
        });


        for (const key in books) {
            if (title.indexOf(books[key].titleName) !== -1) {
                books[key].currentNumber = parseInt(books[key].currentNumber) + 1;
            }
        }
        setBooks(books);

        fetch(`https://librarymanagamentapp-default-rtdb.firebaseio.com/BookMaster.json`, {
            method: 'PUT',
            body: JSON.stringify(books),
            headers: {
                'Content-Type': 'application/json',
            },
        }
        ).then(response => {
            setIsOpen(!isOpen);
        }).catch(error => {
            console.log(error);
        })
         */