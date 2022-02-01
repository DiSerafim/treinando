import React from "react";
import playStore from "../../../images/logo.png";
import appStore from "../../../images/logo.png";
import "./Footer.css"

const Footer = () => {
    return (
        <footer id="footer">
            <div class="leftFooter">
                <h4>BAIXE NOSSO APLICATIVO</h4>
                <p>Baixe o aplicativo para celular Android e IOS</p>
                <img src={playStore} alt="playstore" />
                <img src={appStore} alt="Appstore" />
            </div>

            <div class="midFooter">
                <h1>ECOMMERCE.</h1>
                <p>Alta qualidade é a nossa primeira prioridade</p>
                <p>Direitos autorais 2022 &copy; DiegoSerafim</p>
            </div>

            <div class="rightFooter">
                <h4>Siga-nos</h4>
                <a href="#insta">Instagram</a>
                <a href="#you">Youtube</a>
                <a href="#face">Facebook</a>
            </div>
        </footer>
    );
};

export default Footer;