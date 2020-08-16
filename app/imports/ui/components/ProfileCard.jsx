import React from "react";
import { Table, Card, Image, Button, Icon } from "semantic-ui-react";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { YourGroup } from "../../api/stuff/JGroup";

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class ProfileCard extends React.Component {
  render() {
    return (
      <Card fluid style={{ width: 500, height: 600 }}>
        <Image src="/images/blankUser.png" wrapped ui={false} />
        <Card.Content>
          <Card.Header>{this.props.stuff.name}</Card.Header>
          <Card.Meta>{this.props.stuff.pronouns}</Card.Meta>
          <Card.Description>
            Pronouns : {this.props.stuff.pronouns}
            {this.props.stuff.gender}
            {this.props.stuff.age}
            {this.props.stuff.location}
            {this.props.stuff.bio}
            {this.props.stuff.instagram}
            {this.props.stuff.email}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <a>
            <Icon name="user" />
            10 Friends
          </a>
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
