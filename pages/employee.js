import { Box, Grid } from '@chakra-ui/layout'

import React from 'react';
import AddCar from '../components/addCar';
import CarBox from '../components/CarBox';
import NavBar from '../components/NavBar';
import getEmployeeFromSession from '../libs/getEmployeeFromSession';
import withSession from '../libs/session';
import Router from 'next/router';
import AddEmployee from '../components/addEmployee';

export const getServerSideProps = withSession(
  async function ({ req }) {
    return await getEmployeeFromSession(req);
  }
);

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state={cars:[]}
    console.log(this.props.employee)
  }
  
  loadCar() {
    
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "/api/getCars", true);
    xhttp.send();
    xhttp.onreadystatechange = () => {
      if (xhttp.readyState == 4) {
        if (xhttp.status == 200) {
          
          this.setState({cars:JSON.parse(xhttp.responseText)})
          console.log(xhttp.responseText)

        }
      
      }
    };
  }
  
  componentDidMount() {
    if(this.props.employee)
    this.loadCar()
  }
  render() {

    return (<Box>
             <NavBar  firstName={this.props.employee?.firstName} lastName={this.props.employee?.lastName} isLoggedIn={this.props.employee?true:false} mainSite="/employee" loginRoute="/employee/login" />
             
             {this.props.employee?.isAdmin?<AddEmployee/>:null}
             
             {this.props.employee? <> <AddCar loadCar={this.loadCar.bind(this) }/>
             <Grid gridTemplateColumns="repeat(auto-fill,minmax(240px,1fr))">
        {this.state.cars.map(value => (
          <CarBox isEmployee={true} key={value.id} car={value} />
      
        ))}
    </Grid>
    </>
    :null}
             
          
            </Box>)
  }
}
