import { Button, Container, Form, Row } from "react-bootstrap"
import NavigationBar from "../components/Navbar"
import { useContext, useEffect, useState } from "react"
import { ArticleContext } from "../contexts/articleContext"
import { useNavigate, useParams } from "react-router-dom"

function EditArticle() {
    const [article, setArticle] = useState()
    const [title, setTitle] = useState()
    const [body, setBody] = useState()

    const navigate = useNavigate()
    const params = useParams()
    const { getArticle, updateArticle, deleteArticle } = useContext(ArticleContext)

    useEffect(() => {
        async function gettingArticle() {
            let res = await getArticle(params.id)
            setArticle(res)
            setBody(res.body)
            setTitle(res.title)
        }
        gettingArticle()
    }, [])

    function getDateString(articleTime) {
        const isoDate = new Date(articleTime);
        const formatDate = Intl.DateTimeFormat("en-us", {
            dateStyle: "long",
        });
        const formatDay = Intl.DateTimeFormat("en-us", {
            weekday: "long",
        });
        const formatTime = Intl.DateTimeFormat("en-us", {
            timeStyle: "short",
        });

        const eventDate = isoDate ? formatDate.format(isoDate) : "";
        const eventDay = isoDate ? formatDay.format(isoDate) : "";
        const eventTime = isoDate ? formatTime.format(isoDate) : "";
        return (
            <>
                {eventDay}, {eventDate} at {eventTime}
            </>
        )
    }

    async function submit() {
        let updatedArticle = {
            title: title,
            body: body
        }
        let res = await updateArticle(params.id, updatedArticle)
        navigate("/articles")
    }

    async function deleteAnArticle() {
        let res = await deleteArticle(params.id)
        navigate("/articles")
    }

    function ifArticle() {
        if (article) {
            return (
                <div className="col-12">
                    <Form.Group className="col-12">
                        <Form.Label>
                            Title
                        </Form.Label>
                        <Form.Control
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="col-12">
                        <Form.Label>
                            Body
                        </Form.Label>
                        <textarea
                            className="col-12"
                            rows={16}
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                        />
                    </Form.Group>
                    <div>
                        Updated on {getDateString(article.updatedAt)}
                        <br/>
                        Created on: {getDateString(article.createdAt)}
                    </div>

                    <Button
                    onClick={submit}
                    className="col-12">
                        Submit
                    </Button>
                    <br/><br/>
                    <Button
                    variant="danger"
                    onClick={deleteAnArticle}
                    className="col-12">
                        Delete
                    </Button>
                </div>
            )
        } else {
            return (
                <>error</>
            )
        }
    }

    return (
        <>
            <NavigationBar />
            <Container>
                <Row>
                    {ifArticle()}
                </Row>
            </Container>
        </>
    )
}
export default EditArticle