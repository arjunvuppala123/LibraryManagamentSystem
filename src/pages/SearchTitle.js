import BookList from "../components/BookDetails/bookList"
import React, { useState, useEffect, useRef} from "react"
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'

function SearchTitle() {
    const [books, setBooks] = useState([]);
    const [filteredbooks, setFilteredBooks] = useState([]);
    const [isData, setIsData] = useState(false);

    const titleNameInputRef = useRef();
    const AuthorInputRef = useRef();

    function submitHandler() {
        const filtered = [];
        for (let i = 0; i < books.length; i++) {
            if (books[i].titleName === titleNameInputRef.current.value || books[i].Author === AuthorInputRef.current.value) {
                filtered.push(books[i]);
            }
        }
        setFilteredBooks(filtered);
    }


    useEffect(() => {
        setIsData(false);
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
                setFilteredBooks(bookdetails);
                setBooks(bookdetails);
                setIsData(true);
            });
    }, []);

    return (
        <div>
            <div className="AddForm">
                <form onSubmit={submitHandler} className="p-3">
                    <div className="form-row">
                        <div className="col">
                            <input type="text"
                                className="form-control"
                                placeholder="Title Name"
                                ref={titleNameInputRef}
                            />
                        </div>
                        <div className="col">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Author"
                                ref={AuthorInputRef}
                            />
                        </div>
                    </div>
                    <br />
                    <Button onClick={submitHandler} className="SearchBookFormButton" variant="primary">
                        Submit
                    </Button>
                </form>
            </div>
            {!isData && <Spinner />}
            {isData && <BookList className="table" Books={filteredbooks} />}
        </div>
    );
}

export default SearchTitle;
