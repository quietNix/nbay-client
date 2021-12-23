import "./Features.scss";
import React from "react";

function Features(params) {
    return(
        <section className="features">
            <div className="features-feature">
                <i className="features-feature__icon icon-basic-compass"></i>
                <h3 className="typo__heading-h2">Verified Payment</h3>
                <p className="typo__paragraph">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, ipsum sapiente
                    aspernatur.

                </p>
            </div>

            <div className="features-feature">
                <i className="features-feature__icon icon-basic-map"></i>
                <h3 className="typo__heading-h2">Scam Prevention Squad</h3>
                <p className="typo__paragraph">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, ipsum sapiente
                    aspernatur.
                    {/* <br/> */}
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, ipsum sapiente
                    aspernatur.
                    
                </p>
            </div>

            <div className="features-feature">
                <i className="features-feature__icon icon-basic-heart"></i>
                <h3 className="typo__heading-h2">Broker Free</h3>
                <p className="typo__paragraph">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, ipsum sapiente
                    aspernatur.
                </p>
            </div>

        </section>
    )
}

export default Features;