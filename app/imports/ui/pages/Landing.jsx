import React from 'react';
import { Grid, Image } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
        <Grid verticalAlign='middle' textAlign='center' container>

          <Grid.Column width={8}>
            <Image size='medium' circular src="/images/Hack20_Logo.png"/>
          </Grid.Column>

          <Grid.Column width={4}>
            <h1>Welcome.</h1>
            <p>LinkUP! is a space that can connects people who want to join a group to safely protest, advocate for the community and use your voice in support of social movements. </p>
          </Grid.Column>

        </Grid>
    );
  }
}

export default Landing;
