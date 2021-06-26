import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
function IssueBookForm(props) {

    //const titleNameInputRef = useRef();
    //const AuthorInputRef = useRef();
    console.log(props.location.state.title);

    return (
        <div className="SearchBookForm">
            <Form>
                <p>title</p>
                <p>author</p>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Issue to</Form.Label>
                    <Form.Control type="text"/>
                </Form.Group>
                <Button className="SearchBookFormButton" variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default IssueBookForm;