import { useState, useEffect } from 'react';
import { LoginData } from './LoginData'
import './PrivateScreen.css'
import Iframe from 'react-iframe'

const PrivateScreen = ({ history }) => {
    const [name, setName] = useState("");
    const [textbox1, setTextbox1] = useState("");
    const [textbox2, setTextbox2] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (!localStorage.getItem("authToken")) {
            history.push('/login')
        }
        else {
            const firstName = LoginData.data.filter(item => item.email === localStorage.getItem("authEmail"))[0].first_name
            setName(firstName)
        }
    }, [history])

    const logoutHandler = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("authEmail");
        history.push("/login")
    }

    const checkUrl = () => {
        var expression = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
        var regex = new RegExp(expression);
        if(!textbox1.match(regex) && textbox1.length > 0 && !textbox2.match(regex) && textbox2.length > 0) {
            setError("Invalid Text box1 and Text box2 URL")
        }
        else if(!textbox1.match(regex) && textbox1.length > 0) {
            setError("Invalid Text box1 URL")
        }
        else if(!textbox2.match(regex) && textbox2.length > 0) {
            setError("Invalid Text box2 URL")
        }
        else {
            setError("")
        }
    }


    return (
        <div className="private-screen">
            <div className="private-screen__header">Main Screen</div>
            {error && <span className="error-message">{error}</span>}
            <div className="private-screen__inputs">
                <div className="private-screen__name">{name}</div>
                <input type="url" required id="textbox1" onBlur={checkUrl} placeholder="Text Box 1" className="private-screen__input" value={textbox1} onChange={(e) => setTextbox1(e.target.value)} />

                <input type="url" required id="textbox2" onBlur={checkUrl} placeholder="Text Box 2" className="private-screen__input" value={textbox2} onChange={(e) => setTextbox2(e.target.value)} />


                <button onClick={logoutHandler} className="btn btn-primary">Logout</button>
            </div>
            <div className="private-screen__container">
                <div className="private-screen__item">
                    <Iframe url={textbox1}
                        width="100%"
                        height="100%"
                        id="myId"
                        className="private-screen__iframe"
                        display="initial"
                        overflow="hidden"
                        allow="fullscreen"
                        position="relative" />
                </div>
                <div className="private-screen__item">
                    <Iframe url={textbox2}
                        width="100%"
                        height="100%"
                        id="myId"
                        className="private-screen__iframe"
                        display="initial"
                        overflow="hidden"
                        allow="fullscreen"
                        position="relative" />
                </div>
            </div>
        </div>
    )
}

export default PrivateScreen;