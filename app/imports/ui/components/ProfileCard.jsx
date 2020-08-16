import React from "react";
import { Table, Card, Image, Button, Icon } from "semantic-ui-react";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { YourGroup } from "../../api/stuff/JGroup";

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class ProfileCard extends React.Component {
  render() {
    return (
      <Card fluid style={{ width: 500 }}>
        <Image src="/images/blankUser.png" wrapped ui={false} />
      <Card>
        <Image src="/images/blankUser.png" size="medium" wrapped ui={false} />
        <Card.Content>
          <Card.Header>{this.props.stuff.name}</Card.Header>
          <Card.Meta>{this.props.stuff.pronouns}</Card.Meta>
          <Card.Description>
            Gender: {this.props.stuff.gender} </Card.Description>
            <Card.Description>
            Age: {this.props.stuff.age} </Card.Description>
            <Card.Description>
            Location: {this.props.stuff.location} </Card.Description>
            <Card.Description>
            Bio: {this.props.stuff.bio} </Card.Description>
            <Card.Description>
            Instagram: {this.props.stuff.instagram} </Card.Description>
            <Card.Description>
            Email: {this.props.stuff.email} </Card.Description>
        </Card.Content>
      </Card>
    );
  }
}

/** Require a document to be passed to this component. */
ProfileCard.propTypes = {
  stuff: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(ProfileCard);
