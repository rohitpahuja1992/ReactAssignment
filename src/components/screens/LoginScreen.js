import {useState, useEffect} from 'react';
import './LoginScreen.css';
import {LoginData} from './LoginData'

const LoginScreen = ({history}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if(localStorage.getItem("authToken")) {
            history.push('/')
        }
    }, [history])

    const loginHandler = () => {
        const login = LoginData.data.findIndex(
            (item) => item.email === email && item.password === password
        )
        if(login !== -1) {
            localStorage.setItem("authToken", LoginData.token);
            localStorage.setItem("authEmail", email);
            history.push("/")
        }
        else {
            setError("Invalid Credentials")
            setTimeout(() => { 
                setError("")
            },5000)
        }
    }
    return (
    <div className="login-screen">
        <form onSubmit={loginHandler} className="login-screen__form">
            <h3 className="login-screen__title">Login</h3>
            {error && <span className="error-message">{error}</span>}
            <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input type="email" tabIndex="1" required id="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input type="password" tabIndex="2" required id="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button type="submit" tabIndex="3" className="btn btn-full-length btn-primary">Login</button>
        </form>

    </div>
    )
}

export default LoginScreen