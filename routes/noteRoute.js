const express = require('express');
const { getAllNotes, getOneNote, addNote, deleteNote, updateNote } = require('../controllers/noteController');// "Object Destructuring" in JavaScript.

const router = express.Router();



router.route('/notes')
    .get(getAllNotes)
    .post(addNote)


router.route('/notes/:noteId')
    .get(getOneNote)
    .put(updateNote)
    .delete(deleteNote)



module.exports = router;