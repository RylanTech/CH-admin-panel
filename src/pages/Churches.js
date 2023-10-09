import { useContext, useEffect, useState } from "react";
import NavigationBar from "../components/Navbar";
import { Card, Container, Form, Row } from "react-bootstrap";
import { ChurchContext } from "../contexts/churchContext";
import { Link } from "react-router-dom";

function Churchespage() {
    const [churches, setChurches] = useState(undefined);
    const [query, setQuery] = useState("")

    const { searchChurches } = useContext(ChurchContext)

    async function handleSubmit(event) {
        event.preventDefault()
        let arr = await searchChurches(query)
        setChurches(arr)
    }

    function mapChurches() {
        if (churches) {
            return churches.map((church) => {
                console.log(church)
                return (
                    <div className="col-12 col-md-6">
                        <Link
                            to={`/church/${church.churchId}`}
                            className="churchLink"
                        >
                            <Card className="churchItem">
                                <Card.Body>
                                    <Row>
                                        <img
                                            src={church.imageUrl}
                                            className="col-2 col-md-3 col-lg-2"
                                        />
                                        <div className="col-9">
                                            {church.churchName}
                                            <br />
                                            <div className="denom">
                                                {church.denomination}
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

    return (
        <>
            <NavigationBar />
            <Container>
                <Row>
                    <div className="col-12">
                        <br />
                        <br />
                        <br />
                        <br />
                        <Form onSubmit={handleSubmit}>
                            <Form.Group>
                                <center>
                                    <h2>Search Churches</h2>
                                </center>
                                <Form.Control
                                    className="col-12"
                                    name="searchQuery"
                                    value={query}
                                    onChange={((e) => {
                                        setQuery(e.target.value)
                                    })}
                                />
                            </Form.Group>
                        </Form>
                    </div>
                    {churches ? (
                        <>
                            <div className="col-12">
                                <Row>
                                    {mapChurches()}
                                </Row>
                            </div>
                        </>
                    ) : (
                        <></>
                    )}
                </Row>
            </Container>
        </>
    )
}
export default Churchespage