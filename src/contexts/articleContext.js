import { createContext } from "react";
import axios from 'axios'

// const BASE_URL = "https://churchhive.net/api/article/";
const BASE_URL = "http://localhost:3001/api/article/";

export const authHeader = () => ({
    Authorization: `Bearer ${localStorage.getItem("myChurchUserToken")}`,
});

export const ArticleContext = createContext()

export const ArticleProvider = (props) => {

    const getArticles = async () => {

        const getArticlesUrl = `${BASE_URL}`
        try {
            const response = await axios.get(getArticlesUrl, {
                headers: authHeader(),
            });
            return response.data
        } catch (error) {
            return false
        }
    };

    const getArticle = async (articleId) => {

        const getArticlesUrl = `${BASE_URL}${articleId}`
        try {
            const response = await axios.get(getArticlesUrl, {
                headers: authHeader(),
            });
            return response.data
        } catch (error) {
            return false
        }
    };

    const updateArticle = async (articleId, newArticle) => {

        const getArticlesUrl = `${BASE_URL}edit/${articleId}`
        try {
            const response = await axios.put(getArticlesUrl, newArticle, {
                headers: authHeader(),
            });
            return response.data
        } catch (error) {
            return false
        }
    };

    const deleteArticle = async (articleId) => {
        const getArticlesUrl = `${BASE_URL}remove/${articleId}`
        try {
            const response = await axios.delete(getArticlesUrl, {
                headers: authHeader(),
            });
            return response.data
        } catch (error) {
            return false
        }
    }

    const createArticle = async (newArticle) => {

        const getArticlesUrl = `${BASE_URL}create`
        try {
            const response = await axios.post(getArticlesUrl, newArticle, {
                headers: authHeader(),
            });
            return response.data
        } catch (error) {
            return false
        }
    };


    return (
        <ArticleContext.Provider
            value={{
                getArticles,
                getArticle,
                updateArticle,
                deleteArticle,
                createArticle
            }}
        >
            {props.children}
        </ArticleContext.Provider>
    )
}