"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
document.addEventListener('DOMContentLoaded', function () {
    const library = document.getElementById('library');
    console.log(library); // should no longer be null
    // Render the books
    function renderBooks() {
        return __awaiter(this, void 0, void 0, function* () {
            const books = yield fetchBooks();
            const emptyLibrary = document.createElement('p');
            emptyLibrary.className = 'text-center mt-2';
            emptyLibrary.innerHTML = 'There is nothing in your Library. <strong>Add a new book!</strong>';
            books.forEach((book) => {
                const bookCard = document.createElement('div');
                bookCard.className = 'col-md-4 col-lg-3 mb-4';
                bookCard.innerHTML = `
                <div class="card shadow">
                    <img src="./assets/images/default-book.png" class="card-img-top" alt="Book">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center">
                            <h5 class="card-title">${book.title}</h5>
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="align-self-center delete-btn mt-2 me-2" viewBox="0 0 16 16">
                              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                              <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                            </svg>
                        </div>
                            <p class="card-text"><strong>Genre:</strong> ${book.genre}</p>
                            <p class="card-text">Pages: ${book.pages}</p>
                            <div>
                                <p class="text-secondary">By ${book.author}</p>
                                <div class="progress" style="height: 8px; width: 150px;">
                                    <div class="progress-bar" role="progressbar" style="width: ${(book.progress / book.pages) * 100}%; aria-valuenow=${(book.progress / book.pages) * 100} aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                                <div class="d-flex justify-content-end mt-3">
                                    <button class="btn btn-primary primary-btn btn-md" data-bs-toggle="modal" data-bs-target="#editBookModal">Update</button>
                                </div>
                            </div>
                        </div>
                </div>
            `;
                library === null || library === void 0 ? void 0 : library.appendChild(bookCard);
            });
            if (books.length === 0) {
                console.log('Library is empty');
                console.log('Library:', library);
                library === null || library === void 0 ? void 0 : library.appendChild(emptyLibrary);
            }
            // document.querySelectorAll('.edit-btn').forEach((button) => {
            //     button.addEventListener('click', () => {
            //         const bookId = Number((button as HTMLButtonElement).getAttribute('data-id'));
            //         openEditModal(bookId);
            //     });
            // });
            // document.querySelectorAll('.delete-btn').forEach((button) => {
            //     button.addEventListener('click', () => {
            //         const bookId = Number((button as HTMLButtonElement).getAttribute('data-id'));
            //         deleteBook(bookId);
            //     });
            // });
        });
    }
    // Initial render
    renderBooks();
});
// const modalElement = document.getElementById('edit-modal');
// if (!library || !modalElement) {
//     if (!library) {
//         throw new Error("Library DOM element not found.");
//     }
//     throw new Error("Required DOM elements not found.");
// }
// const editModal = new Modal(modalElement);
let currentBookId = null;
// Fetch books from the API
function fetchBooks() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch('http://localhost:3000/api/book', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch books');
            }
            const data = yield response.json();
            console.log("Data:", data);
            return data.data; // assuming API returns books in a `books` array
        }
        catch (error) {
            console.error('Error fetching books:', error);
            return []; // Return empty array if fetch fails
        }
    });
}
// Open edit modal with book data
// async function openEditModal(bookId: number) {
//     const book = await fetchBookById(bookId);
//     if (book) {
//         currentBookId = book.id;
//         (document.getElementById('edit-title') as HTMLInputElement).value = book.title;
//         (document.getElementById('edit-genre') as HTMLInputElement).value = book.genre;
//         (document.getElementById('edit-pages') as HTMLInputElement).value = String(book.pages);
//         (document.getElementById('edit-progress') as HTMLInputElement).value = String(book.progress);
//         (document.getElementById('edit-author') as HTMLInputElement).value = book.author;
//         // editModal.show();
//     }
// }
// Fetch a specific book by ID
function fetchBookById(bookId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`http://localhost:3000/api/books/${bookId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch book');
            }
            const data = yield response.json();
            return data.book; // assuming API returns a book in `book`
        }
        catch (error) {
            console.error('Error fetching book by ID:', error);
            return null;
        }
    });
}
// Save changes to a book
// document.getElementById('save-changes')!.addEventListener('click', async () => {
//     if (currentBookId === null) return;
//     const book = {
//         id: currentBookId,
//         title: (document.getElementById('edit-title') as HTMLInputElement).value,
//         genre: (document.getElementById('edit-genre') as HTMLInputElement).value,
//         pages: Number((document.getElementById('edit-pages') as HTMLInputElement).value),
//         progress: Number((document.getElementById('edit-progress') as HTMLInputElement).value),
//         author: (document.getElementById('edit-author') as HTMLInputElement).value,
//     };
//     try {
//         const response = await fetch(`http://localhost:3000/api/books/${currentBookId}`, {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(book),
//         });
//         if (!response.ok) {
//             throw new Error('Failed to save book');
//         }
//         renderBooks(); // Re-render after saving changes
//         // editModal.hide();
//     } catch (error) {
//         console.error('Error saving book:', error);
//     }
// });
// Delete a book
// async function deleteBook(bookId: number) {
//     try {
//         const response = await fetch(`http://localhost:3000/api/books/${bookId}`, {
//             method: 'DELETE',
//         });
//         if (!response.ok) {
//             throw new Error('Failed to delete book');
//         }
//         renderBooks(); // Re-render after deleting
//     } catch (error) {
//         console.error('Error deleting book:', error);
//     }
// }
