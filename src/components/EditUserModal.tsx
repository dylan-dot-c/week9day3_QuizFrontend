import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useRef, useEffect } from "react";
import UserResponse from "../types/userResponse";
import { deleteUser, editUser } from "../lib/apiWrapper";
import { useNavigate } from "react-router-dom";

type ModalProps = {
    show: true;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
    userEdit: UserResponse;
};

function EditUserModal({ show, setShow, userEdit }: ModalProps) {
    const navigate = useNavigate();
    const handleClose = () => setShow(false);
    const token = localStorage.getItem("token");
    const firstNameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (firstNameRef.current && lastNameRef.current && emailRef.current) {
            firstNameRef.current.value = userEdit.first_name;
            lastNameRef.current.value = userEdit.last_name;
            emailRef.current.value = userEdit.email;
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (
            firstNameRef.current &&
            lastNameRef.current &&
            emailRef.current &&
            token
        ) {
            let firstName = firstNameRef.current?.value!;
            let lastName = lastNameRef.current?.value!;
            let email = emailRef.current?.value!;

            let result = await editUser(token, {
                first_name: firstName,
                last_name: lastName,
                email: email,
            });
            alert(result);
            console.log(result);
            setShow(false);
            // window.location.reload();
        } else {
            alert("Something went wrong with the DOM");
        }
    };

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Profile Data</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* <p>Complete the form to add a new Question</p> */}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className='mt-3'>
                            <Form.Label className='fw-bold'>
                                First Name
                            </Form.Label>
                            <Form.Control
                                required
                                ref={firstNameRef}
                                type='text'
                                placeholder=''
                            />
                        </Form.Group>
                        <Form.Group className='mt-3'>
                            <Form.Label className='fw-bold'>
                                Last Name
                            </Form.Label>
                            <Form.Control
                                required
                                ref={lastNameRef}
                                type='text'
                                placeholder=''
                            />
                        </Form.Group>
                        <Form.Group className='mt-3'>
                            <Form.Label className='fw-bold'>Email</Form.Label>
                            <Form.Control
                                required
                                ref={emailRef}
                                type='email'
                                placeholder=''
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={handleClose}>
                        Close
                    </Button>
                    <Button
                        className=''
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

export default EditUserModal;
