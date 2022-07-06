import React, { Fragment, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProductDetails } from "../../actions/productAction";
import ReactStars from "react-rating-stars-component";
import ReviewCard from "./ReviewCard";
import Loader from "../layout/Loader/Loader"
import { useAlert } from "react-alert";
import "./ProductDetails.css";
import MetaData from "../layout/MetaData";
import { addItemsToCart } from "../../actions/cartAction";

const ProductDetails = ({ match }) => {
    const dispatch = useDispatch();
    const alert = useAlert();

    const { product, loading, error } = useSelector(
        (state) => state.productDetails
    );

    const options = {
        edit: false,
        color: "rgba(20, 20, 20, 0.1)",
        activeColor: "tomato",
        size: window.innerWidth < 600 ? 10 : 15,
        value: product.ratings,
        isHalf: true,
    }

    const [quantity, setQuantity] = useState(1);

    const increaseQuantity = () => {
        if (product.Stock <= quantity) return;
        const qty = quantity + 1;
        setQuantity(qty);
    };

    const decreaseQuantity = () => {
        if (1 >= quantity) return;
        const qty = quantity - 1;
        setQuantity(qty);
    };

    const addToCartHandler = () => {
        dispatch(addItemsToCart(match.params.id, quantity));
        alert.success("Item adicionado ao carrinho");
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProductDetails(match.params.id));
    }, [dispatch, match.params.id, error, alert]);

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title={`${product.name} -- Ecommerce`} />
                    <div className="ProductDetails">
                        <div>
                            <Carousel>
                                {product.images &&
                                    product.images.map((item, i) => (
                                        <img
                                            className="CarouselImage"
                                            key={item.url}
                                            src={item.url}
                                            alt={`${i} Slide`}
                                        />
                                    ))
                                }
                            </Carousel>
                        </div>

                        <div>
                            <div className="detailsBlock-1">
                                <h2>{product.name}</h2>
                                <p># {product._id}</p>
                            </div>
                            <div className="detailsBlock-2">
                                <ReactStars { ...options } />
                                <span>{ product.numOfReviews }</span>
                            </div>
                            <div className="detailsBlock-3">
                                <h1>{`R$ ${product.price},00`}</h1>
                                <div className="detailsBlock-3-1">
                                    <div className="detailsBlock-3-1-1">
                                        <button onClick={decreaseQuantity}>-</button>
                                        <input type="number" value={quantity} />
                                        <button onClick={increaseQuantity}>+</button>
                                    </div>
                                    <button disabled={product.Stock < 1 ? true : false} onClick={addToCartHandler}>Add as compras 🛍</button>
                                </div>

                                <p>
                                    Estoque:
                                    <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                                        { product.Stock < 1 ? "Esgotado" : product.Stock }
                                    </b>
                                </p>
                            </div>

                            <div className="detailsBlock-4">
                                Sobre o Produto: <p>{ product.description }</p>
                            </div>

                            <button className="submitReview">Avaliar</button>
                        </div>
                    </div>

                    <h3 className="reviewsHeading">Avaliações</h3>

                    {product.reviews && product.reviews[0] ? (
                        <div className="reviews">
                            {product.reviews &&
                                product.reviews.map((review) => <ReviewCard review={review} />)}
                        </div>
                    ) : (
                        <p className="noReviews">Sem avaliações</p>
                    )}
                </Fragment>
            )}
        </Fragment>
    );
};

export default ProductDetails;
