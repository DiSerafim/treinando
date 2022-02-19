import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/all";
import "./Home.css";
import Product from "./Product";
import MetaData from "../layout/MetaData";
import { getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";

const Home = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const { loading, error, products, productsCount } = useSelector(
        (state) => state.products
    );

    useEffect(() => {
        if (error) {
            return alert.error(error);
        }
        dispatch(getProduct());
    }, [dispatch, error]);

    return (
        <fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title="Inicio" />
        
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
                        { products && products.map((product) => <Product product={ product } />) }
                    </div>
                </ Fragment>
            )}
        </fragment>
    );
};

export default Home;
