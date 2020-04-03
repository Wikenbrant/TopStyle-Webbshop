import React, { useContext } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";

import * as yup from "yup";
// core components
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import Card from "../../components/Card/Card";
import CardBody from "../../components/Card/CardBody";
import CardHeader from "../../components/Card/CardHeader";
import CardFooter from "../../components/Card/CardFooter";
import CustomInput from "../../components/CustomInput/CustomInput";

import signupPageStyle from "../../assets/jss/material-kit-react/views/loginPage";
import LoginForm from "../../components/Form/LoginForm";
import image from "../../assets/img/bg7.jpg";
import {
  Formik,
  Form,
  FormikProps,
  Field,
  FieldAttributes,
  useField
} from "formik";
import {
  LoginMutationVariables,
  useLoginMutation
} from "../../generated/graphql";
import { Typography, TextField, FormControl, Button } from "@material-ui/core";
import { FormControlProps } from "@material-ui/core/FormControl";
import { TextFieldProps } from "@material-ui/core/TextField";
import TokenContext from "../../Contexts/TokenContext";
import { useHistory } from "react-router-dom";

const validationSchema: yup.ObjectSchema<LoginMutationVariables> = yup.object({
  email: yup
    .string()
    .email()
    .required(),
  password: yup.string().required()
});

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

const LoginPage: React.FC = () => {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  const initialValues: LoginMutationVariables & { errormessage: string } = {
    email: "",
    password: "",
    errormessage: ""
  };
  const [Login] = useLoginMutation();
  const history = useHistory();
  const { SetAccessToken } = useContext(TokenContext);

  setTimeout(function() {
    setCardAnimation("");
  }, 700);
  const classes = signupPageStyle();
  return (
    <div>
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center"
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <Card className={classes[cardAnimaton]}>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={async (
                    values,
                    { setSubmitting, setErrors, resetForm }
                  ) => {
                    setSubmitting(true);
                    try {
                      const response = await Login({ variables: values });

                      if (response.errors) {
                        setErrors({ errormessage: response.errors.join(", ") });
                        setSubmitting(false);
                      } else if (response.data) {
                        SetAccessToken(response.data.login.accessToken);
                        resetForm();
                        setSubmitting(false);
                        history.push("/");
                      }
                    } catch (error) {
                      setErrors({ errormessage: "Invalid logininformation" });
                      setSubmitting(false);
                    }
                  }}
                  render={({ values, errors, isSubmitting }) => (
                    <Form className={classes.form}>
                      <CardHeader
                        color="primary"
                        className={classes.cardHeader}
                      >
                        <h4>Login</h4>
                      </CardHeader>
                      <CardBody>
                        <Typography paragraph color="error">
                          {errors.errormessage ?? null}
                        </Typography>
                        <CustomFieldInput
                          name="email"
                          textFieldProps={{ label: "Email...", type: "email" }}
                          formControlProps={{
                            fullWidth: true
                          }}
                        />
                        <CustomFieldInput
                          name="password"
                          textFieldProps={{
                            label: "Password",
                            type: "password",
                            autoComplete: "off"
                          }}
                          formControlProps={{
                            fullWidth: true
                          }}
                        />
                      </CardBody>
                      <CardFooter className={classes.cardFooter}>
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          color="primary"
                          size="large"
                        >
                          Log in
                        </Button>
                      </CardFooter>
                    </Form>
                  )}
                />
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
