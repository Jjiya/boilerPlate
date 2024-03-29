import React,{ useState } from 'react';
import { withRouter } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {registerUser} from '../../../_actions/user_action';

function RegisterPage(props) {

    const dispatch = useDispatch();
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [Name, setName] = useState("");
    const [ConfirmPassword, setConfirmPassword] = useState("");

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value);
    }
    const onNamedHandler = (event) => {
        setName(event.currentTarget.value);
    }
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
    }
    const onConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value);
    }
    const onSubmitHandler = (event) => {
        event.preventDefault();

        console.log('회원가입 중...')
        console.log('Email : ', Email);
        console.log('Name : ', Name);
        console.log('Password : ', Password);
        console.log('Confirm Password : ', ConfirmPassword);

        if(Password !== ConfirmPassword){
            return alert('비밀번호가 일치하지 않습니다.');
        }

        let body = {
            email : Email,
            name : Name,
            password : Password
        }

        dispatch(registerUser(body))
        .then(response => {
            if(response.payload.success){
                props.history.push('/login');
            }else{
                alert("Error!!");
            }
        })
    }

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            width: '100%', height: '100vh'
        }}>
            <form style={{display: "flex", flexDirection: "column"}}
                onSubmit={onSubmitHandler}>
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler}></input>
                <label>Name</label>
                <input type="text" value={Name} onChange={onNamedHandler}></input>
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler}></input>
                <label>Confirm Password</label>
                <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler}></input>
                <br/>
                <button type="submit">Join</button>
            </form>
        </div>
    )
}

export default RegisterPage
