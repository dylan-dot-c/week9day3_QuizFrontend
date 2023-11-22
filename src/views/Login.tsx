import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import { useRef } from "react";
import { loginUser } from "../lib/apiWrapper";
import { toast } from "react-toastify";
import UserResponse from "../types/userResponse";
import { Slide } from "react-toastify";
import { useNavigate } from "react-router-dom";

type LoginProps = {
    setCurrentUser: React.Dispatch<React.SetStateAction<UserResponse | null>>;
};

function Login({ setCurrentUser }: LoginProps) {
    const navigate = useNavigate();
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;

        let response = await loginUser(username!, password!);
        if (response.data) {
            localStorage.setItem("token", response.data.token);
            setCurrentUser(response.data);
            toast("Login Successfully", {
                type: "success",
                position: toast.POSITION.TOP_CENTER,
                toastId: "Login Success ",
                hideProgressBar: true,
                theme: "colored",
                transition: Slide,
            });
            console.log(response, response.data);
            navigate("/dashboard");
        } else {
            alert(response.error!);
        }

        // alert(`${username} ${password}`);
    }
    return (
        <div className='w-50 mx-auto mt-5'>
            <h1 className='text-center'>Login</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type='text'
                        ref={usernameRef}
                        required
                        name='email'
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        ref={passwordRef}
                        required
                        name='password'
                    />
                </Form.Group>
                <Button type='submit' className='w-100 mt-3' variant='primary'>
                    Submit
                </Button>
            </Form>
        </div>
    );
}

export default Login;
