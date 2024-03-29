import React, { Fragment, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProductDetails, newReview } from "../../actions/productAction";
import ReviewCard from "./ReviewCard";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import "./ProductDetails.css";
import MetaData from "../layout/MetaData";
import { addItemsToCart } from "../../actions/cartAction";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";

const ProductDetails = ({ match }) => {
    const dispatch = useDispatch();
    const alert = useAlert();
  
    const { product, loading, error } = useSelector(
      (state) => state.productDetails
    );
  
    const { success, error: reviewError } = useSelector((state) => state.newReview);
  
    const options = {
      size: "large",
      value: product.ratings,
      readOnly: true,
      precision: 0.5,
    };
  
    const [quantity, setQuantity] = useState(1);
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
  
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
  
    const submitReviewToggle = () => {
      open ? setOpen(false) : setOpen(true);
    };
  
    const reviewSubmitHandler = () => {
      const myForm = new FormData();
      myForm.set("rating", rating);
      myForm.set("comment", comment);
      myForm.set("productId", match.params.id);
      dispatch(newReview(myForm));
      setOpen(false);
    };
  
    useEffect(() => {
      if (error) {
        alert.error(error);
        dispatch(clearErrors());
      }
      if (reviewError) {
        alert.error(reviewError);
        dispatch(clearErrors());
      }
      if (success) {
        alert.success("Sua opinião é muito importante, Obrigado!");
        dispatch({ type: NEW_REVIEW_RESET });
      }
      dispatch(getProductDetails(match.params.id));
    }, [dispatch, match.params.id, error, alert, reviewError, success]);
  
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
                        key={i}
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
                  <Rating { ...options } />
                  <span className="detailsBlock-2-span">
                    {" "}
                    { product.numOfReviews }
                  </span>
                </div>
                <div className="detailsBlock-3">
                  <h1>{`R$ ${product.price},00`}</h1>
                  <div className="detailsBlock-3-1">
                    <div className="detailsBlock-3-1-1">
                      <button onClick={decreaseQuantity}>-</button>
                      <input readOnly type="number" value={quantity} />
                      <button onClick={increaseQuantity}>+</button>
                    </div>
                    <button disabled={product.Stock < 1 ? true : false} onClick={addToCartHandler}>Add as compras 🛍</button>
                  </div>
  
                  <p>
                    Estoque:
                    <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                      { product.Stock < 1 ? "Esgotado" : "Disponível" }
                    </b>
                  </p>
                </div>
  
                <div className="detailsBlock-4">
                  Sobre o Produto: <p>{ product.description }</p>
                </div>
  
                <button onClick={submitReviewToggle} className="submitReview">Avaliar</button>
              </div>
            </div>
  
            <h3 className="reviewsHeading">Avaliações</h3>
  
            <Dialog
              aria-labelledby="simple-dialog-title"
              open={open}
              onClose={submitReviewToggle}
            >
              <DialogTitle>Enviar Avaliação</DialogTitle>
              <DialogContent className="submitDialog">
                <Rating
                  onChange={(e) => setRating(e.target.value)}
                  value={rating}
                  size="large"
                />
                <textarea
                  className="submitDialogTextArea"
                  cols="30"
                  rows="5"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                >
                </textarea>
              </DialogContent>
              <DialogActions>
                <Button onClick={submitReviewToggle} color="secondary">Cancelar</Button>
                <Button onClick={reviewSubmitHandler} color="primary">Enviar</Button>
              </DialogActions>
            </Dialog>
  
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
