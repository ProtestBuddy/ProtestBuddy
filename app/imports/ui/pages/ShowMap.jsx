import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Table, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Stuffs } from '../../api/stuff/Stuff';
import { Groups } from '../../api/stuff/Group';
import { Profile } from '../../api/stuff/Profile';
import StuffItem from '../components/StuffItem';
import GroupData from '../components/GroupData';
"use strict";

var markers_arr = [];
let map;
function initMap() {
  var UW = {lat: 47.654259, lng: -122.307880};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 5,
    center: UW
  });

  google.maps.event.addListener(map, 'click', function(event) {
    addMarker(event.latLng, map);
  });
}

function addMarker(location, map) {
  if (this.userId) {
    for (i = 0; i < markers_arr.length; i++) {
      // if the label of the i-th marker equals the name of any user in the group of the current user
      if (markers_arr[i].getLabel() == Meteor.users.findOne(this.userId).name) {
        markers_arr[i].setMap(null);
      }
    }
    var marker = new google.maps.Marker({
      position: location,
      label: Meteor.users.findOne(this.userId).name,
      map: map,
      draggable: true
    });
    markers_arr.push(marker);
  }
}

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ShowMap extends React.Component {
  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container>
          <Header as="h2" textAlign="center">Map</Header>
            initMap();
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
ShowMap.propTypes = {
  map: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Groups.userPublicationName);
  return {
    stuffs: Groups.collection.find({}).fetch(),
    ready: subscription.ready(),
  };
})(ShowMap);