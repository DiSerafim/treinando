import React, { useState, Fragment } from "react";
import MetaData from "../layout/MetaData";
import "./Search.css";

const Search = ({ history }) => {
    const [keyword, setkeyword] = useState("");

    const searchSubmitHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            history.push(`/products/${keyword}`);
        } else {
            history.push("/products");
        }
    };

    return (
        <Fragment>
            <MetaData title="Procurar no site" />
            <form className="searchBox" onSubmit={searchSubmitHandler}>
                <input
                    type="text"
                    placeholder="Pesquisar ..."
                    onChange={(e) => setkeyword(e.target.value)}
                />
                <input type="submit" value="🔍" />
            </form>
        </Fragment>
    );
};

export default Search;
