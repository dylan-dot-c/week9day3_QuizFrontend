import { Card } from "react-bootstrap";
import { QuestionType } from "../types/question";
import Form from "react-bootstrap/Form";
import { FormEvent, useRef } from "react";

type QuestionProps = {
    questionObject: QuestionType;
    setQuestions: React.Dispatch<React.SetStateAction<QuestionType[]>>;
};

function Question({ questionObject, setQuestions }: QuestionProps) {
    // const [correct, setCorrect] = useState<boolean | null>(null);
    const { id, question, author, answer, created_on, correct } =
        questionObject;
    let answerRef = useRef<HTMLInputElement>(null);

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        let answerForm = answerRef.current?.value.toLowerCase();
        if (answerForm == answer.toLowerCase()) {
            alert("Correct");
            // setCorrect(true);
            setQuestions((prevQuestions) => {
                return prevQuestions.map((question) => {
                    if (question.id == id) {
                        question.correct = true;
                    }
                    return question;
                });
            });
        } else {
            alert("Incorrect");
            setQuestions((prevQuestions) => {
                return prevQuestions.map((question) => {
                    if (question.id == id) {
                        question.correct = false;
                    }
                    return question;
                });
            });
        }
    }
    return (
        <Card
            style={{ width: "18rem" }}
            className={` bg-success-subtle  ${
                correct == true
                    ? "border-success border-2"
                    : correct == false
                    ? "border-danger border-2 "
                    : ""
            }`}>
            <Card.Body>
                <Card.Title>Question ID: {id}</Card.Title>
                <Card.Subtitle className='mb-2 text-muted'>
                    By: {author}
                </Card.Subtitle>
                <Card.Text>
                    <span className='text-secondary fs-6'>
                        Created: {created_on}
                    </span>
                    <br />
                    {question}
                </Card.Text>
                {
                    <Form onSubmit={handleSubmit}>
                        <Form.Control
                            placeholder='Enter Guess'
                            ref={answerRef}
                            disabled={typeof correct == "boolean"}
                        />
                        <p>Press enter to Submit</p>
                    </Form>
                }
                {/* <p>
                    Answer:{" "}
                    <span className='text-success fw-bold '>
                        {!answer ? (
                            <span className='text-danger'>No Answer</span>
                        ) : (
                            answer
                        )}
                    </span>
                </p> */}
            </Card.Body>
        </Card>
    );
}

export default Question;
