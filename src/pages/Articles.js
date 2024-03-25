import { Button, Card, Container, Row } from "react-bootstrap"
import NavigationBar from "../components/Navbar"
import { useContext, useEffect, useState } from "react"
import { ArticleContext } from "../contexts/articleContext"
import { Link } from "react-router-dom"

function Articles() {
    const [articles, setArticles] = useState()
    const [message, setMessage] = useState(false)
    const { getArticles } = useContext(ArticleContext)

    useEffect(() => {
        async function gettingArticles() {
            let res = await getArticles()
            setArticles(res)
            if (res) {
                setMessage(false)
            } else {
                setMessage(true)
            }
        }
        gettingArticles()
    }, [getArticles])

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

    function ifArticles() {
        if (articles) {
            return articles.map((article) => {
                console.log(article)
                return (
                    <Link className="articleItem" to={`/article/edit/${article.ArticleId}`}>
                        <Card className="churchItem">
                            <Card.Body>
                                <Card.Title>{article.title}</Card.Title>
                                Updated: {getDateString(article.updatedAt)}
                            </Card.Body>
                        </Card>
                    </Link>
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
                        <Link to={"/article/create"}>
                            <Button
                                className="col-12"
                            >
                                Create Article
                            </Button>
                        </Link>
                    </div>
                </Row>
                <Row>
                    <div className="col-12">
                        <br />
                        {ifArticles()}
                    </div>
                </Row>
                <Row>
                    {message ? (
                        <>
                        <div>
                            Token Expired
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
export default Articles