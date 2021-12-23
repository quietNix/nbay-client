import "./Landing.scss";
import React, { useEffect, useState } from "react";
import axios from "axios";

import { serverURL } from "../../utils/constant";

import Container from "../../layouts/container/Container";
import Header from "../../layouts/header/Header";
import Features from "../../components/features/Features";
import Button from "../../components/button/Button";
import Home from "../home/Home";



function Landing(params) {

    const [auth, setAuth] = useState(false);

    useEffect(() => {
        axios.get(serverURL + "isAuthenticated", { withCredentials: true })
            .then(response => {
                if (!response.data.isAuthenticated) {
                    return;
                }
                setAuth(true);
            })
            .catch(error => {
                console.log(error.response);
            })
    }, [])


    return (
        auth ?
            <Home />
            :
            <Container>
                <Header
                    auth="false"
                />
                <Features />
                <main className="landing">
                    <Button
                        className="landing__login"
                        link="signin"
                    >Sign In</Button>
                    <Button
                        className="landing__register"
                        link="signup"
                    >Sign Up</Button>
                </main>
            </Container>
    )
}

export default Landing;