// NOTE: models/note.model.js
import mongoose from "mongoose";

// NOTE: The Schema we have created. which is a text variable that's of string type.
const noteSchema = new mongoose.Schema({ text: String });

const Note = mongoose.model("Note", noteSchema);
export default Note;

// .find() grabs the entire collection, some filter methods can be used.
// Note.find({ text: "hello" }) specifies data named text field with "hello" string in it
// Provider.find().select("name price averageRating") returns only 3 fields of a collection.
