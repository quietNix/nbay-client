import "./Signup.scss";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { serverURL } from "../../utils/constant";

import Container from "../../layouts/container/Container";
import Header from "../../layouts/header/Header";
import Button from "../../components/button/Button";


function Signup() {
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const [newUser, SetnewUser] = useState({
        name: "",
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

        SetnewUser(prevNote => {
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
        if (newUser.name ==="" || newUser.email === "" || newUser.password === "") {
            setMessage("Please Enter valid details");
        } else if (!re.test(newUser.email)) {
            setMessage("Enter Valid Email address");
        } else if (!rep.test(newUser.password)) {
            setMessage("Enter Valid Password");
        } else {
            FormSubmit(newUser);
        }
    }

    async function FormSubmit(newUser) {
        await axios.post(serverURL + "users", newUser, { withCredentials: true })
            .then(response => {
                if (!response.data.userCreated) {
                    setMessage("User doesn't exist");
                    return;
                }
                setMessage("");
                navigate("../signin", { replace: true });
            })
            .catch(error => {
                console.log(error.response);
                if (error.response.status === 409) setMessage(error.response.data.errorMessage)
                else setMessage("Wrong Password, Please Try again")
            })
    }


    return (
        <Container>
            <Header 
                auth="false"
            />

            <form className="signUp" method="POST">
                <h3 className="signUp__message typo__heading-h3">{message}</h3>
                <h2 className="typo__heading-h1 typo__heading-h1--dark" >Sign Up</h2>
                <input
                    className="signUp__input"
                    onChange={handleChange}
                    type="item"
                    name="name"
                    placeholder="Enter Your Name"
                    value={newUser.name}
                />
                <input
                    className="signUp__input"
                    onChange={handleChange}
                    type="email"
                    name="email"
                    placeholder="Enter Your email"
                    value={newUser.email}
                />
                <input
                    className="signUp__input"
                    onChange={handleChange}
                    type="password"
                    name="password"
                    placeholder="Enter Your Password"
                    value={newUser.password}
                />
                <Button
                    id="Submit"
                    className="signUp__btn"
                    onClick={validateForm}
                >Sign Up</Button>
            </form>
            <div></div>
        </Container>
    )
}

export default Signup;