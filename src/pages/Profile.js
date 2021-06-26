import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'

function Profile() {
    return (
        <div>
            <h1>This is the Profile page</h1>
            <br />
            <div className="Status">
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Book Id</th>
                        <th>Title Name</th>
                        <th>Author</th>
                        <th>Available</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td><Button className="Button" variant="primary">Issue</Button></td>
                        <td><Button className="Button" variant="primary">Add</Button></td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                        <td><Button className="Button" variant="primary">Issue</Button></td>
                        <td><Button className="Button" variant="primary">Add</Button></td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td colSpan="2">Larry the Bird</td>
                        <td>@twitter</td>
                        <td><Button className="Button" variant="primary">Issue</Button></td>
                        <td><Button className="Button" variant="primary">Add</Button></td>
                    </tr>
                </tbody>
            </Table>
            </div>
        </div>
    );
}

export default Profile;