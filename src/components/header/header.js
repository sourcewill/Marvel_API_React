import React from "react";
import './header.css'

export default function Header() {
    return (
        <header>
            <div className="header-logo">
                <a href="/">
                    <img src="https://storage.googleapis.com/qtz-files/home/img/nev_bar.svg" alt="Logo" />
                </a>
            </div>
        </header>
    );
}