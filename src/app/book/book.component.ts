// src/app/book/book.component.ts

import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Book } from '../models/book.model';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
})
export class BookComponent implements OnInit {

  books: Book[] = [];
  selectedBook: Book = { id: 0, title: '', author: '', editor: '', publishedAt:'' };// Initialize selectedBook with an empty object
  searchQuery: string = '';

  // implement book service and modal service

  constructor(private bookService: BookService, private modalService: NgbModal) {}

  ngOnInit(): void {
  // get all availble book whene component initialized

    this.getAllBooks();
  }

  // function to get all availble book
  getAllBooks(): void {
    this.books = this.bookService.getAllBooks();
  }

  // function to add a book to the list

  addBook(book: Book): void {
    this.bookService.addBook(book);
    this.getAllBooks();
  }

  // function to update a book from the list

  updateBook(book: Book): void {

    this.bookService.updateBook(book);
    this.getAllBooks();
  }

  // function to search a book from the list

  search(): void {

    if(this.searchQuery.length > 0 ){
      this.books = this.bookService.searchBook(this.searchQuery);

    }else{
      this.books = this.bookService.getAllBooks();
    }

  
  }

  // function to delete a book from the list

  deleteBook(id: number): void {

    const result = window.confirm("Are you sure you want to delete this book?");
    if (result) {
      // User clicked "OK", perform the delete action
      // ... (your delete logic here)
      this.bookService.deleteBook(id);
      this.getAllBooks();
      this.selectedBook = { id: 0, title: '', author: '', editor: '', publishedAt:'' };
    } 

  }




  // function to open add modal whene add btn clicked

  openAddBookModal(content: any): void {
      // set the selected book null
    this.selectedBook =    { id: 0, title: '', author: '', editor: '', publishedAt:'' };

      // open modal
    this.modalService.open(content, { centered: true, size: 'md' });
  }

  // function to open edit modal whene edit btn clicked
  
  openEditBookModal(content: any, book: Book): void {
      // set the book clicked for edit as selected book
    this.selectedBook = { ...book };
      // open modal
    this.modalService.open(content, { centered: true, size: 'md' });
  }

  // function to handle form submition and detect if form submition is for add or edit
  submitForm(bookForm : Book): void {

    const book: Book =bookForm;
    if (this.selectedBook.id == 0) {
      // Add a new book
      this.addBook(book);
    } else {
    
      // Update an existing book
      this.updateBook(book);
    }
    this.modalService.dismissAll();
  }
}