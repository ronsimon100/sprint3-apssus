'use strict'

import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

import booksDB from "../data/book.json" assert { type: "json" }

const BOOK_KEY = 'bookDB'


// createData()
// function createData() {
//   utilService.saveToStorage(BOOK_KEY, booksDB)
// }

_createBooks()

export const bookService = {
  query,
  get,
  remove,
  save,
  getEmptyBook,
}

async function query(filterBy = {}) {
  const books = await storageService.query(BOOK_KEY)
  if (filterBy.txt) {
    const regex = new RegExp(filterBy.txt, 'i')
    books = books.filter((book) => regex.test(book.title))
  }
  if (filterBy.amount) {
  }
  return books
}

function get(bookId) {
  return storageService.get(BOOK_KEY, bookId)
}

function remove(bookId) {
  return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
  if (book.id) {
    return storageService.put(BOOK_KEY, book)
  } else {
    return storageService.post(BOOK_KEY, book)
  }
}

function getEmptyBook(title = '', amount = 0) {
  return { id: '', title, amount }
}

function _createBooks() {
  let books = utilService.loadFromStorage(BOOK_KEY)
  if (!books || !books.length) {
    books = booksDB
    utilService.saveToStorage(BOOK_KEY, books)
  }
}


