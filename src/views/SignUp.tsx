import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";

function SignUp() {
    return (
        <div className='mt-5 p-2'>
            <Form>
                <div className='row'>
                    <Form.Group
                        className='mb-3 col'
                        controlId='exampleForm.ControlInput1'>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type='text' placeholder='First Name' />
                    </Form.Group>
                    <Form.Group
                        className='mb-3 col'
                        controlId='exampleForm.ControlInput1'>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type='text' placeholder='Last Name' />
                    </Form.Group>
                </div>
                <div className='row'>
                    <Form.Group
                        className='mb-3 col'
                        controlId='exampleForm.ControlInput1'>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type='email'
                            placeholder='name@example.com'
                        />
                    </Form.Group>
                    <Form.Group
                        className='mb-3 col'
                        controlId='exampleForm.ControlTextarea1'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' />
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
