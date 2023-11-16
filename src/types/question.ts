export type QuestionType = {
    answer: string;
    author: string;
    created_on: string;
    id: number;
    question: string;
};

export type QuestionResponse = {
    questions: QuestionType[];
};
