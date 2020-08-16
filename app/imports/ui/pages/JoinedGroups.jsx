import React from "react";
import { Meteor } from "meteor/meteor";
import {
  Container,
  Table,
  Header,
  Loader,
  Card,
  Form,
} from "semantic-ui-react";
import { withTracker } from "meteor/react-meteor-data";
import PropTypes from "prop-types";
import { Stuffs } from "../../api/stuff/Stuff";
import { Groups } from "../../api/stuff/Group";
import StuffItem from "../components/StuffItem";
import GroupData from "../components/GroupData";
import GroupsCard from "../components/GroupsCard";
import { YourGroup } from "../../api/stuff/JGroup";

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class JoinedGroups extends React.Component {
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
        Your Joined Groups
        <Card.Group>
          {this.props.stuffs.map((stuff) => (
            <GroupsCard key={stuff._id} stuff={stuff} />
          ))}
        </Card.Group>
      </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
JoinedGroups.propTypes = {
  stuffs: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};
//db1: Section1DB.find({}).fetch(),
/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(YourGroup.userPublicationName);
  return {
    stuffs: YourGroup.collection.find({}).fetch(),
    ready: subscription.ready(),
  };
})(JoinedGroups);
