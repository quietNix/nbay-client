import "./Home.scss"
import React, { useEffect, useState } from "react"
import axios from "axios";

import { serverURL } from "../../utils/constant";

import Container from "../../layouts/container/Container";
import Main from "../../layouts/main/Main";
import Item from "../../components/item/Item";
import Header from "../../layouts/header/Header";
import Button from "../../components/button/Button";

function Home() {
    const [items, setItems] = useState([]);
    const [currentUser, setCurrentUser] = useState("");
    const [message, setMessage] = useState("");
    const currTime = new Date().getTime();

    useEffect(() => {
        axios.get(serverURL + "items", { withCredentials: true })
            .then(response => {
                setItems(response.data.items);
                setCurrentUser(response.data.user_id);
            })
            .catch(error => {
                console.log(error.response);
            })
    }, [])

    const handlePurchase = async (item_id) => {
        await axios.post(serverURL + "purchases", { item_id: item_id }, { withCredentials: true })
            .then(response => {
                if (!response.data.purchaseSuccess) {
                    setMessage("Try Again");
                    return;
                }
                setItems(items.filter(item => item._id !== item_id));
                // setItems([item, ...items]);
            })
            .catch(error => {
                console.log(error.response);
                setMessage("Wrong Password, Please Try again")
            })
    }

    return (
        <Container>
            <Header
                route1="sell"
                text1="Sell your Products"
                route2="purchases"
                text2="Your Purchases"
            />
            <Main className="home">
                {items.map((item) => {
                    return (
                        <Item
                            key={item._id}
                            _id={item._id}
                            name={item.name}
                            category={item.category}
                            price={item.price}
                            seller={item.seller._id===currentUser?"You":item.seller.name}
                            created_at={((currTime - new Date(item.created_at).getTime())/(1000*60*60*24)).toFixed(2)}
                            handlePurchase={handlePurchase}
                            message={message}
                            photo={item.photo}
                        >
                            {item.seller._id !== currentUser &&
                                <Button
                                    onClick={() => handlePurchase(item._id)}
                                >Buy</Button>}
                        </Item>

                    );
                })}
                </Main>
        </Container>
    )
}

export default Home;