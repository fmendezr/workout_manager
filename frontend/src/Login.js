import { useRef, useState, useEffect, useContext } from "react";
import axios from "./api/axios";

import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import AuthContext from "./context/AuthProvider";

const LOGIN_URL = '/api/login/';

const Login = () => {

  const { setAuth } = useContext(AuthContext);

  const userRef = useRef();
  const errRef = useRef();
  
  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, [])

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd])

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
        const response = await axios.post(LOGIN_URL, 
            JSON.stringify({'username': user, 'password': pwd}),
            {
                headers: { 'Content-Type': 'application/json'},
            }
        );
        const accessToken = response?.data?.access;
        const refreshToken = response?.data?.refresh;
        setAuth({user, pwd, roles, accessToken});
        setUser('');
        setPwd('');
        setSuccess(true);
    } catch (err) {
        setErrMsg(err.response.data.detail);
        errRef.current.focus()
    }
  }

  return (
    <>
        {success ? (<Alert key='primary' variant="primary">Sign In was a Success! <a>Go to Home</a></Alert>) : (
        <Card style={{width: '280px'}}>
            <Card.Title>Sign In</Card.Title>
            { errMsg ? <Alert ref={errRef} key='danger' variant='danger' className="">{errMsg}</Alert> : null}
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label htmlFor='username'>Username</Form.Label>
                    <Form.Control 
                    type='text' 
                    name='username' 
                    id='username'
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value) }
                    value={user}
                    required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor='password'>Username</Form.Label>
                    <Form.Control 
                    type='password' 
                    name='password' 
                    id='password' 
                    onChange={(e) => setPwd(e.target.value) }
                    value={pwd}
                    required
                    />
                </Form.Group>
                <div className="d-grid gap-2">
                        <Button 
                        type='submit'
                        variant="primary"
                        disabled={!user || !pwd ? true: false}
                        >Sign In</Button>{' '}
                </div>
            </Form>
            <Card.Text>
                    Need an Account? <a>Register</a>
            </Card.Text>
        </Card> )}
    </>
  )
}

export default Login;