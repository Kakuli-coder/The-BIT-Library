console.log("Welcome to Library JS");

class Book {
    constructor(givenBookName, givenAuthor, givenGenre) {
        this.bookName = givenBookName;
        this.author = givenAuthor;
        this.genre = givenGenre;
    }

    insertLocalStorage(book) {
        let booksObj;
        let books = localStorage.getItem("books");
        if (books === null) {
            booksObj = [];
        } else {
            booksObj = JSON.parse(books);
        }

        booksObj.push(book);
        localStorage.setItem("books", JSON.stringify(booksObj));
    }
}

class Display {
    addBook() {
        let booksObj;

        let books = localStorage.getItem("books");
        if (books === null) {
            booksObj = [];
        } else {
            booksObj = JSON.parse(books);
        }

        let html = ``;

        booksObj.forEach(function (book, index) {
            html += `
            <tr class="tableEntries">
                <th>${index + 1}</th>
                <td class="book">${book.bookName}</td>
                <td class="author"><em>${book.author}</em></td>
                <td class="genre">${book.genre}</td>
                <td>
                    <!-- Button trigger modal -->
                        <button type="button" class="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#deleteModal${index + 1}">
                            Delete book
                        </button>

                    <!-- Modal -->
                        <div class="modal fade" id="deleteModal${index + 1}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">Are you sure you want to delete book ${index + 1}?</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                <div class="modal-body">
                                    All records of the book <strong>${book.bookName}</strong> will be removed from the BIT Library.
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" id="${index}" onclick="display.deleteBook(this.id)" class="btn btn-danger" data-bs-dismiss="modal">Delete</button>
                                </div>
                            </div>
                        </div>
                </td>
            </tr>

                ` ;
        });

        let tableBody = document.querySelector("#tableBody");
        if (booksObj.length !== 0) {
            tableBody.innerHTML = html;
        } else {
            tableBody.innerHTML = `<strong style="color: red">No Book found!</strong>`
        }
    };

    clearLibraryForm() {
        let libraryForm = document.querySelector("#libraryForm");
        libraryForm.reset();
    }

    validate(book) {
        if (book.bookName.length < 2 || book.author.length < 2) {
            return false;
        } else {
            return true;
        }
    }

    message(type, displayMessage) {
        let message = document.querySelector("#message");
        let boldTxt;
        if (type === "success") {
            boldTxt = "😄 Success!";
        } else {
            boldTxt = "😢 Sorry!";
        }
        message.innerHTML = `
        <div class="alert alert-${type} alert-dismissible fade show" role="alert">
            <strong>${boldTxt}</strong> ${displayMessage}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        `
        setTimeout(() => {
            message.innerHTML = ``;
        }, 5000);
    }

    deleteBook(index) {
        let booksObj;
        let books = localStorage.getItem("books");
        if (books === null) {
            booksObj = [];
        } else {
            booksObj = JSON.parse(books);
        }

        booksObj.splice(index, 1);
        localStorage.setItem("books", JSON.stringify(booksObj));
        display.addBook();
    }

    searchByBook() {
        let searchBook = document.querySelector("#searchBook");
        searchBook.addEventListener("input", function () {
            let inputVal = searchBook.value.toLowerCase();
            // console.log("Input event fired!", inputVal);
            let tableEntries = document.querySelectorAll(".tableEntries");
            Array.from(tableEntries).forEach(function (element) {
                let bookNameTxt = element.querySelector(".book").innerText.toLowerCase();
                // console.log(bookNameTxt);

                if (bookNameTxt.includes(inputVal)) {
                    element.style.display = "table-row";
                } else {
                    element.style.display = "none";
                }
            });
        });
    }

    searchByAuthor() {
        let searchAuthor = document.querySelector("#searchAuthor");
        searchAuthor.addEventListener("input", function () {
            let inputVal = searchAuthor.value.toLowerCase();
            // console.log("Input event fired!", inputVal);
            let tableEntries = document.querySelectorAll(".tableEntries");
            Array.from(tableEntries).forEach(function (element) {
                let bookAuthorTxt = element.querySelector(".author").innerText.toLowerCase();
                // console.log(bookNameTxt);

                if (bookAuthorTxt.includes(inputVal)) {
                    element.style.display = "table-row";
                } else {
                    element.style.display = "none";
                }
            });
        });
    }

    searchByGenre() {
        let searchGenre = document.querySelector("#searchGenre");
        searchGenre.addEventListener("input", function () {
            let inputVal = searchGenre.value.toLowerCase();
            // console.log("Input event fired!", inputVal);
            let tableEntries = document.querySelectorAll(".tableEntries");
            Array.from(tableEntries).forEach(function (element) {
                let bookGenreTxt = element.querySelector(".genre").innerText.toLowerCase();
                // console.log(bookNameTxt);

                if (bookGenreTxt.includes(inputVal)) {
                    element.style.display = "table-row";
                } else {
                    element.style.display = "none";
                }
            });
        });
    }
}

let libraryForm = document.querySelector("#libraryForm");
let display = new Display();
display.addBook();

libraryForm.addEventListener("submit", function (e) {
    e.preventDefault();

    let givenBookName = document.querySelector("#bookName").value;
    let givenAuthor = document.querySelector("#author").value;
    let givenGenre;

    let fiction = document.querySelector("#fiction");
    let nonFiction = document.querySelector("#non-fiction");
    let academic = document.querySelector("#academic");

    if (fiction.checked) {
        givenGenre = fiction.value;
    } else if (nonFiction.checked) {
        givenGenre = nonFiction.value;
    } else {
        givenGenre = academic.value;
    }

    let book = new Book(givenBookName, givenAuthor, givenGenre);
    // console.log(typeof book);
    // console.log(book);
    // console.log("Submit Button is triggered!");

    if (display.validate(book) === true) {
        let bookItemLocalStorage = new Book();
        bookItemLocalStorage.insertLocalStorage(book);

        display.addBook();
        display.clearLibraryForm();
        display.message("success", "Your book has been successfully added");
    } else {
        display.message("danger", "Your book cannot be added");
    }

    e.preventDefault();
});

display.searchByBook();
display.searchByAuthor();
display.searchByGenre();
