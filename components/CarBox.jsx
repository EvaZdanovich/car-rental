import { Button } from "@chakra-ui/button";
import { Img } from "@chakra-ui/image";
import { Box } from "@chakra-ui/layout";
import React, { Component } from "react";

class CarBox extends Component {
  constructor(props) {
    super(props);
    this.state = { shouldRender: true };
  }

  render() {
    if (!this.state.shouldRender) return "";
    return (
      <Box
        margin="2"
        display="block"
        boxShadow="md"
        p="6"
        rounded="md"
        maxW="300px"
      >
        {this.props.car.image ? (
          <Img
            background="white"
            boxShadow="base"
            rounded="md"
            h="200px"
            objectFit="cover"
            src={this.props.car.image}
          ></Img>
        ) : (
          <Img
            background="white"
            boxShadow="base"
            rounded="md"
            h="200px"
            objectFit="cover"
            src="https://i.ibb.co/y6JjKt2/logo.png"
          ></Img>
        )}
        <Box>
          {`${this.props.car.brand} ${this.props.car.model}`}
          <br />
          {`Pojemność: ${this.props.car.engine}L`}
          <br />
          {`Rok produkcji: ${this.props.car.year}`}
          <br />
          {`Przebieg: ${this.props.car.mileage}km`} <br />
          {`${this.props.car.fuel}`} <br />
          {`${this.props.car.color}`}
          <br />
          {`${this.props.car.typeCar}`}
        </Box>
        {this.props.isEmployee ? (
          <Box width="100%" display="block" margin="auto">
            <Button
              margin="auto"
              colorScheme="red"
              display="block"
              onClick={() => {
                console.log(this.props.car.id);
                const xhttp = new XMLHttpRequest();
                xhttp.open("POST", "/api/employee/removeCar", true);
                xhttp.send(this.props.car.id);
                xhttp.onreadystatechange = () => {
                  if (xhttp.readyState == 4) {
                    if (xhttp.status == 200) {
                      this.setState({ shouldRender: false });
                      console.log("OK");
                    }
                  }
                };
              }}
            >
              Usuń
            </Button>
          </Box>
        ) : null}
      </Box>
    );
  }
}

export default CarBox;
