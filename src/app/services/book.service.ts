// src/app/book.service.ts

import { Injectable } from '@angular/core';
// import book model
import { Book } from '../models/book.model';


//provide the service at the root level of the application
@Injectable({
    providedIn: 'root',
})


export class BookService {
    private books: Book[] = [];
    private lastId = 0;
    constructor() { }

    // method to get all book list
    getAllBooks(): Book[] {
        return this.books;
    }

    // method to add new  book to the list

    addBook(book: Book): void {
        this.lastId++;
        book.id = this.lastId;
        this.books.push(book);
    }

    // method to search for a book from the list

    searchBook(string: String): Book[] {
        let serched = []
        for (let b of this.books) {
            if (b.editor.toLocaleLowerCase().includes(string.toLocaleLowerCase()) || b.title.toLocaleLowerCase().includes(string.toLocaleLowerCase()) || b.author.toLocaleLowerCase().includes(string.toLocaleLowerCase())) {
                serched.push(b);
            }
        }
        return serched;
    }

    // method to update a book in the list

    updateBook(book: Book): void {
        // find index of this book in the list
        const index = this.books.findIndex((item) => { console.log(item.id); console.log(book.id); return item.id == book.id })

        if (index > -1) {
            // change this book in the list if exist
            this.books[index] = book;
        }
    }

    // method to delete a book from the list

    deleteBook(id: number): void {
        this.books = this.books.filter((b) => b.id !== id);
    }
}