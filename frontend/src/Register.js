import { useState, useRef, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
    const userRef = useRef();  
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd,  setValidPwd] = useState(false);
    const [pwdFocus,  setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        const result = USER_REGEX.test(user);
        console.log(result);
        console.log(user);
        setValidName(result);
    }, [user])

    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        console.log(result);
        console.log(pwd);
        setValidPwd(result);
        const match = pwd === matchPwd;
        setValidMatch(match);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const v1 = USER_REGEX.test(user)
        const v2 = PWD_REGEX.test(pwd)
        if (!v1 || !v2 ) {
            setErrMsg('Invalid Entry');
            return;
        }
        
    }

    return (
        <Card style={{ width: '280px'}}>
            <Card.Title>Register</Card.Title>
            { errMsg ? <Alert ref={errRef} key='danger' variant='danger' className="">{errMsg}</Alert> : null}
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label htmlFor="'username">
                    Username{' '} 
                    {validName ? <FontAwesomeIcon icon={faCheck} /> : user ? <FontAwesomeIcon icon={faTimes}/> : null}
                    </Form.Label>
                    <Form.Control
                        type='text'
                        id='username'
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setUser(e.target.value)}
                        required
                        aria-invalid={validName ? 'false' : 'true'}
                        aria-describedby="uidnote"
                        onFocus={() => setUserFocus(true)}
                        onBlur={() => setUserFocus(false)}
                    />
                    {userFocus && user && !validName ? <Alert key='info' var='info' id='uidnote'><FontAwesomeIcon icon={faInfoCircle}/> 4 to 24 characters.<br/>Must begin with a letter.<br/>Letters, numbers, underscores, hyphens allowed.</Alert> : null}
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor='password'>
                    Password{' '}
                    {validPwd ? <FontAwesomeIcon icon={faCheck} /> : pwd ? <FontAwesomeIcon icon={faTimes}/> : null}
                    </Form.Label>
                    <Form.Control
                        type='password'
                        id='password'
                        onChange={(e) => setPwd(e.target.value)}
                        required
                        aria-invalid={validPwd ? 'false': 'true'}
                        aria-describedby="pwdnote"
                        onFocus={() => setPwdFocus(true)}
                        onBlur={() => setPwdFocus(false)}
                    >
                    </Form.Control>
                    {pwdFocus && !validPwd ? <Alert key='info' var='info' id='pwdnote'><FontAwesomeIcon icon={faInfoCircle}/> 4 to 24 characters.<br/>Must include uppercase and lowercase letters, a number and a special character.<br/> Allowed special characters: ! @ # $ %</Alert> : null}
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="confirm_pwd">
                        Confirm Password{' '}
                        {validMatch && matchPwd ? <FontAwesomeIcon icon={faCheck} /> : pwd || matchPwd ? <FontAwesomeIcon icon={faTimes}/> : null}
                    </Form.Label>
                    <Form.Control 
                        type='password'
                        id='confirm_pwd'
                        onChange={(e) => setMatchPwd(e.target.value)}
                        required
                        aria-invalid={validMatch ? "false" : 'true'}
                        aria-describedby="confirmnote"
                        onFocus={() => setMatchFocus(true)}
                        onBlur={() => setMatchFocus(false)}
                    >    
                    </Form.Control>
                    {matchFocus && !validMatch ? <Alert key='info' var='info' id='confirmnote'><FontAwesomeIcon icon={faInfoCircle}/> Must match the first password input field.</Alert> : null}
                </Form.Group>
                <div className="d-grid gap-2">
                    <Button 
                    variant="primary"
                    disabled={!validName || !validPwd || !validMatch ? true: false}
                    >Register</Button>{' '}
                </div>
            </Form>
            <Card.Text>
                Already Registered? <a>Sign In</a>
            </Card.Text>
        </Card>
    )
}

export default Register