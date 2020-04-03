import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import FormControl, { FormControlProps } from "@material-ui/core/FormControl";
import InputLabel, { InputLabelProps } from "@material-ui/core/InputLabel";
import Input, { InputProps } from "@material-ui/core/Input";

import customInputStyle from "../../assets/jss/material-kit-react/components/customInputStyle";

import { useField, FieldAttributes } from "formik";

interface Props {
  labelText?: React.ReactNode;
  labelProps?: InputLabelProps;
  id?: string;
  inputProps?: InputProps;
  formControlProps?: FormControlProps;
  inputRootCustomClasses?: any;
  error?: boolean;
  success?: boolean;
  white?: boolean;
}
const CustomInput: React.FC<Props & FieldAttributes<{}>> = props => {
  const classes = customInputStyle();
  const {
    formControlProps,
    labelText,
    id,
    labelProps,
    inputProps,
    error,
    white,
    inputRootCustomClasses,
    success,
    ...rest
  } = props;
  const [field] = useField(rest);

  const labelClasses = classNames({
    [" " + classes.labelRootError]: error,
    [" " + classes.labelRootSuccess]: success && !error
  });
  const underlineClasses = classNames({
    [classes.underlineError]: error,
    [classes.underlineSuccess]: success && !error,
    [classes.underline]: true,
    [classes.whiteUnderline]: white
  });
  const marginTop = classNames({
    [inputRootCustomClasses]: inputRootCustomClasses !== undefined
  });
  const inputClasses = classNames({
    [classes.input]: true,
    [classes.whiteInput]: white
  });
  var formControlClasses;
  if (formControlProps !== undefined) {
    formControlClasses = classNames(
      formControlProps.className,
      classes.formControl
    );
  } else {
    formControlClasses = classes.formControl;
  }
  return (
    <FormControl {...formControlProps} className={formControlClasses}>
      {labelText !== undefined ? (
        <InputLabel
          className={classes.labelRoot + " " + labelClasses}
          htmlFor={id}
          {...labelProps}
        >
          {labelText}
        </InputLabel>
      ) : null}
      <Input
        {...field}
        classes={{
          input: inputClasses,
          root: marginTop,
          disabled: classes.disabled,
          underline: underlineClasses
        }}
        id={id}
        {...inputProps}
      />
    </FormControl>
  );
};
export default CustomInput;
