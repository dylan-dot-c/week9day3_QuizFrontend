import { useState, useEffect } from "react";

const apiEndpoint = "https://cae-bookstore.herokuapp.com/question/all";
import Question from "../components/Question";

import { QuestionResponse, QuestionType } from "../types/question";
import PreLoader from "../components/Preloader";
import { Button } from "react-bootstrap";

function Questions() {
    const [questions, setQuestions] = useState<QuestionType[]>([]);
    const [limit, setLimit] = useState(10);
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
        <main className='my-5 py-5'>
            <h1 className='text-center'>All Questions</h1>
            <div className='my-5 d-flex gap-3 flex-wrap justify-content-center'>
                {questions.slice(0, limit).map((question) => {
                    return (
                        <Question
                            key={question.id}
                            questionObject={question}></Question>
                    );
                })}
            </div>
            {limit < questions.length ? (
                <div className='text-center'>
                    <Button
                        variant='primary'
                        className='rounded-4'
                        onClick={() => setLimit(limit + 10)}>
                        Show More
                    </Button>
                </div>
            ) : null}
        </main>
    );
}

export default Questions;
