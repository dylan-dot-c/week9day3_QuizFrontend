import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import User from "../types/user";

function SignUp() {
    const navigate = useNavigate();
    const [userFormData, setUserFormData] = useState<User>({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
    });

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setUserFormData({ ...userFormData, [name]: value });
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        const apiEndpoint = "https://cae-bookstore.herokuapp.com/user";
        e.preventDefault();

        const data = await fetch(apiEndpoint, {
            method: "POST",
            body: JSON.stringify(userFormData),
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (data.ok) {
            alert("USer signed up successfully!");
            const response = data;
            console.log(response);
            navigate("/questions");
        } else {
            alert("Failed to signup user");
            console.log(data);
        }
    }

    return (
        <div className='mt-5 p-2'>
            <Form onSubmit={handleSubmit}>
                <div className='row'>
                    <Form.Group className='mb-3 col'>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                            onChange={handleChange}
                            type='text'
                            placeholder='First Name'
                            value={userFormData.first_name}
                            name='first_name'
                        />
                    </Form.Group>
                    <Form.Group className='mb-3 col'>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                            onChange={handleChange}
                            type='text'
                            placeholder='Last Name'
                            name='last_name'
                            value={userFormData.last_name}
                        />
                    </Form.Group>
                </div>
                <div className='row'>
                    <Form.Group className='mb-3 col'>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            onChange={handleChange}
                            type='email'
                            placeholder='name@example.com'
                            value={userFormData.email}
                            name='email'
                        />
                    </Form.Group>
                    <Form.Group
                        className='mb-3 col'
                        controlId='exampleForm.ControlTextarea1'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            onChange={handleChange}
                            type='password'
                            value={userFormData.password}
                            name='password'
                        />
                    </Form.Group>
                </div>

                <Button type='submit' className='w-100' variant='primary'>
                    Submit
                </Button>
            </Form>
        </div>
    );
}

export default SignUp;
