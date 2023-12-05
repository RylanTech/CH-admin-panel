import { useContext, useEffect, useState } from "react";
import NavigationBar from "../components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Container, Dropdown, DropdownButton, Form, InputGroup, Modal, Row } from "react-bootstrap";
import { ChurchUserContext } from "../contexts/churchUserContext";

function Userpage() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        password: "",
        email: "",
        userType: "",
        userId: 0
    })

    const params = useParams()
    let id = params.id
    const navigate = useNavigate()

    const { getUser, updateUser, deleteUser } = useContext(ChurchUserContext)


    useEffect(() => {
        async function gettingUser() {
            const usr = await getUser(id);

            const usrr = {
                firstName: usr.firstName,
                lastName: usr.lastName,
                email: usr.email,
                userType: usr.userType,
                password: "",
                userId: usr.userId
            }

            setUser(usrr)
        }

        gettingUser();
    }, [id, getUser]);

    function handleChange(event) {
        setUser((preValue) => {
            return { ...preValue, [event.target.name]: event.target.value }
        })
    }

    async function handleSubmit(event) {

        if (user.password === "") {
            delete user.password
        }

        event.preventDefault()
        await updateUser(user).then(
            navigate("/users")
        )
    }

    async function handleDelete() {
        await deleteUser(id).then(
            navigate("/users")
        )
    }

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    IDeleting the user will also delete the user's churches and events
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Keep
                    </Button>
                    <Button variant="danger"
                    onClick={handleDelete}
                    >Understood, delete</Button>
                </Modal.Footer>
            </Modal>
            <NavigationBar />
            {user ? (
                <>
                    <Container>
                        <Row>
                            <center>
                                <h1>Update User ({user.userId})</h1>
                            </center>
                            <Form>
                                <Row>
                                    <Form.Group className="col-12 col-sm-6">
                                        <Form.Label>First Name</Form.Label>
                                        <Form.Control
                                            value={user.firstName}
                                            name="firstName"
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                    <Form.Group className="col-12 col-sm-6">
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Control
                                            value={user.lastName}
                                            name="lastName"
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                    <Form.Group className="col-12 col-sm-6">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            value={user.email}
                                            name="email"
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                    <Form.Group className="col-12 col-sm-6">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            value={user.password}
                                            name="password"
                                            onChange={handleChange}
                                            placeholder="Leave blank to keep the same password"
                                        />
                                    </Form.Group>
                                    <Form.Group className="col-12 col-sm-6">
                                        <Form.Label>User Type</Form.Label>
                                        <InputGroup className="mb-3">
                                            <DropdownButton
                                                variant="outline-secondary"
                                                title="Dropdown"
                                                id="input-group-dropdown-1"
                                            >
                                                <Dropdown.Item
                                                    onClick={(() => {
                                                        let preValue = user
                                                        setUser({
                                                            ...preValue,
                                                            userType: "user"
                                                        })
                                                    })}
                                                >user</Dropdown.Item>
                                                <Dropdown.Item
                                                    onClick={(() => {
                                                        let preValue = user
                                                        setUser({
                                                            ...preValue,
                                                            userType: "admin"
                                                        })
                                                        console.log(user)
                                                    })}
                                                >admin</Dropdown.Item>
                                            </DropdownButton>
                                            <Form.Control
                                                value={user.userType}
                                            />
                                        </InputGroup>
                                    </Form.Group>
                                </Row>
                                <center>
                                    <Button
                                        onClick={handleSubmit}
                                    >
                                        Submit
                                    </Button>
                                    <br /><br />
                                    <Button
                                        onClick={handleShow}
                                        variant="danger"
                                    >
                                        Delete
                                    </Button>
                                </center>
                            </Form>
                        </Row>
                    </Container>
                </>
            ) : (
                <></>
            )}
        </>
    )
}
export default Userpage