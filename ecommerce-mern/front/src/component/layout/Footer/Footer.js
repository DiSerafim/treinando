import React from "react";
import playStore from "../../../images/play-store.png";
import appStore from "../../../images/app-store.png";
import "./Footer.css"
import { CgFacebook } from "react-icons/cg";
import { CgYoutube } from "react-icons/cg";
import { CgInstagram } from "react-icons/cg";

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
                <a href="#insta">Instagram <CgInstagram /></a>
                <a href="#you">Youtube <CgYoutube /></a>
                <a href="#face">Facebook <CgFacebook /></a>
            </div>
        </footer>
    );
};

export default Footer;