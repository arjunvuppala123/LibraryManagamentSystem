import {useRef} from "react";
import Form from 'react-bootstrap/Form'

function AddBookForm(props) {
    
    const titleNameInputRef = useRef();
    const AuthorInputRef = useRef();
    const PurchaseFromInputRef = useRef();
    const BookImageInputRef = useRef();
    const ReOrderLevelInputRef = useRef();
    const PurchaseDateInputRef = useRef();

    function submitHandler(event){
        event.preventDefault();

        const enteredtitleName = titleNameInputRef.current.value;
        const enteredAuthor = AuthorInputRef.current.value;
        const enteredPurchaseFrom = PurchaseFromInputRef.current.value;
        const enteredBookImage = BookImageInputRef.current.value;
        const enteredCurrentNumber = ReOrderLevelInputRef.current.value;
        const enteredPurchaseDate = PurchaseDateInputRef.current.value;

        const BookData = {
            titleName: enteredtitleName,
            Author: enteredAuthor,
            purchaseFrom: enteredPurchaseFrom,
            bookImage: enteredBookImage,
            currentNumber: enteredCurrentNumber,
            PurchaseDate: enteredPurchaseDate,
        };

        console.log(BookData);
        props.onAddBook(BookData);
}

    return (
        <div className="AddForm">
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Title Name</Form.Label>
                    <Form.Control type="text" ref={titleNameInputRef} />
                </Form.Group>

                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Author</Form.Label>
                    <Form.Control type="text" ref={AuthorInputRef} />
                </Form.Group>

                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Purchase From</Form.Label>
                    <Form.Control type="text" ref={PurchaseFromInputRef} />
                </Form.Group>

                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Book Image</Form.Label>
                    <Form.Control type="url" ref={BookImageInputRef} />
                </Form.Group>

                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>ReOrder Level</Form.Label>
                    <Form.Control type="text" ref={ReOrderLevelInputRef} />
                </Form.Group>

                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Purchase Date</Form.Label>
                    <Form.Control type="date" ref={PurchaseDateInputRef} />
                </Form.Group>
                <div className="actions">
                    <button>Submit</button>
                </div>              
            </Form>
        </div>
    );
}

export default AddBookForm;