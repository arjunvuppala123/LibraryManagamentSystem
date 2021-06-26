import AddBookForm from "../components/Forms/AddBookForm"
import { useHistory } from "react-router-dom"
import React from "react"

function AddBook() {
    const history = useHistory();

    fetch(
        'https://librarymanagamentapp-default-rtdb.firebaseio.com/BookMaster.json'
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
        });


    function addBookHandler(BookData) {
        fetch('https://librarymanagamentapp-default-rtdb.firebaseio.com/Book.json', {
            method: 'POST',
            body: JSON.stringify(BookData),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(() => {
            alert('Book Added!!')
            history.replace('/add')
        })
    }

    return (
        <div>
            <h1>This is the add book page</h1>
            <AddBookForm onAddBook={addBookHandler} />
        </div>
    );
}

export default AddBook;