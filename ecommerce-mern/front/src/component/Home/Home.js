import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/all";
import "./Home.css";
import ProductCard from "./ProductCard";
import MetaData from "../layout/MetaData";
import { clearErrors, getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";

const Home = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const { loading, error, products } = useSelector((state) => state.products);

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProduct());
    }, [dispatch, error, alert]);

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title="Inicio" />

                    <div className="banner">
                        <p>Bem-vindo ao Ecommerce</p>
                        <h1>ENCONTRE PRODUTOS INCRÍVEIS ABAIXO</h1>

                        <a href="#container">
                        <button>
                            Ver <CgMouse />
                        </button>
                        </a>
                    </div>

                    <h2 className="homeHeading">Featured Products</h2>

                    <div className="container" id="container">
                        {products &&
                        products.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

export default Home;
