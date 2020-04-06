import React, { useContext } from "react";

import * as yup from "yup";
// core components
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import Card from "../../components/Card/Card";
import CardBody from "../../components/Card/CardBody";
import CardHeader from "../../components/Card/CardHeader";
import CardFooter from "../../components/Card/CardFooter";

import signupPageStyle from "../../assets/jss/material-kit-react/views/loginPage";
import image from "../../assets/img/bg7.jpg";
import { Formik, Form } from "formik";
import {
  useLoginMutation,
  RegisterMutationVariables,
  useRegisterMutation
} from "../../generated/graphql";
import { Typography, Button } from "@material-ui/core";
import TokenContext from "../../Contexts/TokenContext";
import { useHistory } from "react-router-dom";
import CustomFieldInput from "../../components/CustomInput/CustomFieldInput";

const validationSchema: yup.ObjectSchema<RegisterMutationVariables> = yup.object(
  {
    name: yup
      .string()
      .required()
      .min(2),
    email: yup
      .string()
      .email()
      .required(),
    password: yup
      .string()
      .required()
      .min(6)
  }
);

const RegisterPage: React.FC = () => {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  const initialValues: RegisterMutationVariables & { errormessage: string } = {
    name: "",
    email: "",
    password: "",
    errormessage: ""
  };
  const [Register] = useRegisterMutation();
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
                      const response = await Register({ variables: values });

                      if (response.errors) {
                        setErrors({ errormessage: response.errors.join(", ") });
                        setSubmitting(false);
                      } else if (response.data) {
                        const resp = await Login({ variables: values });
                        if (resp.data) {
                          SetAccessToken(resp.data.login.accessToken);
                        }
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
                          name="name"
                          textFieldProps={{ label: "Name" }}
                          formControlProps={{
                            fullWidth: true
                          }}
                        />
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

export default RegisterPage;
