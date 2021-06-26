import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import React, { useState, useEffect } from "react"

function DeleteBook() {
    const [books, setBooks] = useState([]);

    const loadDataHandler = () => {
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
    }

    useEffect(() => {
        console.log('RENDERING Books', books);
    }, [books]);

    const removeBookHandler = (bookId) => {
        fetch(
            `https://librarymanagamentapp-default-rtdb.firebaseio.com/Book/${bookId}.json`,
            {
              method: 'DELETE'
            }
          ).then(response => {
            setBooks(prevBooks =>
                prevBooks.filter(book => book.id !== bookId)
            );
          }).catch(error => {
            console.log('Something went wrong!');
          });

    }

    return (
        <div>
            <h1>This is the Delete book page</h1>
            <br />
            <Button onClick={() => loadDataHandler()} className="Load" variant="primary">Load Books</Button>
            <div className="Status">
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Book Image</th>
                            <th>Title Name</th>
                            <th>Author</th>
                            <th>Purchase From</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map((book) => (
                            <tr key={book.id}>
                                <td><img alt="book" height="100" src={book.bookImage} /></td>
                                <td>{book.titleName}</td>
                                <td>{book.Author}</td>
                                <td>{book.purchaseFrom}</td>
                                <td><Button onClick={() => removeBookHandler(book.id)} className="Button" variant="primary">Damaged</Button></td>
                                <td><Button onClick={() => removeBookHandler(book.id)} className="Button" variant="primary">Lost</Button></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
}

export default DeleteBook;