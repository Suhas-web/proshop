import { useState } from "react"
import { Button, Form } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom";


const SearchBox = () => {
    const {keyword: searchBy} = useParams();
    const [name, setName] = useState(searchBy ? searchBy.trim() : '');
    const navigate = useNavigate();
    const submitHandler = (e) => {
        e.preventDefault();
        if(name){
            navigate(`/search/${name.trim()}`)
        } else {
            setName('')
            navigate(`/`)
        }
    }
  return (
    <Form onSubmit={submitHandler} className="d-flex">
        <Form.Control type="text" name="search" value={name} placeholder="Search Products" onChange={e => setName(e.target.value)} className="mr-sm-2 ml-sm-5"></Form.Control>
        <Button type="submit" className="mr-3 ml-1">Search</Button>
    </Form>
  )
}

export default SearchBox