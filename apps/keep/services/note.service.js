import { storageService } from '../../../services/async-storage.service.JS';
import utilService from '../../../services/util-service.js';
const NOTES_KEY = 'notesDB'

export const noteService = {
    query,
    remove,
    save,
    getNoteById,
    getEmptyNote
}
_createNotes()

// const notes = [
//     {
//         id: 'n101',
//         createdAt: 1112222,
//         type: 'NoteTxt',
//         isPinned: true,
//         style: {
//             backgroundColor: '#00d'
//         },
//         info: {
//             txt: 'Fullstack Me Baby!'
//         }
//     }, {
//         id: 'n101',
//         createdAt: 1112222,
//         type: 'NoteTxt',
//         isPinned: true,
//         style: {
//             backgroundColor: '#00d'
//         },
//         info: {
//             txt: 'Fullstack Me Baby!'
//         }
//     },
//     // {
//     //     id: 'n102',
//     //     type: 'NoteImg',
//     //     isPinned: false,
//     //     info: {
//     //         url: 'http://some-img/me',
//     //         title: 'Bobi and Me'
//     //     },
//     //     style: {
//     //         backgroundColor: '#00d'
//     //     }
//     // },
//     // {
//     //     id: 'n103',
//     //     type: 'NoteTodos',
//     //     isPinned: false,
//     //     info: {
//     //         title: 'Get my stuff together',
//     //         todos: [
//     //             { txt: 'Driving license', doneAt: null },
//     //             { txt: 'Coding power', doneAt: 187111111 }
//     //         ]
//     //     }
//     // }
// ]

function query() {
    return storageService.query(NOTES_KEY)
}



function remove(noteId) {
    return storageService.remove(NOTES_KEY, noteId);
}
function save(note) {
    if (note.id) return storageService.put(NOTES_KEY, note);
    else return storageService.post(NOTES_KEY, note);
}
function getNoteById(noteId) {
    return storageService.get(NOTES_KEY, noteId)
        .then(_setNextPrevNoteId)
}

function getEmptyNote(type = 'NoteTxt', info = { txt: 'New Note' }) {
    return {
        id: utilService.makeId,
        createdAt: Date.now,
        type,
        isPinned: false,
        style: { backgroundColor: '#00d' },
        info,
    }
}


function _createNotes() {
    let notes = utilService.getFromStorage(NOTES_KEY)
    if (!notes || !notes.length) {
        notes = [
            {
                id: 'n101',
                createdAt: 1112222,
                type: 'NoteTxt',
                isPinned: true,
                style: {
                    backgroundColor: '#00d'
                },
                info: {
                    txt: 'Fullstack Me Baby!'
                }
            }, {
                id: 'n101',
                createdAt: 1112222,
                type: 'NoteTxt',
                isPinned: true,
                style: {
                    backgroundColor: '#00d'
                },
                info: {
                    txt: 'Fullstack Me Baby!'
                }
            },
            // {
            //     id: 'n102',
            //     type: 'NoteImg',
            //     isPinned: false,
            //     info: {
            //         url: 'http://some-img/me',
            //         title: 'Bobi and Me'
            //     },
            //     style: {
            //         backgroundColor: '#00d'
            //     }
            // },
            // {
            //     id: 'n103',
            //     type: 'NoteTodos',
            //     isPinned: false,
            //     info: {
            //         title: 'Get my stuff together',
            //         todos: [
            //             { txt: 'Driving license', doneAt: null },
            //             { txt: 'Coding power', doneAt: 187111111 }
            //         ]
            //     }
            // }
        ]
        utilService.saveToStorage(NOTES_KEY, notes);
    }
    return notes
}

function _createNote(type, info = 250) {
    const note = getEmptyNote(type, info)
    note.id = utilService.makeId()
    return note
}


function _setNextPrevNoteId(note) {
    return storageService.query(NOTES_KEY).then((notes) => {
        const noteIdx = notes.findIndex((currNote) => currNote.id === note.id)
        note.nextNoteId = notes[noteIdx + 1] ? notes[noteIdx + 1].id : notes[0].id
        note.prevNoteId = notes[noteIdx - 1]
            ? notes[noteIdx - 1].id
            : notes[notes.length - 1].id
        return note
    })
}
