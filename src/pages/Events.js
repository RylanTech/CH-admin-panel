import { useContext, useEffect, useState } from "react";
import NavigationBar from "../components/Navbar";
import { Card, Container, Form, Row } from "react-bootstrap";
import { ChurchContext } from "../contexts/churchContext";
import { Link } from "react-router-dom";
import { EventContext } from "../contexts/eventContext";

function Eventspage() {
    const [events, setEvents] = useState(undefined);
    const [query, setQuery] = useState("")

    const { searchEvents } = useContext(EventContext)

    async function handleSubmit(event) {
        event.preventDefault()
        let arr = await searchEvents(query)
        setEvents(arr)
    }

    function isImageUrl(evnt) {
        console.log(evnt)
        if (evnt.imageUrl === "blank") {
            return (
                <>
                    <div className="col-9">
                        {evnt.eventTitle}
                        <br />
                        <div className="denom">
                            {evnt.Church.churchName}
                            <br />
                        </div>
                    </div>
                </>
            )
        } else {
            return (
                <>
                    <img
                        src={evnt.imageUrl}
                        className="col-2 col-md-3 col-lg-2"
                    />
                    <div className="col-9">
                        {evnt.eventTitle}
                        <br />
                        <div className="denom">
                            {evnt.churchName}
                            <br />
                        </div>
                    </div>
                </>
            )
        }
    }

    function mapEvents() {
        if (events) {
            return events.map((event) => {
                return (
                    <div className="col-12 col-md-6" key={event.eventId}>
                        <Link
                            to={`/event/${event.eventId}`}
                            className="churchLink"
                        >
                            <Card className="churchItem">
                                <Card.Body>
                                    <Row>
                                        {isImageUrl(event)}
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
                                    <h2>Search Events</h2>
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
                    {events ? (
                        <>
                            <div className="col-12">
                                <Row>
                                    {mapEvents()}
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
export default Eventspage