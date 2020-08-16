import React from "react";
import {
  Grid,
  Loader,
  Header,
  Segment,
  Icon,
  Item,
  paragraph,
  Button,
} from "semantic-ui-react";
import swal from "sweetalert";
import {
  AutoForm,
  ErrorsField,
  HiddenField,
  NumField,
  SelectField,
  SubmitField,
  TextField,
} from "uniforms-semantic";
import { Meteor } from "meteor/meteor";
import { withTracker, NavLink } from "meteor/react-meteor-data";
import PropTypes from "prop-types";
import SimpleSchema2Bridge from "uniforms-bridge-simple-schema-2";
import { Stuffs } from "../../api/stuff/Stuff";
import { Profile } from "../../api/stuff/Profile";
import { Groups } from "../../api/stuff/Group";

const bridge = new SimpleSchema2Bridge(Groups.schema);

/** Renders the Page for editing a single document. */
class EditGroup extends React.Component {
  /** On successful submit, insert the data. */
  submit(data) {
    const { location, date, _id } = data;
    Groups.collection.update(_id, { $set: { location, date } }, (error) =>
      error
        ? swal("Error", error.message, "error")
        : swal("Success", "Item updated successfully", "success")
    );
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return this.props.ready ? (
      this.renderPage()
    ) : (
      <Loader active>Getting data</Loader>
    );
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  renderPage() {
    return (
      <Grid container centered>
        <Grid.Column>
          <Header as="h2" textAlign="center">
            LinkUP!
          </Header>

          <Item.Group>
            <Item>
              <Item.Image size="medium" src="/images/city.jpg" />

              <Item.Content>
                <Item.Header as="a">{this.props.items.event}</Item.Header>
                <Item.Description></Item.Description>
                <Item.Header as="a">
                  Location: {this.props.items.location}
                </Item.Header>
                <Item.Description></Item.Description>

                <Item.Header as="a">Date: {this.props.items.date}</Item.Header>
                <Item.Description></Item.Description>

                <Item.Header as="a">Time: {this.props.items.time}</Item.Header>
                <Item.Description></Item.Description>
                <Item.Description></Item.Description>
                <Item.Description></Item.Description>
                <Item.Description></Item.Description>
                <Item.Header as="a">
                  This is where you would see who created this wonderful group
                  and a map showing where to meet, but alas, the hackathon was
                  only 24 hours.
                </Item.Header>
              </Item.Content>
            </Item>
          </Item.Group>
          <div>
            <Button as={NavLink} exact to="/ListGroup" basic color="blue">
              Back to All Groups
            </Button>
          </div>
        </Grid.Column>
      </Grid>
    );
  }
}

/*
<Button as={NavLink} exact to="/ListGroup">
            Back
          </Button>
*/

/** Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use. */
EditGroup.propTypes = {
  doc: PropTypes.object,
  items: PropTypes.object,
  PersonItems: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  const iDItems = Meteor.subscribe(Groups.userPublicationName);
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Groups.userPublicationName);
  //const username = Meteor.users.findOne(documentId).username;
  // return Stuffs.collection.find({ owner: username });
  return {
    // items: Groups.collection.find({ _id: documentId }).fetch(),
    items: Groups.collection.findOne(documentId),
    // PersonItems: Profile.collection.find({ owner: username }),
    doc: Groups.collection.findOne(documentId),
    ready: subscription.ready(),
  };
})(EditGroup);
