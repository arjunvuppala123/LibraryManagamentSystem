import BookItem from './BookItem';
import Table from 'react-bootstrap/Table'

function BookList(props) {
    return (
        <Table striped bordered hover size="sm">
            <thead>
                <tr>
                    <th>Book Image</th>
                    <th>Title Name</th>
                    <th>Author</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
            {props.Books.map((book) => (
                <BookItem
                    key={book.id}
                    id={book.id}
                    image={book.bookImage}
                    title={book.titleName}
                    author={book.Author}
                />
            ))}
            </tbody>
        </Table>
    );
}

export default BookList;
