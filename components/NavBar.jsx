import { Img } from "@chakra-ui/image";
import { Flex, Text } from "@chakra-ui/layout";
import { Box } from "@chakra-ui/layout";
import React, { Component } from "react";
import Router from "next/router";
import { Button } from "@chakra-ui/button";

class NavBar extends Component {
  render() {
    return (
      <header style={{ zIndex: 10, position: "sticky", top: "0" }}>
        <Flex
          flexDir="row"
          // maxH="40px"
          padding="5px"
          background="gray.200"
          boxShadow="md"
          // background={isLight() ? "gray.50" : "gray.900"}
          transition="background-color 0.2s ease 0s"
          alignItems="center"
        >
          <div
            style={{ display: "inherit", cursor: "pointer" }}
            onClick={() => {
              Router.push(this.props.mainSite ? this.props.mainSite : "/");
            }}
          >
            <Img
              src="https://i.ibb.co/PYfghSK/logo.png"
              width="100px"
              height="inherit"
              padding="5px"
            />
          </div>

          {this.props.isLoggedIn ? (
            <>
              {this.props.firstName && this.props.lastName ? (
                <Text padding="2">{`${this.props.firstName} ${this.props.lastName}`}</Text>
              ) : null}
              <Button
                onClick={() => {
                  Router.push(
                    this.props.logoutRoute
                      ? this.props.logoutRoute
                      : "/api/logout"
                  );
                }}
              >
                Wyloguj
              </Button>
            </>
          ) : (
            <Button
              onClick={() => {
                Router.push(
                  this.props.loginRoute ? this.props.loginRoute : "/login"
                );
              }}
            >
              Zaloguj
            </Button>
          )}
        </Flex>
      </header>
    );
  }
}

export default NavBar;
