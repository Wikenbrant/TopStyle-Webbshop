import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Grid, { GridProps } from "@material-ui/core/Grid";

const useStyles = makeStyles({
  grid: {
    marginRight: "-15px",
    marginLeft: "-15px",
    width: "auto"
  }
});
interface Props extends GridProps {}

const GridContainer: React.FC<Props> = props => {
  const classes = useStyles();
  const { children, className, ...rest } = props;
  return (
    <Grid container {...rest} className={classes.grid + " " + className}>
      {children}
    </Grid>
  );
};
GridContainer.defaultProps = {
  className: ""
};
export default GridContainer;
