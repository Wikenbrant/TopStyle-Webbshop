import React from "react";
import TextField, { TextFieldProps } from "@material-ui/core/TextField";
import FormControl, { FormControlProps } from "@material-ui/core/FormControl";
import { FieldAttributes, useField } from "formik";

const CustomFieldInput: React.FC<{
  textFieldProps: TextFieldProps;
  formControlProps: FormControlProps;
} & FieldAttributes<{}>> = ({ textFieldProps, formControlProps, ...props }) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    <FormControl {...formControlProps}>
      <TextField
        {...field}
        {...textFieldProps}
        placeholder={props.placeholder}
        helperText={errorText}
        error={!!errorText}
      />
    </FormControl>
  );
};

export default CustomFieldInput;
