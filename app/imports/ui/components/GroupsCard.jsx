import React from "react";
import { Table, Card, Image, Button } from "semantic-ui-react";
import PropTypes from "prop-types";
import { withRouter, Link, NavLink } from "react-router-dom";
import { YourGroup } from "../../api/stuff/JGroup";

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class GroupData extends React.Component {
  render() {
    return (
      <Card>
        <Card.Content>
          <Image floated="right" size="tiny" src="\images\earth.png" />
          <Card.Header>{this.props.stuff.location}</Card.Header>
          <Card.Meta>{this.props.stuff.date}</Card.Meta>
          <Card.Meta> {this.props.stuff.time}</Card.Meta>

          <Card.Description>{this.props.stuff._id}</Card.Description>
          <Card.Description>
            <Link to={`/edit-group/${this.props.stuff._id}`}>Edit</Link>
            {this.props.stuff.owner}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div className="ui two buttons">
            <Button
              as={NavLink}
              exact
              to={`/edit-group/${this.props.stuff._id}`}
              basic
              color="blue"
            >
              LinkUP!
            </Button>
          </div>
        </Card.Content>
      </Card>
    );
  }
}

/** Require a document to be passed to this component. */
GroupData.propTypes = {
  stuff: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(GroupData);
