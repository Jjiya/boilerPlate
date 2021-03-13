import React, {useEffect} from 'react'
import axios from 'axios';

/*×
TypeError: Cannot read property 'loginSuccess' of undefined

로그인 되어있을 때만 로그아웃 하고싶은데
어떻게 해야될지 몰라서 걍...주석...언젠가 생각나면 하겠지뭐

//disabled="disabled" 이건 밑에 로그아웃 버튼에 속성넣었던 것

window.onload = (response)=>{
    if(response.payload.loginSuccess){
        document.getElementById("logout").disabled = false;
    }
}
*/

function LandingPage(props) {

    useEffect(() => {
        axios.get('/api/hello')
            .then(response => { console.log(response) })
    }, [])

    const onClickHandler = () => {
        axios.get('/api/users/logout').then(
            response => {
                console.log(response.data);
                if(response.data.success){
                    props.history.push('/login');
                }else{
                    alert('로그아웃 실패');
                }
            }
        )
    }


    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            width: '100%', height: '100vh'
        }}>
            <nav style={{borderRight:'1px solid black'}}>
                <a href="/LoginPage">로그인</a><br/>
                <a href="/RegisterPage">회원가입</a>
            </nav>
            <h2>시작페이지</h2>
            <button id ="logout" onClick={onClickHandler}>로그아웃</button>
        </div>
    )
}

export default LandingPage
