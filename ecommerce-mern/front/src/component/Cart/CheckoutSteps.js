import { Step, StepLabel, Stepper, Typography } from "@material-ui/core";
import React, { Fragment } from "react";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import LibraryAddCheckIcon from "@material-ui/icons/LibraryAddCheck";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import "./CheckoutSteps.css";

const CheckoutSteps = ({ activeStep }) => {
    const steps = [
        {
            label: <Typography>Detalhes de envio</Typography>,
            icon: <LocalShippingIcon />,
        },
        {
            label: <Typography>Confirmar pedido</Typography>,
            icon: <LibraryAddCheckIcon />,
        },
        {
            label: <Typography>Pagamento</Typography>,
            icon: <AccountBalanceIcon />,
        },
    ];

    const stepStyles = {
        boxSizing: "border-box",
    };

    return (
        <Fragment>
            <Stepper alternativeLabel activeStep={activeStep} style={stepStyles}>
                {steps.map((item, index) => (
                    <Step
                        key={index}
                        active={activeStep === index ? true : false}
                        completed={activeStep >= index ? true : false}
                    >
                        <StepLabel
                            icon={item.icon}
                            style={{color: activeStep >= index ? "tomato" : "rgba(0, 0, 0, 0.649)"}}
                        >
                            {item.label}
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Fragment>
    );
}

export default CheckoutSteps;