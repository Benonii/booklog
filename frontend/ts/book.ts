type Book = {
    id: number;
    description?: string;
    title: string;
    genre: string;
    pages: number;
    progress: number;
    author: string;
};

document.addEventListener('DOMContentLoaded', function () {
    const library = document.getElementById('library');
    console.log(library); // should no longer be null

    // Render the books
    async function renderBooks() {
        const books = await fetchBooks();
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
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="align-self-center delete-btn mt-2 me-2" viewBox="0 0 16 16">
                                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                                </svg>
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
            library?.appendChild(bookCard)
        });

        if (books.length === 0) {
            console.log('Library is empty')
            console.log('Library:', library)
            library?.appendChild(emptyLibrary);
        }
    }

    // Initial render
    renderBooks();
    
    document.getElementById('addBookModal')?.addEventListener('show.bs.modal', function (e: Event) {
        async function createBook(newBook: Omit<Book, 'id'>): Promise<void> {
            const response = await fetch('http://localhost:3000/api/book', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(newBook),
            });
    
            const responseJSON = await response.json()
            if (!response.ok) {
                alert(`${responseJSON.message}. Status : ${response.status}`);
                console.log(responseJSON);
            }
    
            alert(responseJSON.message);
            console.log("Book created successfully:", responseJSON?.book)
            await renderBooks();
        }
    
        document.getElementById('addBookForm')?.addEventListener('submit', async function (e: Event) {
            e.preventDefault();
        
            const title = (document.getElementById('title') as HTMLInputElement).value;
            const description = (document.getElementById('description') as HTMLInputElement).value;
            const author = (document.getElementById('author') as HTMLInputElement).value;
            const pages = (document.getElementById('pages') as HTMLInputElement).value;
            const progress = (document.getElementById('progress') as HTMLInputElement).value;
            const genre = (document.getElementById('genre') as HTMLInputElement).value;
        
            const newBook = {
                title,
                description,
                author,
                genre,
                pages: Number(pages),
                progress: Number(progress),
            };
        
            await createBook(newBook)
        });
    });

    document.getElementById('editBookModal')?.addEventListener('show.bs.modal', function (e: Event) {
        console.log("Modal is open")
        document.getElementById('saveChangesBtn')?.addEventListener('click', async function (e: Event) {
            e.preventDefault();
            const book_id = (document.getElementById('edit-book-id') as HTMLInputElement).value;
            
            const title = (document.getElementById('edit-title') as HTMLInputElement)?.value;
            const description = (document.getElementById('edit-description') as HTMLInputElement)?.value;
            const author = (document.getElementById('edit-author') as HTMLInputElement).value;
            const pages = (document.getElementById('edit-pages') as HTMLInputElement)?.value;
            const progress = (document.getElementById('edit-progress') as HTMLInputElement)?.value;
            const genre = (document.getElementById('edit-genre') as HTMLInputElement)?.value;
    
            const bookEdit = {
                title,
                description,
                author,
                pages: Number(pages),
                progress: Number(progress),
                genre,
            };

            console.log("Updated book:", bookEdit);
    
            await updateBook(book_id, bookEdit);
        });
    })
    async function getBookByID(bookID: number): Promise<Book> {
        const response = await fetch(`http://localhost:3000/api/book/${bookID}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            },
        })

        const responseJSON = await response.json();
        if (!response.ok) {
            alert(`Error: ${responseJSON.message}. Status: ${response.status}`);
        } 

        return responseJSON.data;
    };

    async function populateEditModal(bookID: string | number) {
        const book: Book = await getBookByID(Number(bookID));

        // Populate the input fields
        (document.getElementById('edit-title') as HTMLInputElement).value = book?.title;
        (document.getElementById('edit-genre') as HTMLInputElement).value = book?.genre;
        (document.getElementById('edit-pages') as HTMLInputElement).value = book?.pages.toString();
        (document.getElementById('edit-author') as HTMLInputElement).value = book?.author;
        (document.getElementById('edit-progress') as HTMLInputElement).value = book?.progress.toString();

        // Store bookID in a hidden input for later use
        (document.getElementById('edit-book-id')as HTMLInputElement).value = bookID.toString();
    }

    async function updateBook(bookID: string, bookEdit: Partial<Book>): Promise<void> {
        const book_id = Number(bookID);
        const response = await fetch(`http://localhost:3000/api/book/${book_id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(bookEdit),
        });

        const responseJSON = await response.json();
        if (!response.ok) {
            throw new Error(responseJSON.message || "An error occured!");
        }

        console.log("Book updated successfully!");
        alert("Book updated successfully");
    }

    // Listen for a book being updated
    document.addEventListener('click', function (e: any) {
        e.preventDefault()
        if (e.target?.classList.contains('update-btn')) {
            const bookID = e?.target.getAttribute('data-book-id')
            console.log("Book ID:", bookID);
            populateEditModal(bookID);
        }
    })
});
   

let currentBookId: number | null = null;

// Fetch books from the API
async function fetchBooks(): Promise<Book[]> {
    try {
        const response = await fetch('http://localhost:3000/api/book', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            throw new Error('Failed to fetch books');
        }
        const data = await response.json();
        console.log("Data:", data)
        return data.data; // assuming API returns books in a `books` array
    } catch (error) {
        console.error('Error fetching books:', error);
        return []; // Return empty array if fetch fails
    }
}


async function fetchBookById(bookId: number): Promise<Book | null> {
    try {
        const response = await fetch(`http://localhost:3000/api/books/${bookId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch book');
        }
        const data = await response.json();
        return data.book; // assuming API returns a book in `book`
    } catch (error) {
        console.error('Error fetching book by ID:', error);
        return null;
    }
}