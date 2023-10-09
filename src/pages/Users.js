import { Button, Container, Dropdown, Form, Row } from "react-bootstrap";
import NavigationBar from "../components/Navbar";
import { useContext, useState } from "react";
import { ChurchUserContext } from "../contexts/churchUserContext";
import { useNavigate } from "react-router-dom";

function Userspage() {
    const [action, setAction] = useState("ASU");
    const [addStandardUser, setAddStandardUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    })

    const { createChurchUser } = useContext(ChurchUserContext)
    const navigate = useNavigate()

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