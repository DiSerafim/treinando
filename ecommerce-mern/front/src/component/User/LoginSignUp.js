import React, { Fragment, useRef, useState } from "react";
import "./LoginSignUp.css";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";

const LoginSignUp = () => {
    
    const loginTab = useRef(null);
    const registerTab = useRef(null);
    const switcherTab = useRef(null);

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const loginSubmit = () => {
        console.log("Formulário enviado");
    }

    const registerSubmit = (e) => {}

    const switchTabs = (e, tab) => {
        if (tab === "login") {
            switcherTab.current.classList.add("shiftToNeutral");
            switcherTab.current.classList.remove("shiftToRight");
            registerTab.current.classList.remove("shiftToNeutralForm");
            loginTab.current.classList.remove("shiftToLeft");
        }
        if (tab === "register") {
            switcherTab.current.classList.add("shiftToRight");
            switcherTab.current.classList.remove("shiftToNeutral");
            registerTab.current.classList.add("shiftToNeutralForm");
            loginTab.current.classList.add("shiftToLeft");
        }
    };

    return <Fragment>
        <div className="LoginSignUpContainer">
            <div className="LoginSignUpBox">
                <div>
                    <div className="login_signUp_toggle">
                        <p onClick={ (e) => switchTabs(e, "login") }>Entrar</p>
                        <p onclick={ (e) => switchTabs(e, "register") }>Registrar</p>
                    </div>
                    <button ref={switcherTab}></button>
                </div>
                <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
                    <div className="loginEmail">
                        <MailOutlineIcon />
                        <input
                            type="email"
                            placeholder="Email"
                            required
                            value={loginEmail}
                            onChange={ (e) => setLoginEmail(e.target.value) }
                        />
                    </div>
                    <div className="loginPassword">
                        <LockOpenIcon />
                        <input
                            type="password"
                            placeholder="Senha"
                            required
                            value={loginPassword}
                            onChange={ (e) => setLoginPassword(e.target.value) }
                        />
                    </div>
                    <Link to="/password/forgot">Esqueceu a senha?</Link>
                    <input
                        type="submit" value="login" className="loginBtn"
                    />
                </form>
                <form
                className="signUpForm"
                ref={registerTab}
                encType="multipart/form-data"
                onSubmit={registerSubmit}
                >
                    <div className="signUpName">
                        <FaceIcon />
                        <input
                            type="text"
                            pĺaceholder="Nome"
                            required
                            name="name"
                            value={name}
                            onChange={registerDataChange}
                        />
                    </div>
                    <div className="signUpEmail">
                        <MailOutlineIcon />
                        <input
                            type="password"
                            placeholder="Senha"
                            required
                            name="password"
                            value={password}
                            onChange={registerDataChange}
                        />
                    </div>
                    <div id="registerImage">
                        <img src={avatarPreview} alt="Avatar Prévia" />
                        <input
                            type="file"
                            name="avatar"
                            accept="image/*"
                            onChange={registerDataChange}
                        />
                    </div>
                    <input
                        type="submit"
                        value="Register"
                        className="signUpBtn"
                        // disabled={loading ? true : false}
                    />
                </form>
            </div>
        </div>
    </Fragment>
};

export default LoginSignUp;