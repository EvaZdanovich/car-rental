import { Box, Text } from "@chakra-ui/layout";
import React, { Component } from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
  Select,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import validateLength, {
  validateEmail,
  validatePassword,
} from "../libs/validateLength";
import { CarType } from ".prisma/client";
class AddCar extends Component {
  constructor(props) {
    super(props);
    this.loadCar = this.props.loadCar;
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
          Dodaj pojazd
        </Text>
        <Box>
          <Formik
            initialValues={{
              typeCar: "",
              fuel: "",
              brand: "",
              model: "",
              engine: 0,
              year: 0,
              mileage: 0,
              color: "",
              image: "",
            }}
            onSubmit={(values, actions) => {
              this.setState({ information: "" });

              const fReader = new FileReader();
              const loadCar = this.props.loadCar;
              fReader.readAsDataURL(values.image);
              fReader.onloadend = function (event) {
                if (typeof event.target?.result === "string") {
                  const payload = event.target.result.replace(/^.+base64,/, "");
                  const formData = new FormData();

                  formData.append("image", payload);
                  const xhr = new XMLHttpRequest();
                  // xhr.withCredentials = true;

                  xhr.addEventListener("readystatechange", function () {
                    if (this.readyState === 4) {
                      const response = JSON.parse(this.responseText);
                      if (response.status == 200 && response.success == true) {
                        values.image = response.data.url;
                        //   bound(xhttp);
                        // this.loadCar();
                        loadCar();
                        const xhttp = new XMLHttpRequest();
                        xhttp.open("POST", "/api/employee/addCar", true);
                        xhttp.send(JSON.stringify(values));
                        xhttp.onreadystatechange = () => {
                          if (xhttp.readyState == 4) {
                            if (xhttp.status == 200) {
                              //   this.setState({cars:JSON.parse(xhttp.responseText)})
                              // this.setState({ information: "Dodano pojazd" });
                            }
                            actions.setSubmitting(false);
                          }
                        };
                      }
                      //  values.image=;
                    }
                  });

                  xhr.open(
                    "POST",
                    "https://api.imgbb.com/1/upload?expiration=0&key=556ae26dd60bfd451a3aff42b7c7a93e"
                  );
                  xhr.send(formData);
                }
                return;
              };
            }}
          >
            {(props) => (
              <Form>
                <Field name="typeCar">
                  {({ field, form }) => (
                    <FormControl>
                      <FormLabel htmlFor="typeCar">Rodzaj</FormLabel>
                      <Select
                        {...field}
                        id="typeCar"
                        placeholder="Podaj rodzaj"
                      >
                        {["Sedan", "SUV", "Hatchback", "Coupe", "Kombi"].map(
                          (element) => (
                            <option key={element} value={element}>
                              {element}
                            </option>
                          )
                        )}
                      </Select>
                      <FormErrorMessage>{form.errors.typeCar}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="fuel">
                  {({ field, form }) => (
                    <FormControl>
                      <FormLabel htmlFor="fuel">Rodzaj paliwa</FormLabel>
                      <Select {...field} id="fuel" placeholder="Podaj rodzaj">
                        {[
                          "LPG",
                          "Benzyna",
                          "Diesel",
                          "Hybryda",
                          "Elektryczny",
                        ].map((element) => (
                          <option key={element} value={element}>
                            {element}
                          </option>
                        ))}
                      </Select>
                      <FormErrorMessage>{form.errors.fuel}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="brand" validate={validateLength}>
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.brand && form.touched.brand}
                    >
                      <FormLabel htmlFor="brand">Marka</FormLabel>
                      <Input {...field} id="brand" placeholder="Podaj Markę" />
                      <FormErrorMessage>{form.errors.brand}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="model" validate={validateLength}>
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.model && form.touched.model}
                    >
                      <FormLabel htmlFor="model">Model</FormLabel>
                      <Input {...field} id="model" placeholder="Podaj Model" />
                      <FormErrorMessage>{form.errors.model}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="engine" validate={validateLength}>
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.engine && form.touched.engine}
                    >
                      <FormLabel htmlFor="engine">Pojemność silnika</FormLabel>
                      <Input
                        {...field}
                        type="number"
                        id="engine"
                        placeholder="Podaj Pojemność silnika"
                      />
                      <FormErrorMessage>{form.errors.engine}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="year" validate={validateLength}>
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.year && form.touched.year}
                    >
                      <FormLabel htmlFor="year">Rok produkcji</FormLabel>
                      <Input
                        {...field}
                        id="year"
                        type="number"
                        step="1"
                        placeholder="Podaj Rok produkcji"
                      />
                      <FormErrorMessage>{form.errors.year}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Field name="mileage" validate={validateLength}>
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.mileage && form.touched.mileage}
                    >
                      <FormLabel htmlFor="mileage">Przebieg</FormLabel>
                      <Input
                        {...field}
                        id="mileage"
                        type="number"
                        placeholder="Podaj Przebieg"
                      />
                      <FormErrorMessage>{form.errors.mileage}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="color" validate={validateLength}>
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.color && form.touched.color}
                    >
                      <FormLabel htmlFor="color">Kolor</FormLabel>
                      <Input {...field} id="color" placeholder="Podaj Kolor" />
                      <FormErrorMessage>{form.errors.color}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <input
                  id="image"
                  name="image"
                  type="file"
                  onChange={(event) => {
                    if (event.currentTarget.files) {
                      props.setFieldValue(
                        "image",
                        event.currentTarget.files[0]
                      );
                    }
                  }}
                />

                <Button
                  mt={4}
                  colorScheme="teal"
                  isLoading={props.isSubmitting}
                  type="submit"
                >
                  Dodaj
                </Button>
                <Text>{this.state.informationn}</Text>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    );
  }
}

export default AddCar;
