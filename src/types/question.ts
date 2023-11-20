export type QuestionType = {
    answer: string;
    author: string;
    created_on: string;
    id: number;
    question: string;
    correct?: boolean | null;
};

export type QuestionResponse = {
    questions: QuestionType[];
};
