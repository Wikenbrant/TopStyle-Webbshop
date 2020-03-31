import React, { ComponentType } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";

import infoStyle from "../../assets/jss/material-kit-react/components/infoStyle";
import { SvgIconProps } from "@material-ui/core/SvgIcon";

interface Props {
  icon: ComponentType<SvgIconProps>;
  title: string;
  description: string;
  iconColor?:
    | "primary"
    | "warning"
    | "danger"
    | "success"
    | "info"
    | "rose"
    | "gray";
  vertical?: boolean;
}

const InfoArea: React.FC<Props> = props => {
  const classes = infoStyle();
  const { title, description, iconColor, vertical } = props;
  const iconWrapper = classNames({
    [classes.iconWrapper]: true,
    [classes[iconColor]]: true,
    [classes.iconWrapperVertical]: vertical
  });
  const iconClasses = classNames({
    [classes.icon]: true,
    [classes.iconVertical]: vertical
  });
  return (
    <div className={classes.infoArea}>
      <div className={iconWrapper}>
        <props.icon className={iconClasses} />
      </div>
      <div className={classes.descriptionWrapper}>
        <h4 className={classes.title}>{title}</h4>
        <p className={classes.description}>{description}</p>
      </div>
    </div>
  );
};
InfoArea.defaultProps = {
  iconColor: "gray"
};
export default InfoArea;
