import "./Container.scss";
import React from "react";

function Container({children}){
    return(
        <section className="container">
            {children}
        </section>
    )
}

export default Container;