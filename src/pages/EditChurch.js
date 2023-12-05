import { useContext, useEffect, useState } from "react";
import NavigationBar from "../components/Navbar";
import { ChurchContext } from "../contexts/churchContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Card, Container, Form, Row } from "react-bootstrap";
import { ChurchUserContext } from "../contexts/churchUserContext";

function EditChurch() {
    const [church, setChurch] = useState({
        userId: 0,
        churchName: "",
        denomination: "",
        location: {
            street: "",
            city: "",
            state: "",
            zip: "",
        },
        phoneNumber: "",
        churchEmail: "",
        welcomeMessage: "",
        serviceTime: "",
        imageUrl: "",
        website: "",
    });
    const [searchUser, setSearchUser] = useState("")
    const [churchIdPlaceholder, setChurchIdPlaceholder] = useState("")
    const [users, setUsers] = useState()

    const params = useParams()
    let id = params.id
    const navigate = useNavigate()

    const { getChurch, updateChurch } = useContext(ChurchContext)
    const { searchUsers } = useContext(ChurchUserContext)

    useEffect(() => {
        async function gettingChurch() {
            let chr = await getChurch(id)
            setChurch(chr)
        }
        gettingChurch()
    }, [])

    const handleChange = async (event) => {
        let name = event.target.name
        let value = event.target.value
        if (typeof name === "string") {
            if (name.startsWith("location.")) {
                const key = name.split(".")[1];
                setChurch((prevChurch) => ({
                    ...prevChurch,
                    location: {
                        ...prevChurch.location,
                        [key]: typeof value === "string" ? value.trim() : value,
                    },
                }));
            } else {
                setChurch((prevChurch) => ({
                    ...prevChurch,
                    [name]: typeof value === "string" ? value.trim() : value,
                }));
            }
        } else {
            // Handle the case where 'name' is not a string (e.g., an invalid input)
            console.error("Invalid 'name' parameter:", name);
        }
    };

    async function searchAUser(value) {
        setSearchUser(value)
        let users = await searchUsers(value)
        setUsers(users)
    }

    async function handleSubmit() {
        await updateChurch(church).then(
            navigate('/churches')
        )
    }

    function handleSetUsers(user) {
        setChurch(prevChurch => ({
            ...prevChurch,
            userId: user.userId,
        }));
    }

    function mapUsers() {
        if (users) {
            let userXml = []
            users.map((user) => {
                userXml.push(
                    <div className="col-12" onClick={() => handleSetUsers(user)}>
                        <Card className="churchItem">
                            <Card.Body>
                                <Row>
                                    <div className="col-9">
                                        {user.firstName} {user.lastName} - {user.userId}
                                        <br />
                                        <div className="denom">
                                            {user.email}
                                            <br />
                                        </div>
                                    </div>
                                </Row>
                            </Card.Body>
                        </Card>
                    </div>
                )
            })
            return userXml
        }
    }


    return (
        <>
            <NavigationBar />
            {church ? (
                <>
                    <Container>
                        <Row>
                            <Form onSubmit={handleSubmit}>
                                <Row>
                                    <img className="col-12 col-sm-3" src={church.imageUrl} />
                                    <Form.Group className="col-12 col-sm-9">
                                        <Form.Label>imageUrl</Form.Label>
                                        <Form.Control
                                            value={church.imageUrl}
                                            name="imageUrl"
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                    <Form.Group className="col-12 col-sm-6">
                                        <Form.Label>Church Name</Form.Label>
                                        <Form.Control
                                            value={church.churchName}
                                            name="churchName"
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                    <Form.Group className="col-12 col-sm-6">
                                        <Form.Label>Denomination</Form.Label>
                                        <Form.Control
                                            value={church.denomination}
                                            name="denomination"
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                    <Form.Group className="col-9 col-sm-8">
                                        <Form.Label>Street</Form.Label>
                                        <Form.Control
                                            value={church.location.street}
                                            name="location.street"
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                    <Form.Group className="col-3 col-sm-4">
                                        <Form.Label>State</Form.Label>
                                        <Form.Control
                                            value={church.location.state}
                                            name="location.state"
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                    <Form.Group className="col-9 col-sm-8">
                                        <Form.Label>City</Form.Label>
                                        <Form.Control
                                            value={church.location.city}
                                            name="location.city"
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                    <Form.Group className="col-3 col-sm-4">
                                        <Form.Label>Zip</Form.Label>
                                        <Form.Control
                                            value={church.location.zip}
                                            name="location.zip"
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                    <Form.Group className="col-12 col-sm-8">
                                        <Form.Label>Church Email</Form.Label>
                                        <Form.Control
                                            value={church.churchEmail}
                                            name="churchEmail"
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                    <Form.Group className="col-6 col-sm-4">
                                        <Form.Label>Phone Number</Form.Label>
                                        <Form.Control
                                            value={church.phoneNumber}
                                            name="phoneNumber"
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                    <Form.Group className="col-6 col-sm-4">
                                        <Form.Label>User Id</Form.Label>
                                        <Form.Control
                                            value={church.userId}
                                            disabled
                                        />
                                    </Form.Group>
                                    <Form.Group className="col-12 col-sm-8">
                                        <Form.Label>Select a Church</Form.Label>
                                        <Form.Control
                                            value={searchUser}
                                            name="searchUser"
                                            onChange={(e) => searchAUser(e.target.value)}
                                        />
                                        {users ? (
                                            <>
                                                {mapUsers()}
                                            </>
                                        ) : (
                                            <>

                                            </>
                                        )}
                                    </Form.Group>
                                    <Form.Group className="col-12">
                                        <Form.Label>Website</Form.Label>
                                        <Form.Control
                                            value={church.website}
                                            name="website"
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                    <Form.Group className="col-12">
                                        <Row>
                                            <Form.Label>Service Time</Form.Label>
                                            <br />
                                            <textarea
                                                rows={3}
                                                value={church.serviceTime}
                                                name="serviceTime"
                                                onChange={handleChange}
                                            />
                                        </Row>
                                    </Form.Group>
                                    <Form.Group className="col-12">
                                        <Row>
                                            <Form.Label>Welcome Message</Form.Label>
                                            <br />
                                            <textarea
                                                rows={4}
                                                value={church.welcomeMessage}
                                                name="welcomeMessage"
                                                onChange={handleChange}
                                            />
                                        </Row>
                                    </Form.Group>
                                </Row>
                                <center>
                                    <Button
                                        onClick={handleSubmit}
                                    >Submit</Button>
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
export default EditChurch