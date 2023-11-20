import { useState, useEffect } from "react";

const apiEndpoint = "https://cae-bookstore.herokuapp.com/question/all";
import Question from "../components/Question";

import { QuestionResponse, QuestionType } from "../types/question";
import PreLoader from "../components/Preloader";
import { Button } from "react-bootstrap";
import { getAllQuestions } from "../lib/apiWrapper";

function Questions() {
    const [questions, setQuestions] = useState<QuestionType[]>([]);
    const [loading, setLoading] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [correctTotal, setCorrectTotal] = useState(0);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = () => {
        setSubmitted(true);
    };

    // useEffect(() => {
    //     setLoading(true);
    //     fetch(apiEndpoint)
    //         .then((response) => response.json())
    //         .then((data: QuestionResponse) => {
    //             const questions = data.questions.map((question) => {
    //                 return { ...question, correct: null };
    //             });
    //             setQuestions(questions);
    //         });
    //     setTimeout(() => setLoading(false), 1000);
    // }, []);

    useEffect(() => {
        async function fetchQuestions() {
            const response = await getAllQuestions();
            if (response.data) {
                setQuestions(response.data.questions);
            }
        }

        fetchQuestions();
    }, []);

    useEffect(() => {
        if (submitted == true) {
            alert(`You got ${correctTotal}/${questions.length} correct!`);
        }
    }, [submitted]);

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
            <h1 className='text-center'>
                Question {currentQuestion + 1} / {questions.length}
            </h1>
            <h2 className='text-center'>
                {/* Correct: {correctTotal}/{questions.length} */}
            </h2>
            <div className='my-5 d-flex gap-3 flex-wrap justify-content-center'>
                {/* {questions.slice(0, limit).map((question) => {
                    return (
                        <Question
                            key={question.id}
                            questionObject={question}></Question>
                    );
                })} */}
                {questions.length > 0 && (
                    <Question
                        setQuestions={setQuestions}
                        key={questions[currentQuestion].id}
                        questionObject={questions[currentQuestion]}
                    />
                )}
            </div>
            <Button onClick={() => setCurrentQuestion(currentQuestion - 1)}>
                Prev Question
            </Button>
            {currentQuestion != questions.length - 1 ? (
                <Button onClick={() => setCurrentQuestion(currentQuestion + 1)}>
                    Next Question
                </Button>
            ) : (
                <Button
                    variant='success'
                    onClick={handleSubmit}
                    disabled={
                        typeof questions[questions.length - 1].correct ==
                        "boolean"
                    }>
                    Finish Quiz
                </Button>
            )}
        </main>
    );
}

export default Questions;
