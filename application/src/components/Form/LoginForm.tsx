import React from "react";
import { Formik, Form, FormikHelpers } from "formik";
import * as yup from "yup";
import { LoginMutationVariables } from "../../generated/graphql";
import CustomInput from "../CustomInput/CustomInput";
import { InputAdornment } from "@material-ui/core";
import { Email } from "@material-ui/icons";
import Icon from "@material-ui/core/Icon";

const validationSchema: yup.ObjectSchema<LoginMutationVariables> = yup.object({
  email: yup
    .string()
    .email()
    .required(),
  password: yup.string().required()
});

interface Props {
  handleSubmit: (
    values: LoginMutationVariables,
    action: FormikHelpers<LoginMutationVariables>
  ) => void;
  inputIconsColorClass?: string;
}

const CustomForm: React.FC<Props> = ({
  handleSubmit,
  inputIconsColorClass
}) => {
  const initialValues: LoginMutationVariables = { email: "", password: "" };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
      render={({}) => <Form></Form>}
    />
  );
};

export default CustomForm;
