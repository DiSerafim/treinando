import React, { Fragment, useState } from "react";
import "./Header.css";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitTcAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import { useHistory } from "react-router-dom";
import { useAlert } from "react-alert";
import { logout } from "../../../actions/userAction";
import { useDispatch } from "react-redux";

const UserOptions = ({ user }) => {
    const [open, setOpen] = useState(false);

    const history = useHistory();
    const alert = useAlert();
    const dispatch = useDispatch();

    const options = [
        { icon: <ListAltIcon />, name: "Pedidos", func: orders  },
        { icon: <PersonIcon />, name: "Perfil", func: account },
        { icon: <ExitTcAppIcon />, name: "Sair", func: logoutUser },
    ];

    if (user.role === "admin") {
        options.unshift({
            icon: <DashboardIcon />,
            name: "Configurações",
            func: dashboard,
        });
    }

    function dashboard() {
        history.push("/dashboard");
    }

    function orders() {
        history.push("/orders");
    }

    function account() {
        history.push("/account");
    }

    function logoutUser() {
        dispatch(logout());
        alert.success("Saindo...")
    }

    return (
        <Fragment>
            <SpeedDial
                ariaLabel="SpeedDial tooltip example"
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                direction="down"
                className="speedDial"
                icon={
                    <img
                        className="speedDialIcon"
                        src={user.avatar.url ? user.avatar.url : "/Profile.png"}
                        alt="Profile"
                    />
                }
            >
                {/* <SpeedDialAction icon={<DashboardIcon />} tooltipTitle="Configurações" /> */}
                { options.map((item) => (
                    <SpeedDialAction
                        key={item.name}
                        icon={item.icon}
                        tooltipTitle={item.name}
                        onClick={item.func}
                    />
                )) }
            </SpeedDial>
        </Fragment>
    );
};

export default UserOptions;