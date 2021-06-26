import BookList from "../components/BookDetails/bookList"
import React, { useState, useEffect, useRef } from "react"
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'

function SearchTitle() {
    const [input, setInput] = useState('');
    const [books, setBooks] = useState([]);
    const [filteredbooks, setFilteredBooks] = useState([]);
    const [isData, setIsData] = useState(false);

    const titleNameInputRef = useRef();
    const AuthorInputRef = useRef();

    function submitHandler() {
        var filtered = [];
        console.log('clicked');

        /** var booksdefault = books;
        console.log(booksdefault);

        var search = titleNameInputRef.current.value;
        var condition = new RegExp(search);
        console.log(condition);

        filtered = booksdefault.filter(function(book) {
            return condition.test(book.titleName);
        })
        console.log(filtered); */

        for (let i = 0; i < books.length; i++) {
            if (books[i].titleName.includes(titleNameInputRef.current.value.toLowerCase()) || books[i].Author === AuthorInputRef.current.value) {
                filtered.push(books[i]);
            }
        }

        setFilteredBooks(filtered);
    }

    const updateInput = async (event) => {
        const filtered = books.filter(book => {
            return book.titleName.toLowerCase().includes(event.target.value.toLowerCase()) || book.Author.toLowerCase().includes(event.target.value.toLowerCase())
        })

        setInput(input);
        setFilteredBooks(filtered);
    }
    /** 
        const updateAuthorInput = async(event) => {
            const filtered = books.filter(book => {
                return book.Author.toLowerCase().includes(event.target.value.toLowerCase())
            })
            
            setInput(input);
            setFilteredBooks(filtered);
        }*/

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
                                onChange={updateInput}
                                ref={titleNameInputRef}
                            />
                        </div>
                        <div className="col">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Author"
                                onChange={updateInput}
                                ref={AuthorInputRef}
                            />
                        </div>
                    </div>
                    <br />
                    <Button onClick={submitHandler} className="SearchBookFormButton" variant="primary">
                        Search
                    </Button>
                </form>
            </div>
            {!isData && <Spinner />}
            <div className="SearchTable">
                {isData && <BookList className="table" Books={filteredbooks} />}
            </div>
        </div>
    );
}

export default SearchTitle;
