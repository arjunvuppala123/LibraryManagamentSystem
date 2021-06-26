import Table from 'react-bootstrap/Table'
import React, { useState, useEffect } from "react"

function TitleToOrder() {
    const [books, setBooks] = useState([]);

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
    }, [books]);

    console.log(books);

    return (
        <div>
            <h1>This is the Title To Order page</h1>
            <br />
            <div className="Status">
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Title Name</th>
                            <th>Author</th>
                            <th>Reordering Level</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map((book) => (
                            book.reOrderLevel < 10 ? <tr key={book.id}>
                                <td><img height="200" src={book.bookImage} alt={book.titleName} /></td>
                                <td>{book.titleName}</td>
                                <td>{book.Author}</td>
                                <td>{book.currentNumber}</td>
                            </tr> : null
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
}

export default TitleToOrder;