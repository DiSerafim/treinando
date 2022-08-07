import React from "react";
import "./Sidebar.css";
import logo from "../../images/logo-e-commerce.png";
import { Link } from "react-router-dom";
import { TreeView, TreeItem } from "@material-ui/lab";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PostAddIcon from "@material-ui/icons/PostAdd";
import AddIcon from "@material-ui/icons/Add";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import ListAltIcon from "@material-ui/icons/ListAlt";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import RateReviewIcon from "@material-ui/icons/RateReview";

const Sidebar = () => {
    return <div className="sidebar">
        <Link to="/">
            <img src={logo} alt="logo-ecommerce" />
        </Link>
        <Link to="/admin/dashboard">
            <p>
                <DashboardIcon />Administração
            </p>
        </Link>
        <Link>
            <TreeView
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ImportExportIcon />}
            >
                <TreeItem nodeId="1" label="Produtos">
                    <Link to="/admin/products">
                        <TreeItem nodeId="2" label="Todos" icon={<PostAddIcon />} />
                    </Link>
                    <Link to="/admin/product">
                        <TreeItem nodeId="3" label="Novo Produto" icon={<AddIcon />} />
                    </Link>
                </TreeItem>
            </TreeView>            
        </Link>
        <Link to="/admin/orders">
            <p>
                <ListAltIcon /> Pedidos
            </p>
        </Link>
        <Link to="/admin/users">
            <p>
                <PeopleIcon /> Usuários
            </p>
        </Link>
        <Link to="/admin/reviews">
            <p>
                <RateReviewIcon /> Avaliações
            </p>
        </Link>
    </div>
}

export default Sidebar;