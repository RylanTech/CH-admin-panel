import { Button, Container, Form, Row } from 'react-bootstrap'
import NavigationBar from '../components/Navbar'
import { useContext, useEffect, useState } from 'react'
import { ChurchUserContext } from '../contexts/churchUserContext';

function Homepage() {
    const [keyInfo, setKeyInfo] = useState({
        key: ""
    });
    const [adminInfo, setAdminInfo] = useState({
        password: "",
        email: "",
    });

    const { password, email } = adminInfo
    const { key } = keyInfo
    const { loginChurchUser } = useContext(ChurchUserContext)

    useEffect(() => {
        let ky = localStorage.getItem("myChurchUserToken");
        if (ky) {
            setKeyInfo({ key: ky })
        } else {
            console.log("No Key")
        }
    }, [])

    function deleteKey() {
        localStorage.removeItem("myChurchUserToken");
        setKeyInfo({key: ""})
    }

    function SetKeyInLocal() {
        localStorage.setItem("myChurchUserToken", key);
    }

    async function handleLogIn() {
        let ky = await loginChurchUser(adminInfo);
        setKeyInfo({ key: ky.token})
    }

    function handleChange(event) {
        setAdminInfo((preValue) => {
            return { ...preValue, [event.target.name]: event.target.value }
        })
    }

    function handleKeyChange(event) {
        setKeyInfo((preValue) => {
            return { ...preValue, [event.target.name]: event.target.value }
        })
    }

    return (
        <>
            <NavigationBar />
            <Container>
                <Row>
                    <div className='col-12 col-md-6'>
                        <div className='col-12 panel-1'>
                            <h1>Log In</h1>
                            <Form>
                                <Form.Group>
                                    <Form.Label>Admin Email</Form.Label>
                                    <Form.Control
                                        value={email}
                                        name='email'
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Admin Password</Form.Label>
                                    <Form.Control
                                        value={password}
                                        name='password'
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <br />
                                <Button
                                    onClick={handleLogIn}
                                >
                                    Submit
                                </Button>
                            </Form>
                        </div>
                    </div>
                    <div className='col-12 col-md-6'>
                        <div className='col-12 panel-1'>
                            <Form>
                                <Form.Group>
                                    <Form.Label>Key</Form.Label>
                                    <br />
                                    <textarea
                                        className='col-12'
                                        rows={4}
                                        value={key}
                                        name='key'
                                        onChange={handleKeyChange}
                                    />
                                </Form.Group>
                            </Form>
                            <Row>
                                <Button className='col-3'
                                onClick={SetKeyInLocal}
                                >
                                    Set Key
                                </Button>
                                <div className='col-6' />
                                <Button className='col-3'
                                onClick={deleteKey}
                                variant='danger'
                                >
                                    Delete Key
                                </Button>
                            </Row>
                        </div>
                    </div>
                </Row>
            </Container>
        </>
    )
}
export default Homepage