import React, { Fragment } from "react";
import { CgMouse } from "react-icons/all";
import "./Home.css";
import Product from "./Product.js";


const product = {
    name: "Camiseta azul",
    images: [{ url: "https://m.media-amazon.com/images/I/A1ntnF3PJOL._CLa%7C2140%2C2000%7C91CzXiZtcwL.png%7C0%2C0%2C2140%2C2000%2B0.0%2C0.0%2C2140.0%2C2000.0_AC_UX342_.png" }],
    price: "R$3000",
    _id: "serafim",
};

const Home = () => {
    return (
        <Fragment>
            <div className="banner">
                <p>Bem-vindo ao comércio eletrônico</p>
                <h1>Encontre produtos incríveis</h1>

                <a href="#container">
                    <button>
                        Rolagem <CgMouse />
                    </button>
                </a>
            </div>
            {/* título inicial */}
            <h2 className="homeHeading">Produtos em destaque</h2>
            <div className="container" id="container">
                <Product product={ product } />
                <Product product={ product } />
                <Product product={ product } />
                <Product product={ product } />

                <Product product={ product } />
                <Product product={ product } />
                <Product product={ product } />
                <Product product={ product } />
            </div>
        </ Fragment>
    );
};

export default Home;
