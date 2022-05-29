import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import "./Profile.css";

const Profile = ({ history }) => {
    const { user, loading, isAuthenticated } = useSelector((state) => state.user);

    useEffect(() => {
        if (isAuthenticated === false) {
            history.push("/login");
        }
    }, [history, isAuthenticated]);

    return (
        <Fragment>
            {loading ? (<Loader />) : (
                <Fragment>
                    <MetaData title={`${user.name}'s Perfil`} />
                    <div className="profileContainer">
                        <div>
                            <h1>Meu Perfil</h1>
                            <img src={user.avatar.url} alt={user.name} />
                            <Link to="/me/update">Editar Perfil</Link>
                        </div>
                        <div>
                            <div>
                                <h4>Nome Completo</h4>
                                <p>{user.name}</p>
                            </div>
                            <div>
                                <h4>Email</h4>
                                <p>{user.email}</p>
                            </div>
                            <div>
                                <h4>Entrou em</h4>
                                <p>{String(user.createdAt).substr(0, 10)}</p>
                            </div>
                            <div>
                                <Link to="/orders">Minhas Compras</Link>
                                <Link to="/password/update">Mudar Senha</Link>
                            </div>
                        </div>
                    </div>
            </Fragment>
            )}
        </Fragment>
    );
};

export default Profile;