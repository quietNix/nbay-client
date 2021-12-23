import "./Button.scss"
import React from "react";

function Button({ children, className, link = '' , onClick}) {
    return (
        <a
            href={"/#/" + link}
            className={"btn__primary typo__heading-h2 typo__heading-h2--white " + className}
            onClick={onClick}
        >
            {children}
        </a>
    )
}

export default Button;