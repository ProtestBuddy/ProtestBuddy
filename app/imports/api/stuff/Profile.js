import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";
import { Tracker } from "meteor/tracker";

/** Encapsulates state and variable values for this collection. */
class ProfilesCollection {
  constructor() {
    // The name of this collection.
    this.name = "ProfilesCollection";
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema(
      {
        owner: String,
        name: String,
        pronouns: String,
        gender: String,
        age: Number,
        location: String,
        bio: String,
        instagram: String,
        email: String,
      },
      { tracker: Tracker }
    );
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

// test
export const Profile = new ProfilesCollection();
