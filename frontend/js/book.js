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
    var _a, _b, _c;
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
                bookCard.className = 'col-sm-6 col-md-4 col-lg-3 mb-5';
                bookCard.innerHTML = `
                <div class="card shadow">
                    <img src="./assets/images/default-book.png" class="card-img-top" alt="Book" wi>
                    <div class="card-body d-flex flex-column justify-content-between">
                        <div>
                            <div class="d-flex justify-content-between align-items-center">
                                <h5 class="card-title">${book.title}</h5>
                                <a 
                                    tabindex="0" 
                                    class="btn btn-lg" 
                                    role="button" 
                                    data-bs-toggle="modal" 
                                    data-bs-target="#deleteModal"
                                    data-id=${book.id}>
                                    <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        width="25" 
                                        height="25" 
                                        fill="currentColor" 
                                        class="align-self-center delete-btn" 
                                        viewBox="0 0 16 16">
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                                    </svg>
                                </a>
                            </div>
                            <p class="card-text"><strong>Genre:</strong> ${book.genre}</p>
                            <p class="card-text">Pages: ${book.pages}</p>
                            <p class="text-secondary">By ${book.author}</p>
                        </div>
                        <div>
                            <div class="progress mb-3" style="height: 8px; width: 100%;">
                                <div class="progress-bar" role="progressbar" style="width: ${(book.progress / book.pages) * 100}%;"
                                    aria-valuenow="${(book.progress / book.pages) * 100}" aria-valuemin="0" aria-valuemax="100">
                                </div>
                            </div>
                            <div class="d-flex justify-content-end">
                                <button class="btn btn-primary primary-btn btn-md update-btn" data-bs-toggle="modal" data-bs-target="#editBookModal" data-book-id="${book.id}">Update</button>
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
        });
    }
    // Initial render
    renderBooks();
    (_a = document.getElementById('addBookModal')) === null || _a === void 0 ? void 0 : _a.addEventListener('show.bs.modal', function (e) {
        var _a;
        function createBook(newBook) {
            return __awaiter(this, void 0, void 0, function* () {
                const response = yield fetch('http://localhost:3000/api/book', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify(newBook),
                });
                const responseJSON = yield response.json();
                if (!response.ok) {
                    alert(`${responseJSON.message}. Status : ${response.status}`);
                    console.log(responseJSON);
                }
                alert(responseJSON.message);
                console.log("Book created successfully:", responseJSON === null || responseJSON === void 0 ? void 0 : responseJSON.book);
                yield renderBooks();
            });
        }
        (_a = document.getElementById('addBookForm')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', function (e) {
            return __awaiter(this, void 0, void 0, function* () {
                e.preventDefault();
                const title = document.getElementById('title').value;
                const description = document.getElementById('description').value;
                const author = document.getElementById('author').value;
                const pages = document.getElementById('pages').value;
                const progress = document.getElementById('progress').value;
                const genre = document.getElementById('genre').value;
                const newBook = {
                    title,
                    description,
                    author,
                    genre,
                    pages: Number(pages),
                    progress: Number(progress),
                };
                yield createBook(newBook);
            });
        });
    });
    (_b = document.getElementById('editBookModal')) === null || _b === void 0 ? void 0 : _b.addEventListener('show.bs.modal', function (e) {
        var _a;
        console.log("Modal is open");
        (_a = document.getElementById('saveChangesBtn')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function (e) {
            return __awaiter(this, void 0, void 0, function* () {
                var _a, _b, _c, _d, _e;
                e.preventDefault();
                const book_id = document.getElementById('edit-book-id').value;
                const title = (_a = document.getElementById('edit-title')) === null || _a === void 0 ? void 0 : _a.value;
                const description = (_b = document.getElementById('edit-description')) === null || _b === void 0 ? void 0 : _b.value;
                const author = document.getElementById('edit-author').value;
                const pages = (_c = document.getElementById('edit-pages')) === null || _c === void 0 ? void 0 : _c.value;
                const progress = (_d = document.getElementById('edit-progress')) === null || _d === void 0 ? void 0 : _d.value;
                const genre = (_e = document.getElementById('edit-genre')) === null || _e === void 0 ? void 0 : _e.value;
                const bookEdit = {
                    title,
                    description,
                    author,
                    pages: Number(pages),
                    progress: Number(progress),
                    genre,
                };
                console.log("Updated book:", bookEdit);
                yield updateBook(book_id, bookEdit);
            });
        });
    });
    function getBookByID(bookID) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`http://localhost:3000/api/book/${bookID}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });
            const responseJSON = yield response.json();
            if (!response.ok) {
                alert(`Error: ${responseJSON.message}. Status: ${response.status}`);
            }
            return responseJSON.data;
        });
    }
    ;
    function populateEditModal(bookID) {
        return __awaiter(this, void 0, void 0, function* () {
            const book = yield getBookByID(Number(bookID));
            // Populate the input fields
            document.getElementById('edit-title').value = book === null || book === void 0 ? void 0 : book.title;
            document.getElementById('edit-genre').value = book === null || book === void 0 ? void 0 : book.genre;
            document.getElementById('edit-pages').value = book === null || book === void 0 ? void 0 : book.pages.toString();
            document.getElementById('edit-author').value = book === null || book === void 0 ? void 0 : book.author;
            document.getElementById('edit-progress').value = book === null || book === void 0 ? void 0 : book.progress.toString();
            // Store bookID in a hidden input for later use
            document.getElementById('edit-book-id').value = bookID.toString();
        });
    }
    function updateBook(bookID, bookEdit) {
        return __awaiter(this, void 0, void 0, function* () {
            const book_id = Number(bookID);
            const response = yield fetch(`http://localhost:3000/api/book/${book_id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(bookEdit),
            });
            const responseJSON = yield response.json();
            if (!response.ok) {
                throw new Error(responseJSON.message || "An error occured!");
            }
            console.log("Book updated successfully!");
            alert("Book updated successfully");
        });
    }
    function deleteBook(bookID) {
        return __awaiter(this, void 0, void 0, function* () {
            const book_id = Number(bookID);
            const response = yield fetch(`http://localhost:3000/api/book/${book_id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            const responseJSON = yield response.json();
            if (!response.ok) {
                throw new Error(responseJSON.message || "An error occured!");
            }
            console.log("Book updated successfully!");
            alert("Book deleted successfully!");
        });
    }
    // Listen for a book being updated
    document.addEventListener('click', function (e) {
        var _a;
        e.preventDefault();
        if ((_a = e.target) === null || _a === void 0 ? void 0 : _a.classList.contains('update-btn')) {
            const bookID = e === null || e === void 0 ? void 0 : e.target.getAttribute('data-book-id');
            console.log("Book ID:", bookID);
            populateEditModal(bookID);
        }
    });
    // Listen for a book being deleted
    (_c = document.getElementById('deleteModal')) === null || _c === void 0 ? void 0 : _c.addEventListener('show.bs.modal', function (e) {
        console.log("I know this bitch open");
        const button = e.relatedTarget;
        const bookID = button.getAttribute('data-id');
        const confirmDeleteButton = document.getElementById('confirmDelete');
        console.log("The button is found!", confirmDeleteButton);
        confirmDeleteButton.addEventListener('click', function () {
            return __awaiter(this, void 0, void 0, function* () {
                if (bookID) {
                    // Send a request to delete the book
                    yield deleteBook(bookID);
                }
                else {
                    console.error('No book ID selected!');
                }
            });
        });
    });
    document.addEventListener('click', function (e) {
        var _a;
        e.preventDefault();
        if ((_a = e.target) === null || _a === void 0 ? void 0 : _a.classList.contains('confirm-delete')) {
            const bookID = e === null || e === void 0 ? void 0 : e.target.getAttribute('data-book-id');
            console.log("Book ID:", bookID);
        }
    });
});
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
