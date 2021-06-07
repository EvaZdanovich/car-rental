import { Box, Text } from '@chakra-ui/layout'
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Button
  } from "@chakra-ui/react"
import { Field, Form, Formik } from 'formik'
import Router from 'next/router';
import { useState } from 'react';

// export const getServerSideProps = withSession(
//   async function ({ req }) {
//     return await getCars(req);
//   }
// );

export default function Home(props) {
  const [error, seterror] = useState("");
  
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
      <Formik
      initialValues={{ email: "",password:"" }}
      onSubmit={(values, actions) => {
          
        const xhttp = new XMLHttpRequest();
        xhttp.open("POST", "/api/login", true);
        xhttp.send(JSON.stringify(values));
        xhttp.onreadystatechange = () => {
          if (xhttp.readyState == 4) {
            if (xhttp.status == 200) {
              console.log("zalogowano")
              console.log(xhttp.responseText)
              // Router.push('/error', '/');
              Router.push("/")
            } else  {
              seterror("Złe dane logowania")
            }
          actions.setSubmitting(false)
          }
        };
      }}
    >
      {(props) => (
        <Form>
          <Field name="email">
            {({ field, form }) => (
              <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input {...field} id="email" placeholder="Podaj Email" />
                <FormErrorMessage>{form.errors.email}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="password">
            {({ field, form }) => (
              <FormControl>
                <FormLabel htmlFor="password">Hasło</FormLabel>
                <Input {...field} type="password"id="password" placeholder="Podaj Hasło" />
                <FormErrorMessage>{form.errors.password}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          
          <Button
            mt={4}
            colorScheme="teal"
            isLoading={props.isSubmitting}
            type="submit"
          >
            Zaloguj
          </Button>
          <Button
            mt={4}
            colorScheme="red"
            type="submit"
            ml={4}
            onClick={()=>{Router.push("/register")}}
          >
            Zarejestruj
          </Button>
            {error !== "" ? <Text color="red">{error}</Text>:null}
        </Form>
      )}
    </Formik>
   </Box>
  )
}
