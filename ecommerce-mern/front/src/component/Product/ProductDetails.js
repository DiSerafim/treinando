import React, { Fragment, useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import { useSelector, useDispatch } from "react-redux";
import { getProductDetails } from "../../actions/productAction";
import ReactStars from "react-rating-stars-component";
import "./ProductDetails.css";

const ProductDetails = ({ match }) => {
    const dispatch = useDispatch();
    const { product, loading, error } = useSelector(
        (state) => state.productDetails
    );

    useEffect(() => {
        dispatch(getProductDetails(match.params.id));
    }, [dispatch, match.params.id]);

    const options = {
        edit: false,
        color: "rgba(20, 20, 20, 0.1)",
        activeColor: "tomato",
        size: window.innerWidth < 600 ? 20 : 25,
        value: product.ratings,
        isHalf: true,
    }

    return (
        <Fragment>
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
                                )
                        )}
                    </Carousel>
                </div>

                <div>
                    <div className="detailsBlock-1">
                        <h2>{product.name}</h2>
                        <p>Produto # {product._id}</p>
                    </div>
                    <div className="detailsBlock-2">
                        <ReactStars {...options} />
                        <span>({ product.numOfReviews } Avaliações)</span>
                    </div>
                    <div className="detailsBlock-3">
                        <h1>{`R$ ${product.price}`}</h1>
                        <div className="detailsBlock-3-1">
                            <div className="detailsBlock-3-1-1">
                                <button>-</button>
                                <input value="1" type="number" />
                                <button>+</button>
                            </div>{" "}
                            <button>Add as compras 🛍</button>
                        </div>
                        <p>
                            Status:{" "}
                            <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                                { product.Stock < 1 ? "Esgotado" : "Estoque" }
                            </b>
                        </p>
                    </div>
                    <div className="detailsBlock-4">
                        Descrição: <p>{ product.description }</p>
                    </div>

                    <button className="submitReview">Avaliar</button>
                </div>
            </div>
        </Fragment>
    );
};

export default ProductDetails;
