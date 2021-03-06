import { Box, Text } from "@chakra-ui/layout";
import React, { Component } from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import validateLength, {
  validateEmail,
  validatePassword,
} from "../libs/validateLength";
class AddEmployee extends Component {
  constructor(props) {
    super(props);
    this.state = { information: "" };
  }

  render() {
    return (
      <Box
        maxWidth={["full", "80%", "50%"]}
        marginX={["5", "auto"]}
        marginY="5"
        display="block"
        rounded="lg"
        boxShadow="md"
        p="6"
        rounded="md"
      >
        <Text textAlign="center" fontWeight="bold">
          Dodaj pracownika
        </Text>
        <Box>
          <Formik
            initialValues={{
              password: "",
              firstName: "",
              lastName: "",
              pesel: "",
              adres: "",
              zipCode: "",
              telefon: "",
              mail: "",
              department: "",
            }}
            onSubmit={(values, actions) => {
              this.setState({ information: "" });
              const xhttp = new XMLHttpRequest();
              xhttp.open("POST", "/api/admin/register", true);
              xhttp.send(JSON.stringify(values));
              xhttp.onreadystatechange = () => {
                if (xhttp.readyState == 4) {
                  if (xhttp.status == 200) {
                    //   this.setState({cars:JSON.parse(xhttp.responseText)})
                    // console.log("OK");
                    this.setState({ information: "Dodano pracownika" });
                  }
                  actions.setSubmitting(false);
                }
              };
            }}
          >
            {(props) => (
              <Form>
                <Field name="mail" validate={validateEmail}>
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.mail && form.touchedemail}
                    >
                      <FormLabel htmlFor="mail">Email</FormLabel>
                      <Input {...field} id="mail" placeholder="Podaj Email" />
                      <FormErrorMessage>{form.errors.mail}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="password" validate={validatePassword}>
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.password && form.touched.password}
                    >
                      <FormLabel htmlFor="password">Has??o</FormLabel>
                      <Input
                        {...field}
                        type="password"
                        id="password"
                        placeholder="Podaj Has??o"
                      />
                      <FormErrorMessage>
                        {form.errors.password}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Field name="firstName" validate={validateLength}>
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={
                        form.errors.firstName && form.touched.firstName
                      }
                    >
                      <FormLabel htmlFor="firstName">Imie</FormLabel>
                      <Input
                        {...field}
                        id="firstName"
                        placeholder="Podaj Imi??"
                      />
                      <FormErrorMessage>
                        {form.errors.firstName}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="lastName" validate={validateLength}>
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.lastName && form.touched.lastName}
                    >
                      <FormLabel htmlFor="lastName">Nazwisko</FormLabel>
                      <Input
                        {...field}
                        id="lastName"
                        placeholder="Podaj Nazwisko"
                      />
                      <FormErrorMessage>
                        {form.errors.lastName}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Field name="pesel" validate={validateLength}>
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.pesel && form.touched.pesel}
                    >
                      <FormLabel htmlFor="pesel">Pesel</FormLabel>
                      <Input
                        type="number"
                        {...field}
                        id="pesel"
                        placeholder="Podaj Pesel"
                      />
                      <FormErrorMessage>{form.errors.pesel}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Field name="adres" validate={validateLength}>
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.adres && form.touched.adres}
                    >
                      <FormLabel htmlFor="adres">Adres</FormLabel>
                      <Input {...field} id="adres" placeholder="Podaj Adres" />
                      <FormErrorMessage>{form.errors.adres}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Field name="zipCode" validate={validateLength}>
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.zipCode && form.touched.zipCode}
                    >
                      <FormLabel htmlFor="zipCode">Kod Pocztowy</FormLabel>
                      <Input
                        {...field}
                        type="number"
                        id="zipCode"
                        placeholder="Podaj Kod Pocztowy"
                      />
                      <FormErrorMessage>{form.errors.zipCode}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Field name="telefon" validate={validateLength}>
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.telefon && form.touched.telefon}
                    >
                      <FormLabel htmlFor="telefon">Numer telefonu</FormLabel>
                      <Input
                        {...field}
                        id="telefon"
                        placeholder="Podaj Numer Telefonu"
                      />
                      <FormErrorMessage>{form.errors.telefon}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Field name="department" validate={validateLength}>
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={
                        form.errors.department && form.touched.department
                      }
                    >
                      <FormLabel htmlFor="department">Dzia??</FormLabel>
                      <Input
                        {...field}
                        id="department"
                        placeholder="Podaj Dzia??"
                      />
                      <FormErrorMessage>
                        {form.errors.department}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Button
                  mt={4}
                  colorScheme="teal"
                  isLoading={props.isSubmitting}
                  type="submit"
                >
                  Dodaj
                </Button>
                <Text>{this.state.information}</Text>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    );
  }
}

export default AddEmployee;
