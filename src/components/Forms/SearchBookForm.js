import Button from 'react-bootstrap/Button'

function SearchBookForm() {
    return (
        <div className="AddForm">
            <form class="p-3">
                <div class="form-row">
                    <div class="col">
                        <input type="text" 
                        className="form-control" 
                        placeholder="Title Name" 
                        //value={keyword}
                        //onChange={(e) => setKeyword(e.target.value)}
                    />
                    </div>
                    <div class="col">
                        <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Author" 
                    />
                    </div>
                </div>
                <br />
                <Button className="SearchBookFormButton" variant="primary" type="submit">
                    Submit
                </Button>
            </form>
        </div>
    )
}

export default SearchBookForm;