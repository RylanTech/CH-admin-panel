import { useContext, useEffect, useState } from "react";
import NavigationBar from "../components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Container, Form, Row } from "react-bootstrap";
import { EventContext } from "../contexts/eventContext";

function EditEvent() {
    let today = new Date()
    const [timeInfo, setTimeInfo] = useState({
        date: "",
        time: ""
    })
    const [event, setEvent] = useState({
        churchId: 0,
        eventTitle: "",
        date: today.toISOString(),
        location: {
            street: "",
            city: "",
            state: "",
            zip: "",
        },
        eventType: "",
        description: "",
        imageUrl: "",
    });

    const params = useParams()
    let id = params.id
    const navigate = useNavigate()

    const { getEvent, updateEvent } = useContext(EventContext)

    useEffect(() => {
        async function gettingEvent() {
            const eve = await getEvent(id);

            setEvent(eve)

            const info = convertFromISODateTime(eve.date)
            setTimeInfo({
                time: info.time,
                date: info.date
            })
        }

        gettingEvent();
    }, [id]);

    function convertToISODateTime(date, time) {
        const [year, month, day] = date.split('-');
        const [hour, minute] = time.split(':');
        const isoDate = new Date(year, month - 1, day, hour, minute).toISOString();
        return isoDate;
    }
    
    // function convertUtcToLocal(utcDateString) {
    //     const utcDate = new Date(utcDateString);
    //     const localDate = new Date(utcDate.getTime() + utcDate.getTimezoneOffset() * 60000);
    //     return localDate;
    //   }

    function convertFromISODateTime(isoDateTime) {
        const dateObject = new Date(isoDateTime);
        const year = dateObject.getUTCFullYear(); // Get UTC year
        const month = dateObject.getUTCMonth() + 1; // Get UTC month (0-based)
        const day = dateObject.getUTCDate(); // Get UTC day
        const hour = dateObject.getUTCHours(); // Get UTC hour
        const minute = dateObject.getUTCMinutes(); // Get UTC minutes
      
        const datePart = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
        const timePart = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      
        return {
          date: datePart,
          time: timePart,
        };
      }
      

    const handleChange = async (event) => {
        const name = event.target.name
        const value = event.target.value
        if (name === "date") {
            const isoDate = value;
            setTimeInfo((prevEvent) => ({
                ...prevEvent,
                date: isoDate,
            }));
        } else if (name === "time") {
            const time = value;
            setTimeInfo((prevEvent) => ({
                ...prevEvent,
                time: time,
            }));
        } else if (name.startsWith("location.")) {
            const key = name.split(".")[1];
            setEvent((prevEvent) => ({
                ...prevEvent,
                location: {
                    ...prevEvent.location,
                    [key]: value,
                },
            }));
        } else {
            setEvent((prevEvent) => ({
                ...prevEvent,
                [name]: typeof value === "string" ? (value).trim() : value,
            }));
        }
    };

    async function handleSubmit() {

        const postEvent = {
            eventId: id,
            churchId: event.churchId,
            eventTitle: event.eventTitle,
            date: convertToISODateTime(timeInfo.date, timeInfo.time),
            location: {
                street: event.location.street,
                city: event.location.city,
                state: event.location.state,
                zip: event.location.zip,
            },
            eventType: event.eventType,
            description: event.description,
            imageUrl: event.imageUrl,
        }

        await updateEvent(postEvent).then(
            navigate('/events')
        )
    }


    return (
        <>
            <NavigationBar />
            {event ? (
                <>
                    <Container>
                        <Row>
                            <Form onSubmit={handleSubmit}>
                                <Row>
                                    <img className="col-12 col-sm-3" src={event.imageUrl} />
                                    <Form.Group className="col-12 col-sm-9">
                                        <Form.Label>imageUrl</Form.Label>
                                        <Form.Control
                                            value={event.imageUrl}
                                            name="imageUrl"
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                    <Form.Group className="col-12 col-sm-6">
                                        <Form.Label>Event Name</Form.Label>
                                        <Form.Control
                                            value={event.eventTitle}
                                            name="eventName"
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                    <Form.Group className="col-12 col-sm-3">
                                        <Form.Label>Date</Form.Label>
                                        <Form.Control
                                            type="date"
                                            value={timeInfo.date}  // Make sure it's event.date
                                            name="date"
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                    <Form.Group className="col-12 col-sm-3">
                                        <Form.Label>Time</Form.Label>
                                        <Form.Control
                                            value={timeInfo.time}  // Make sure it's event.date
                                            name="time"
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                    <Form.Group className="col-9 col-sm-8">
                                        <Form.Label>Street</Form.Label>
                                        <Form.Control
                                            value={event.location.street}
                                            name="location.street"
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                    <Form.Group className="col-3 col-sm-4">
                                        <Form.Label>State</Form.Label>
                                        <Form.Control
                                            value={event.location.state}
                                            name="location.state"
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                    <Form.Group className="col-9 col-sm-8">
                                        <Form.Label>City</Form.Label>
                                        <Form.Control
                                            value={event.location.city}
                                            name="location.city"
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                    <Form.Group className="col-3 col-sm-4">
                                        <Form.Label>Zip</Form.Label>
                                        <Form.Control
                                            value={event.location.zip}
                                            name="location.zip"
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                    <Form.Group className="col-12 col-sm-8">
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control
                                            value={event.description}
                                            name="description"
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                    <Form.Group className="col-6 col-sm-4">
                                        <Form.Label>Church Id</Form.Label>
                                        <Form.Control
                                            value={event.eventId}
                                            name="userId"
                                            onChange={handleChange}
                                        />
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
export default EditEvent