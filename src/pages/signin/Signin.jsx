import "./Signin.scss";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { serverURL } from "../../utils/constant";

import Container from "../../layouts/container/Container";
import Header from "../../layouts/header/Header";
import Button from "../../components/button/Button";


function Signin() {
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const [credential, SetCredential] = useState({
        email: "",
        password: ""
    });

    useEffect(() => {
        axios.get(serverURL + "isAuthenticated", { withCredentials: true })
            .then(response => {
                if (!response.data.isAuthenticated) {
                    return;
                }
                navigate("../", { replace: true });
            })
            .catch(error => {
                console.log(error.response);
            })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function handleChange(event) {
        const { name, value } = event.target;

        SetCredential(prevNote => {
            return {
                ...prevNote,
                [name]: value
            };
        });
    }

    function validateForm(event) {
        event.preventDefault();
        const re = /^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const rep = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
        if (credential.email === "" || credential.password === "") {
            setMessage("Please Enter Your Credential");
        } else if (!re.test(credential.email)) {
            setMessage("Enter Valid Email address");
        } else if (!rep.test(credential.password)) {
            setMessage("Enter Valid Password");
        } else {
            FormSubmit(credential);
        }
    }

    async function FormSubmit(credential) {
        await axios.post(serverURL + "login", credential, { withCredentials: true })
            .then(response => {
                if (!response.data.loggedIn) {
                    setMessage("User doesn't exist");
                    return;
                }
                setMessage("");
                navigate("../", { replace: true });
            })
            .catch(error => {
                console.log(error.response);
                setMessage("Wrong Password, Please Try again")
            })
    }


    return (
        <Container>
            <Header
                auth="false"
            />

            <form className="signIn" method="POST">
                <h3 className="signUp__message typo__heading-h3">{message}</h3>
                <h2 className="typo__heading-h1" >Sign In</h2>
                <input
                    className="signIn__input"
                    onChange={handleChange}
                    type="email"
                    name="email"
                    placeholder="Enter Your Email Address"
                    value={credential.email}
                />
                <input
                    className="signIn__input"
                    onChange={handleChange}
                    type="password"
                    name="password"
                    placeholder="Enter Your Password"
                    value={credential.password}
                />
                <Button
                    id="Submit"
                    className="signIn__btn"
                    onClick={validateForm}
                >Sign In</Button>
            </form>
            <div></div>
        </Container>
    )
}

export default Signin;