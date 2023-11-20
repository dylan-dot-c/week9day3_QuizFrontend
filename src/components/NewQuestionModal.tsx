import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useRef } from "react";
import { addNewQuestion } from "../lib/apiWrapper";

type ModalProps = {
    show: true;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
};

function NewQuestionModal({ show, setShow }: ModalProps) {
    const handleClose = () => setShow(false);
    const token = localStorage.getItem("token");
    const questionRef = useRef<HTMLInputElement>(null);
    const answerRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (answerRef.current && questionRef.current && token) {
            let answer = answerRef.current?.value!;
            let question = questionRef.current?.value!;

            let result = await addNewQuestion(token, question, answer);
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
                    <Modal.Title>New Question</Modal.Title>
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
                        Add New Question
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default NewQuestionModal;
