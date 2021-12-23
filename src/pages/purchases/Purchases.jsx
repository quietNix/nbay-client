import "./Purchases.scss"
import React, { useEffect, useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { serverURL } from "../../utils/constant";

import Container from "../../layouts/container/Container";
import Main from "../../layouts/main/Main";
import Item from "../../components/item/Item";
import Header from "../../layouts/header/Header";


function Home (){
    const navigate = useNavigate();
    const[items, setItems] = useState([]);
    const currTime = new Date().getTime();

    useEffect(()=>{
        axios.get(serverURL + "purchases", { withCredentials: true })
            .then(response => {
                setItems(response.data.purchases);
            })
            .catch(error => {
                console.log(error.response);
                if (!error.response.data.isAuthenticated) {
                    navigate("../", { replace: true });
                }
            })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Container>
            <Header />
            <Main className="purchases">
                {items.length===0 && <h1>You haven't purchased any items yet.</h1>}
                {items.map((item) => {
                    return (
                        <Item
                            key={item._id}
                            _id={item._id}
                            name={item.name}
                            category={item.category}
                            seller={item.seller.name}
                            price={item.price}
                            purchaser="You"
                            created_at={((currTime - new Date(item.created_at).getTime()) / (1000 * 60 * 60 * 24)).toFixed(1)}
                            purchased_at={((currTime - new Date(item.purchased_at).getTime()) / (1000 * 60 * 60 * 24)).toFixed(1)}
                        />
                    );
                })}
            </Main>
        </Container>
    )
}

export default Home;