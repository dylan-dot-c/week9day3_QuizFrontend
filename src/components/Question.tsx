import { Card } from "react-bootstrap";
import { QuestionType } from "../types/question";

type QuestionProps = {
    questionObject: QuestionType;
};

function Question({ questionObject }: QuestionProps) {
    const { id, question, author, answer, created_on } = questionObject;
    return (
        <Card style={{ width: "18rem" }}>
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
                <p>
                    Answer:{" "}
                    <span className='text-success fw-bold '>
                        {!answer ? (
                            <span className='text-danger'>No Answer</span>
                        ) : (
                            answer
                        )}
                    </span>
                </p>
            </Card.Body>
        </Card>
    );
}

export default Question;
