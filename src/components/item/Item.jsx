import "./Item.scss";
import React from "react";

function Item(props) {
    return (
        <div className="item" href="/#">
            {props.message && <h2>message</h2>}
            <h1 className="typo__heading-h1">{props.name}</h1>
            <p className="item-category">{"Category: " + props.category}</p>
            <p className="item-price">{"Price: " + props.price}</p>
            {props.seller && <p className="item-seller">{props.seller + ","}</p>}
            {props.created_at && <p className="item-createdAt">{"Listed, " + props.created_at + " days ago."}</p>}
            {props.purchaser && <p className="item-purchaser">{props.purchaser + ","}</p>}
            {props.purchased_at && <p className="item-purchasedAt">{"Purchased, " + props.purchased_at + " days ago."}</p>}
            {props.children}
        </div>
    );
}

export default Item;