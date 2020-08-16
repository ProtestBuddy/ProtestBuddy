import React from "react";
import { Meteor } from "meteor/meteor";
import {
  Container,
  Table,
  Header,
  Loader,
  Card,
  Image,
  Icon,
} from "semantic-ui-react";
import { withTracker } from "meteor/react-meteor-data";
import PropTypes from "prop-types";
import { Stuffs } from "../../api/stuff/Stuff";
import StuffItem from "../components/StuffItem";
import { Profile } from "../../api/stuff/Profile";
import ProfileItems from "../components/ProfileItems";
import ProfileCard from "../components/ProfileCard";

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListProfile extends React.Component {
  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return this.props.ready ? (
      this.renderPage()
    ) : (
      <Loader active>Getting data</Loader>
    );
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
      <Container>
        <Header as="h2" textAlign="center">
          Your Profile:
        </Header>

        <Container>
          <Card.Group>
            {this.props.stuffs.map((stuff) => (
              <ProfileCard key={stuff._id} stuff={stuff} />
            ))}
          </Card.Group>
        </Container>
      </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
ListProfile.propTypes = {
  stuffs: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Profile.userPublicationName);
  return {
    stuffs: Profile.collection.find({}).fetch(),
    ready: subscription.ready(),
  };
})(ListProfile);
