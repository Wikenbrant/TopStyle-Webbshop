import React from "react";
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

const GridContainer = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
  const classes = useStyles();
  const { children, className, ...rest } = props;
  return (
    <div ref={ref}>
      <Grid container {...rest} className={classes.grid + " " + className}>
        {children}
      </Grid>
    </div>
  );
});
GridContainer.defaultProps = {
  className: ""
};
export default GridContainer;
