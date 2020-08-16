import React from "react";
import { Grid, Segment, Header } from "semantic-ui-react";
import {
  AutoForm,
  ErrorsField,
  NumField,
  SelectField,
  SubmitField,
  DateField,
  BoolField,
  TextField,
} from "uniforms-semantic";
import swal from "sweetalert";
import { Meteor } from "meteor/meteor";
import SimpleSchema2Bridge from "uniforms-bridge-simple-schema-2";
import SimpleSchema from "simpl-schema";
import { Stuffs } from "../../api/stuff/Stuff";
import { Groups } from "../../api/stuff/Group";

/** Create a schema to specify the structure of the data to appear in the form. */
const formSchema = new SimpleSchema({
  location: String,
  date: String,
  event: String,
  description: String,
  time: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class CreateGroup extends React.Component {
  /** On submit, insert the data. */
  submit(data, formRef) {
    const { location, date, event, description, time } = data;
    const owner = Meteor.user().username;
    Groups.collection.insert(
      { location, date, event, description, time, owner },
      (error) => {
        if (error) {
          swal("Error", error.message, "error");
        } else {
          swal("Success", "Item added successfully", "success");
          formRef.reset();
        }
      }
    );
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    let fRef = null;
    return (
      <Grid container centered>
        <Grid.Column>
          <Header as="h2" textAlign="center">
            Create a Group!
          </Header>
          <AutoForm
            ref={(ref) => {
              fRef = ref;
            }}
            schema={bridge}
            onSubmit={(data) => this.submit(data, fRef)}
          >
            <Segment>
              <TextField name="event" />
              <TextField name="location" />
              <TextField name="date" placeholder={"mm/dd/yyyy"} />
              <TextField name="description" />
              <TextField name="time" />
              <SubmitField value="Submit" />
              <ErrorsField />
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

export default CreateGroup;
