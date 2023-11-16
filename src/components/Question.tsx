import { QuestionType } from "../types/question";

type QuestionProps = {
    questionObject: QuestionType;
};

function Question({ questionObject }: QuestionProps) {
    const { question, author, answer, created_on } = questionObject;
    return (
        <div>
            <h2>{question}</h2>
            <h3>{author}</h3>
            <p>{created_on}</p>
            <p>{answer}</p>
        </div>
    );
}

export default Question;
