const generatorIds = require('../utils/generatorIds');
const { store, getKeys, getValues } = require('../utils/memoryStorage');
const { NoteModel } = require('../models/noteModel');

//@desc     Get all notes
//@route    GET  /api/v1/notes
//@protect  all 
exports.getAllNotes = (req, res, next) => {
    let keys = getKeys(store);
    let values = getValues(store);

    let numOfNotes = values.length
    if (numOfNotes === 0) {
        return res.status(404).json({ message: 'Not Found Notes, add notes and try again.' })
    }

    //  let notes = JSON.stringify(values); // if need to convert to string
    res.status(200).json({ message: 'success', numOfNotes: numOfNotes, data: values });
};

//@desc     Add new note
//@route    POST  /api/v1/notes
//@protect  all 
exports.addNote = (req, res, next) => {
    const { title, content, createdBy } = req.body;
    if (!title || !content || !createdBy) {
        // Create an error object and pass it to the next middleware
        const error = new Error('title, content and createdBy are required');
        error.status = 400; // Set the HTTP status code for the error
        return next(error); // Pass the error to the error handling middleware
    }

    let seqId = generatorIds.generate(); // generate id
    const noteObj = new NoteModel(seqId, title, content, createdBy, new Date()); // create a note

    store.setItem(seqId, noteObj);// save in memory
    res.status(201).json({ message: 'add note successfully.', data: noteObj });
};


//@desc     update a note
//@route    PUT  /api/v1/notes/:noteId
//@protect  all 
exports.updateNote = (req, res, next) => {
    const noteId = req.params.noteId;
    const { title, content, createdBy } = req.body;

    if (!noteId) {
        const error = new Error('noteId is required');
        error.status = 400; // Set the HTTP status code for the error
        return next(error); // Pass the error to the error handling middleware
    }

    if (!title || !content || !createdBy) {
        // Create an error object and pass it to the next middleware
        const error = new Error('title, content and createdBy are required');
        error.status = 400; // Set the HTTP status code for the error
        return next(error); // Pass the error to the error handling middleware
    }

    const values = getValues(store);
    let noteFounded = values.find(value => value.noteId === noteId)

    if (!noteFounded) {
        const error = new Error(`Not found Note with this id: ${noteId}`);
        error.status = 404; // Set the HTTP status code for the error
        return next(error); // Pass the error to the error handling middleware
    }

    // update note data
    noteFounded = new NoteModel(noteId, title, content, createdBy, new Date());

    store.setItem(noteId, noteFounded);// save in memory
    res.status(200).json({ message: 'Update note successfully.', data: noteFounded });
};



//@desc     Delete specific note
//@route    DELETE  /api/v1/notes/:noteId
//@protect  all 
exports.deleteNote = (req, res, next) => {
    const noteId = req.params.noteId;
    if (!noteId) {
        const error = new Error('noteId is required');
        error.status = 400; // Set the HTTP status code for the error
        return next(error); // Pass the error to the error handling middleware 
    }

    const values = getValues(store);
    let noteFounded = values.find(value => value.noteId === noteId)

    if (!noteFounded) {
        const error = new Error(`Not found Note with this id: ${noteId}`);
        error.status = 404; // Set the HTTP status code for the error
        return next(error); // Pass the error to the error handling middleware
    }

    store.removeItem(noteId)

    res.status(200).json({ message: 'Deleted Note successfully.' });
};



//@desc     Get specific note
//@route    GET  /api/v1/notes/:noteId
//@protect  all 
exports.getOneNote = (req, res, next) => {
    const noteId = req.params.noteId;
    if (!noteId) {
        const error = new Error('noteId is required');
        error.status = 400; // Set the HTTP status code for the error
        return next(error); // Pass the error to the error handling middleware 
    }

    const values = getValues(store);
    let noteFounded = values.find(value => value.noteId === noteId)

    if (!noteFounded) {
        const error = new Error(`Not found Note with this id: ${noteId}`);
        error.status = 404; // Set the HTTP status code for the error
        return next(error); // Pass the error to the error handling middleware
    }

    res.status(200).json({ message: 'success.', data: noteFounded });
};