import React, {useEffect} from 'react'
import axios from 'axios';

function LandingPage(props) {

    useEffect(() => {
        axios.get('/api/hello')
            .then(response => { console.log(response) })
    }, [])


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
        </div>
    )
}

export default LandingPage
