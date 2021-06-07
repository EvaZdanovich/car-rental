import { Box, Grid } from '@chakra-ui/layout'
import React from 'react';
import CarBox from '../components/CarBox';
import NavBar from '../components/NavBar';
import getUserFromSession from '../libs/getUserFromSession';
import withSession from '../libs/session';

export const getServerSideProps = withSession(
  async function ({ req }) {
    return await getUserFromSession(req);
  }
);

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state={cars:[]}
    console.log(this.props.user)
  }
  componentDidMount() {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "/api/getCars", true);
    xhttp.send();
    xhttp.onreadystatechange = () => {
      if (xhttp.readyState == 4) {
        if (xhttp.status == 200) {
          this.setState({cars:JSON.parse(xhttp.responseText)})
        }
      
      }
    };
  }
  render() {
    return (
      <Box>
        <NavBar firstName={this.props.user?.firstName} lastName={this.props.user?.lastName}isLoggedIn={this.props.user?true:false}/>
    <Grid gridTemplateColumns="repeat(auto-fill,minmax(240px,1fr))">
        {this.state.cars.map(value => (
          <CarBox key={value.id} car={value} />
      
        ))}
    </Grid>
    </Box>)
  }
}
