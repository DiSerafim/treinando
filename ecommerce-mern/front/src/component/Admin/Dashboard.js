import React from "react";
import Sidebar from "./Sidebar.js";
import "./Dashboard.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
// 12:40:52

const Dashboard = () => {
    const lineState = {
        labels: ["Quantidade inicial", "Valor ganho"],
        datasets: [
            {
                label: "Valor total",
                backgroundColor: ["tomato"],
                hoverBackgroundColor: ["rgb(197,72, 49)"],
                data: [0, 4000],
            },
        ],
    };

    const doughnutState = {
        labels: ["Fora de estoque", "Em estoque"],
        datasets: [
            {
                backgroundColor: ["#00A6B4", "#6800B4"],
                hoverBackgroundColor: ["#4B5000", "#35014F"],
                data: [2, 10],
            },
        ],
    };

    return (
        <div className="dashboard">
            <Sidebar />

            <div className="dashboardContainer">
                <Typography component="h1">Administração</Typography>

                <div className="dashboardSummary">
                    <div>
                        <p>Total <br /> R$ 2000</p>
                    </div>
                    <div className="dashboardSummaryBox2">
                        <Link to="/admin/products">
                            <p>Produto</p>
                            <p>50</p>
                        </Link>
                        <Link to="/admin/orders">
                            <p>Pedidos</p>
                            <p>4</p>
                        </Link>
                        <Link to="/admin/users">
                            <p>Usuarios</p>
                            <p>2</p>
                        </Link>
                    </div>
                </div>
                <div className="lineChart">
                    <Line data={lineState} />
                </div>
                <div className="doughnutChart">
                    <Doughnut data={doughnutState} />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;