import "./Sell.scss"
import React, { useEffect, useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { serverURL } from "../../utils/constant";

import Container from "../../layouts/container/Container";
import Main from "../../layouts/main/Main";
import Header from "../../layouts/header/Header";
import Item from "../../components/item/Item";
import Button from "../../components/button/Button";




function Home() {
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [soldItems, setSoldItems] = useState([]);
    const [photoFilePath, setPhotoFilePath] = useState("");
    const [newItem, setNewItem] = useState({
        name: "",
        category: "",
        price: "",
        photo: ""
    });
    const [message, setMessage] = useState("");
    const currTime = new Date().getTime();

    useEffect(() => {
        axios.get(serverURL + "items/sell", { withCredentials: true })
            .then(response => {
                console.log(response.data.userItems)
                setItems(response.data.userItems);
                setSoldItems(response.data.soldUsersItems);
            })
            .catch(error => {
                console.log(error.response);
                if (!error.response.data.isAuthenticated) {
                    navigate("../", { replace: true });
                }
            })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    function handleChange(event) {
        setMessage("");
        const { name, value } = event.target;

        setNewItem(prevNote => {
            return {
                ...prevNote,
                [name]: value
            };
        });
    }

    const handlePhoto = (e) => {
        setMessage("");
        if (e.target.files[0].size > 250000) {
            setMessage("Choose picture below 2mb")
            return;
        }
        setPhotoFilePath(e.target.value);
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        console.log(e.target.files[0])
        reader.onloadend = () => {
            setNewItem({ ...newItem, photo: reader.result });
        }
        reader.onerror = () => {
            console.error('AHHHHHHHH!!');
            setMessage('photo upload error, try again');
            return;
        }
    }

    function validateForm(event) {
        event.preventDefault();
        if (newItem.name === "" || newItem.category === "" || newItem.price === "" || newItem.photo==="") {
            setMessage("Please Enter valid details");
        } else {
            FormSubmit(newItem);
        }
    }

    async function FormSubmit(newItem) {
        // const formData = new FormData();
        // formData.append('name', newItem.name);
        // formData.append('category', newItem.category);
        // formData.append('price', newItem.price);
        // formData.append('photo', newItem.photo);
        await axios.post(serverURL + "items", newItem, { withCredentials: true })
            .then(response => {
                const item = response.data.itemCreated;
                if (!item) {
                    setMessage("Try Again");
                    return;
                }
                setItems([item, ...items]);
                setNewItem({
                    name: "",
                    category: "",
                    price: "",
                    photo: ""
                })
                setMessage("List Item Added Successfully.")
            })
            .catch(error => {
                console.log(error.response);
                setMessage("Server Error, Please Try again")
            })
    }

    return (
        <Container>
            <Header
                route1="purchases"
                text1="Your Purchases"
                route2=""
                text2="Buy Products"
            />
            <section className="sell">
                <form className="sell-form">
                    {message && <h1 className="signIn__message">{message}</h1>}
                    <h1>List Your Product</h1>
                    <input
                        className="sell-form__input"
                        name="name"
                        placeholder="Name"
                        type="text"
                        autoComplete="off"
                        onChange={handleChange}
                        value={newItem.name}
                    />
                    <input
                        className="sell-form__input"
                        list="data" name="category"
                        placeholder="Category"
                        id="category"
                        onChange={handleChange}
                        value={newItem.category}
                    />
                    <datalist id="data">
                        <option value="Motorcycles" />
                        <option value="Cars" />
                        <option value="Bicycles" />
                        <option value="TVs & Computers" />
                        <option value="Cameras" />
                        <option value="ACs" />
                        <option value="Furniture" />
                        <option value="Books" />
                        <option value="Gym" />
                        <option value="Sports" />
                        <option value="Pets" />
                    </datalist>

                    <input
                        className="sell-form__input"
                        name="price"
                        placeholder="Price"
                        type="text"
                        onChange={handleChange}
                        value={newItem.price}
                    />
                    <div className="sell-form-img">
                        <label htmlFor="photo">Photo: </label>
                        <input
                            className=" sell-form__imgInput"
                            name="photo"
                            type="file"
                            accept=".png, .jpg, .jpeg"
                            onChange={handlePhoto}
                            // value={photoFilePath}
                        />
                    </div>

                    <Button
                    className="sell-form__btn"
                        onClick={validateForm}
                    >List</Button>
                </form>

                <Main className="sell">
                    {items.length === 0 ? <h1 className="sell-main__heading">You have no listed items.</h1> : <h1 className="sell-main__heading">Your Listed Products</h1>}
                    {items.map((item) => {
                        return (
                            <Item
                                id={item._id}
                                key={item._id}
                                name={item.name}
                                category={item.category}
                                seller="You"
                                created_at={((currTime - new Date(item.created_at).getTime()) / (1000 * 60 * 60 * 24)).toFixed(2)}
                                price={item.price}
                                photo={item.photo}
                                // seller={item.seller.name}
                            />
                        );
                    })}
                    {soldItems.length === 0 ? <h1 className="sell-main__heading">You have no sold items.</h1> : <h1 className="sell-main__heading">Your Sold Products</h1>}
                    {soldItems.map((item) => {
                        return (
                            <Item
                                id={item._id}
                                key={item._id}
                                name={item.name}
                                category={item.category}
                                price={item.price}
                                seller="You"
                                created_at={((currTime - new Date(item.created_at).getTime()) / (1000 * 60 * 60 * 24)).toFixed(1)}
                                purchaser={item.buyer.name}
                                purchased_at={((currTime - new Date(item.purchased_at).getTime()) / (1000 * 60 * 60 * 24)).toFixed(1)}
                            />
                        );
                    })}
                    </Main>
            </section>
        </Container>
    )
}

export default Home;