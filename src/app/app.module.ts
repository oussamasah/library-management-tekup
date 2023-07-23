// src/app/app.module.ts

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; // Import the NgbModule

import { AppComponent } from './app.component';
import { BookComponent } from './book/book.component';
import { BookService } from './services/book.service';

@NgModule({
  declarations: [AppComponent, BookComponent],
  imports: [BrowserModule, FormsModule, NgbModule], // Add NgbModule to the imports array
  providers: [BookService],
  bootstrap: [AppComponent],
})
export class AppModule {}