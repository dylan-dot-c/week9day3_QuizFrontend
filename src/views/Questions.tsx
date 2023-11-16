import { useState, useEffect } from "react";

const apiEndpoint = "https://cae-bookstore.herokuapp.com/question/all";
import Question from "../components/Question";

import { QuestionResponse, QuestionType } from "../types/question";
import PreLoader from "../components/Preloader";

function Questions() {
    const [questions, setQuestions] = useState<QuestionType[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch(apiEndpoint)
            .then((response) => response.json())
            .then((data: QuestionResponse) => setQuestions(data.questions));
        setTimeout(() => setLoading(false), 1000);
    }, []);

    if (loading) {
        return (
            <div className='loader w-100 d-flex text-center justify-content-center align-items-center'>
                <div>
                    <PreLoader />
                    <p>Loading</p>
                </div>
            </div>
        );
    }
    return (
        <div className='mt-5'>
            {questions.map((question) => {
                return (
                    <Question
                        key={question.id}
                        questionObject={question}></Question>
                );
            })}
        </div>
    );
}

export default Questions;
