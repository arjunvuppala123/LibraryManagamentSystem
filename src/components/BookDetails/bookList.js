import BookItem from './BookItem';
import Table from 'react-bootstrap/Table'

function BookList(props) {
    return (
        <Table className="SearchTable" striped bordered hover size="sm">
            <thead>
                <tr>
                    <th>Book Id</th>
                    <th>Book Image</th>
                    <th>Title Name</th>
                    <th>Author</th>
                    <th>Available Number</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
            {props.Books.map((book,i) => (
                <BookItem
                    key={book.id}
                    id={book.id}
                    BookId={i}
                    avail={book.reOrderLevel}
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
