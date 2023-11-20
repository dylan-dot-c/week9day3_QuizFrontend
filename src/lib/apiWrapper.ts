import axios from "axios";
import APIResponse from "../types/api";
import { QuestionResponse } from "../types/question";
import UserResponse from "../types/userResponse";

const baseURL = "https://cae-bookstore.herokuapp.com/";

const userEndpoints = {
    registration: "/user",
    login: "/login",
    edit: "/user",
    delete: "/user",
};

const questionEndpoints = {
    getUserQuestions: "/question",
    getAllQuestions: "/question/all",
    postnewQuizQuestion: "/question",
    putEditQuestion: "/question/",
    deleteQuestion: "/question/",
};

const apiClientNoAuth = () =>
    axios.create({
        baseURL: baseURL,
    });

const apiClientBasicAuth = (username: string, password: string) =>
    axios.create({
        baseURL: baseURL,
        headers: {
            Authorization: "Basic " + btoa(`${username}:${password}`),
        },
    });

const apiClientTokenAuth = (token: string) =>
    axios.create({
        baseURL: baseURL,
        headers: {
            Authorization: "Bearer " + token,
        },
    });

async function getAllQuestions(): Promise<APIResponse<QuestionResponse>> {
    let data, error;

    try {
        const response = await apiClientNoAuth().get(
            questionEndpoints.getAllQuestions
        );
        data = response.data;
    } catch (err) {
        if (axios.isAxiosError(err)) {
            error = err.message;
        } else {
            error = "Something else is a bit sus...";
        }
    }
    return { data, error };
}

async function loginUser(
    username: string,
    password: string
): Promise<APIResponse<UserResponse>> {
    let data, error;

    try {
        const response = await apiClientBasicAuth(username, password).get(
            userEndpoints.login
        );
        data = response.data;
    } catch (err) {
        if (axios.isAxiosError(err)) {
            error = err.message;
        } else {
            error = "Something sus is happening again...";
        }
    }

    return { data, error };
}

async function getUserQuestions(
    token: string
): Promise<APIResponse<QuestionResponse>> {
    let data, error;

    try {
        const response = await apiClientTokenAuth(token).get(
            questionEndpoints.getUserQuestions
        );
        data = response.data;
    } catch (err) {
        if (axios.isAxiosError(err)) {
            error = err.message;
        } else {
            error = "SOmething sus is happening";
        }
    }

    return { data, error };
}

async function addNewQuestion(
    token: string,
    question: string,
    answer: string
): Promise<APIResponse<{ id: number }>> {
    let data, error;

    try {
        const response = await apiClientTokenAuth(token).post(
            questionEndpoints.postnewQuizQuestion,
            { question, answer }
        );

        data = response.data;
    } catch (err) {
        if (axios.isAxiosError(err)) {
            error = err.message;
        } else {
            error =
                "Ummm... Seems like there is a problem that we dont have the answer for lol";
        }
    }

    return { data, error };
}

async function deleteQuestion(token: string, id: number) {
    let error, data;

    try {
        const response = await apiClientTokenAuth(token).delete(
            questionEndpoints.deleteQuestion + id
        );
        data = response.status;
    } catch (err) {
        if (axios.isAxiosError(err)) {
            error = err.message;
        } else {
            error =
                "Ummm... Seems like there is a problem that we dont have the answer for lol";
        }

        return { data, error };
    }
}

async function editQuestion(
    token: string,
    id: number,
    question: string,
    answer: string
) {
    let data, error;

    try {
        const response = await apiClientTokenAuth(token).put(
            questionEndpoints.putEditQuestion + id,
            { question, answer }
        );
        data = response.data;
    } catch (err) {
        if (axios.isAxiosError(err)) {
            error = err.message;
        } else {
            error = "SOmething wrong is happening";
        }
    }

    return { data, error };
}

async function editUser(token: string, userData: Partial<UserResponse>) {
    let data, error;

    try {
        const response = await apiClientTokenAuth(token).put(
            userEndpoints.edit,
            userData
        );
        data = response.data;
    } catch (err) {
        if (axios.isAxiosError(err)) {
            error = err.message;
        } else {
            error = "SOmething wrong is happening";
        }
    }

    return { data, error };
}

async function deleteUser(token: string) {
    let data, error;

    try {
        const response = await apiClientTokenAuth(token).delete(
            userEndpoints.delete
        );
        data = response.data;
    } catch (err) {
        if (axios.isAxiosError(err)) {
            error = err.message;
        } else {
            error = "SOmething wrong is happening";
        }
    }

    return { data, error };
}

export {
    getAllQuestions,
    loginUser,
    getUserQuestions,
    addNewQuestion,
    deleteQuestion,
    editQuestion,
    editUser,
    deleteUser,
};
