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
import { LoginMutationVariables } from "../../generated/graphql";
import { Typography, Button } from "@material-ui/core";
import { useHistory } from "react-router";
import CustomFieldInput from "../../components/CustomInput/CustomFieldInput";
import UserContext from "../../Contexts/UserContext";

const validationSchema: yup.ObjectSchema<LoginMutationVariables> = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const LoginPage: React.FC = () => {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  const initialValues: LoginMutationVariables & { errormessage: string } = {
    email: "",
    password: "",
    errormessage: "",
  };
  const { LogIn, errors } = useContext(UserContext);
  const history = useHistory();

  setTimeout(function () {
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
          backgroundPosition: "top center",
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
                    if (
                      await LogIn({
                        email: values.email,
                        password: values.password,
                      })
                    ) {
                      resetForm();
                      setSubmitting(false);
                      history.push("/");
                    }
                    if (errors) {
                      setErrors({ errormessage: errors });
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
                            fullWidth: true,
                          }}
                        />
                        <CustomFieldInput
                          name="password"
                          textFieldProps={{
                            label: "Password",
                            type: "password",
                            autoComplete: "off",
                          }}
                          formControlProps={{
                            fullWidth: true,
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
