import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

function ReturnBookForm() {
    return (
        <div className="AddForm">
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Issued to:</Form.Label>
                <Form.Control type="text" />
            </Form.Group>
            <br />
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </div>
    );
}

export default ReturnBookForm;