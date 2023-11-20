import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useRef, useEffect } from "react";
import { editQuestion } from "../lib/apiWrapper";
import { QuestionType } from "../types/question";

type ModalProps = {
    show: true;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
    questionEdit: QuestionType;
};

function EditQuestionModal({ show, setShow, questionEdit }: ModalProps) {
    const handleClose = () => setShow(false);
    const token = localStorage.getItem("token");
    const questionRef = useRef<HTMLInputElement>(null);
    const answerRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (questionRef.current && answerRef.current) {
            questionRef.current.value = questionEdit.question;
            answerRef.current.value = questionEdit.answer;
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (answerRef.current && questionRef.current && token) {
            let answer = answerRef.current?.value!;
            let question = questionRef.current?.value!;

            let result = await editQuestion(
                token,
                questionEdit.id,
                question,
                answer
            );
            alert(result);
            console.log(result);
            setShow(false);
        } else {
            alert("Something went wrong with the DOM");
        }
    };

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Edit Question ID {questionEdit.id}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Complete the form to add a new Question</p>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className='mt-3'>
                            <Form.Label className='fw-bold'>
                                Question
                            </Form.Label>
                            <Form.Control
                                ref={questionRef}
                                type='text'
                                placeholder='Question'
                            />
                        </Form.Group>
                        <Form.Group className='mt-3'>
                            <Form.Label className='fw-bold'>Answer</Form.Label>
                            <Form.Control
                                ref={answerRef}
                                type='text'
                                placeholder='Answer'
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={handleClose}>
                        Close
                    </Button>
                    <Button
                        variant='primary'
                        type='submit'
                        onClick={handleSubmit}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default EditQuestionModal;
