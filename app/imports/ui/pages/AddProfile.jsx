import React from "react";
import { Grid, Segment, Header } from "semantic-ui-react";
import {
  AutoForm,
  ErrorsField,
  NumField,
  SelectField,
  SubmitField,
  TextField,
} from "uniforms-semantic";
import swal from "sweetalert";
import { Meteor } from "meteor/meteor";
import SimpleSchema2Bridge from "uniforms-bridge-simple-schema-2";
import SimpleSchema from "simpl-schema";
import { Stuffs } from "../../api/stuff/Stuff";
import { Profile } from "../../api/stuff/Profile";

/** Create a schema to specify the structure of the data to appear in the form. */
const formSchema = new SimpleSchema({
  name: String,
  pronouns: String,
  gender: String,
  age: Number,
  location: String,
  bio: String,
  instagram: String,
  email: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class AddProfile extends React.Component {
  /** On submit, insert the data. */
  submit(data, formRef) {
    const {
      name,
      pronouns,
      gender,
      age,
      location,
      bio,
      instagram,
      email,
    } = data;
    const owner = Meteor.user().username;
    Profile.collection.insert(
      { name, pronouns, gender, age, location, bio, instagram, email, owner },
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
            Create a Profile!
          </Header>
          <AutoForm
            ref={(ref) => {
              fRef = ref;
            }}
            schema={bridge}
            onSubmit={(data) => this.submit(data, fRef)}
          >
            <Segment>
              <TextField name="name" />
              <TextField name="pronouns" />
              <TextField name="gender" />
              <NumField name="age" decimal={false} />
              <TextField name="location" />
              <TextField name="bio" />
              <TextField name="instagram" />
              <TextField name="email" />
              <SubmitField value="Submit" />
              <ErrorsField />
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

export default AddProfile;
