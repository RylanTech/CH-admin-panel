import { Button, Card, Container, Dropdown, Form, Row } from "react-bootstrap";
import NavigationBar from "../components/Navbar";
import { useContext, useState } from "react";
import { ChurchUserContext } from "../contexts/churchUserContext";
import { Link, useNavigate } from "react-router-dom";

function Userspage() {
    const [action, setAction] = useState("ASU");
    const [addStandardUser, setAddStandardUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    })
    const [query, setQuery] = useState({
        query: ""
    })
    const [users, setUsers] = useState()

    const { createChurchUser, searchUsers } = useContext(ChurchUserContext)
    const navigate = useNavigate()

    function handleQueryChange(event) {
        setQuery((preValue) => {
            return { ...preValue, [event.target.name]: event.target.value }
        })
    }

    function handleChange(event) {
        setAddStandardUser((preValue) => {
            return { ...preValue, [event.target.name]: event.target.value }
        })
    }

    async function handleASUSubmit() {
        let usr = {
            firstName: addStandardUser.firstName,
            lastName: addStandardUser.lastName,
            email: addStandardUser.email,
            password: addStandardUser.password,
            userType: "user"
        }
        await createChurchUser(usr).then(
            navigate('/')
        )
    }

    async function handleAAUSubmit() {
        let usr = {
            firstName: addStandardUser.firstName,
            lastName: addStandardUser.lastName,
            email: addStandardUser.email,
            password: addStandardUser.password,
            userType: "admin"
        }
        await createChurchUser(usr).then(
            navigate('/')
        )
    }

    async function handleSubmit(event) {
        event.preventDefault()
        let arr = await searchUsers(query.query)
        setUsers(arr)
    }

    function mapUsers() {
        if (users) {
            return users.map((user) => {
                return (
                    <div className="col-12 col-md-6">
                        <Link
                            to={`/user/${user.userId}`}
                            className="churchLink"
                        >
                            <Card className="churchItem">
                                <Card.Body>
                                    <Row>
                                        <div className="col-9">
                                            {user.firstName} {user.lastName}
                                            <br />
                                            <div className="denom">
                                                {user.email}
                                                <br />
                                            </div>
                                        </div>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Link>
                    </div>
                )
            })
        }
    }

    function actionXml() {
        if (action === "ASU") {
            return (
                <>
                    <Container>
                        <Row>
                            <center>
                                <h1>Add Standard User</h1>
                            </center>
                            <Form>
                                <Row>
                                    <Form.Group className="col-12 col-sm-6">
                                        <Form.Label>First Name</Form.Label>
                                        <Form.Control
                                            value={addStandardUser.firstName}
                                            name="firstName"
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                    <Form.Group className="col-12 col-sm-6">
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Control
                                            value={addStandardUser.lastName}
                                            name="lastName"
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                    <Form.Group className="col-12 col-sm-6">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            value={addStandardUser.email}
                                            name="email"
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                    <Form.Group className="col-12 col-sm-6">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            value={addStandardUser.password}
                                            name="password"
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                </Row>
                                <center>
                                    <Button
                                        onClick={handleASUSubmit}
                                    >
                                        Submit
                                    </Button>
                                </center>
                            </Form>
                        </Row>
                    </Container>
                </>
            )
        } else if (action === "AAU") {
            return (
                <>
                    <Container>
                        <Row>
                            <center>
                                <h1>Add Admin User</h1>
                            </center>
                            <Form>
                                <Row>
                                    <Form.Group className="col-12 col-sm-6">
                                        <Form.Label>First Name</Form.Label>
                                        <Form.Control
                                            value={addStandardUser.firstName}
                                            name="firstName"
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                    <Form.Group className="col-12 col-sm-6">
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Control
                                            value={addStandardUser.lastName}
                                            name="lastName"
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                    <Form.Group className="col-12 col-sm-6">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            value={addStandardUser.email}
                                            name="email"
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                    <Form.Group className="col-12 col-sm-6">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            value={addStandardUser.password}
                                            name="password"
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                </Row>
                                <center>
                                    <Button
                                        onClick={handleAAUSubmit}
                                    >
                                        Submit
                                    </Button>
                                </center>
                            </Form>
                        </Row>
                    </Container>
                </>
            )
        } else if (action === "EU") {
            return (
                <>
                    <Container>
                        <Row>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="col-12">
                                    <center>
                                        <h1>Search Users</h1>
                                    </center>
                                    <br /><br />
                                    <Form.Control
                                        value={query.query}
                                        name="query"
                                        onChange={handleQueryChange}
                                    />
                                </Form.Group>
                                <Row>
                                    {mapUsers()}
                                </Row>
                            </Form>
                        </Row>
                    </Container>
                </>
            )
        }
    }

    return (
        <>
            <NavigationBar />
            <Container>
                <Row>
                    <Dropdown
                        className="col-12 col-sm-4">
                        <Dropdown.Toggle
                        >
                            Choose Option
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item
                                onClick={() => {
                                    setAction("ASU")
                                }}
                            >Add Standard User
                            </Dropdown.Item>
                            <Dropdown.Item
                                onClick={() => {
                                    setAction("AAU")
                                }}
                            >Add Admin User
                            </Dropdown.Item>
                            <Dropdown.Item
                                onClick={() => {
                                    setAction("EU")
                                }}
                            >Edit User
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Row>
            </Container>
            {actionXml()}
        </>
    )
}
export default Userspage