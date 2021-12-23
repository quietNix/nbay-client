import "./Main.scss";
import React from "react";

function Main({children, className}) {
    return(
        <main className= {"main main-" + className}>
            {children}
        </main>
    );
}

export default Main;