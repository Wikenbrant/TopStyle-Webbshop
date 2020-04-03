import React, { ButtonHTMLAttributes } from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";

// @material-ui/core components
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button, { ButtonProps } from "@material-ui/core/Button";

// core components

import buttonStyle from "../../assets/jss/material-kit-react/components/buttonStyle";
import { ButtonBaseActions } from "@material-ui/core/ButtonBase";

interface Props {
  color:
    | "primary"
    | "info"
    | "success"
    | "warning"
    | "danger"
    | "rose"
    | "white"
    | "facebook"
    | "twitter"
    | "google"
    | "github"
    | "transparent";
  size?: "sm" | "lg";
  simple?: boolean;
  round?: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
  block?: boolean;
  link?: boolean;
  justIcon?: boolean;
  children?: React.ReactNode;
  className?: string;
}

const RegularButton = React.forwardRef(
  (props: Props, ref: React.Ref<HTMLButtonElement>) => {
    const {
      color,
      round,
      children,
      fullWidth,
      disabled,
      simple,
      size,
      block,
      link,
      justIcon,
      className,
      ...rest
    } = props;

    const classes = buttonStyle();

    const btnClasses = classNames({
      [classes.button]: true,
      [classes[size]]: size,
      [classes[color]]: color,
      [classes.round]: round,
      [classes.fullWidth]: fullWidth,
      [classes.disabled]: disabled,
      [classes.simple]: simple,
      [classes.block]: block,
      [classes.link]: link,
      [classes.justIcon]: justIcon,
      [className ?? ""]: className
    });
    return (
      <Button {...rest} ref={ref} className={btnClasses}>
        {children}
      </Button>
    );
  }
);

RegularButton.propTypes = {};

export default RegularButton;
