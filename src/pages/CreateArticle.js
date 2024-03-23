import { useContext, useState } from "react"
import NavigationBar from "../components/Navbar"
import { Button, Container, Form } from "react-bootstrap"
import { ArticleContext } from "../contexts/articleContext"
import { useNavigate } from "react-router-dom"

function CreateArticle() {
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")

    const {createArticle} = useContext(ArticleContext)
    const navigate = useNavigate()

    async function submit() {
        const newArticle = {
            title: title,
            body: body
        }
        await createArticle(newArticle)
        navigate("/articles")
    }

    return (
        <>
            <NavigationBar />
            <Container>
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

                    <Button
                        onClick={submit}
                        className="col-12">
                        Submit
                    </Button>
                    <br /><br />
                </div>
            </Container>
        </>
    )
}
export default CreateArticle