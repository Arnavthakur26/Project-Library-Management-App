let index = 1;
// book class
class Book {
    constructor(name, author, type) {
        this.name = name;
        this.author = author;
        this.type = type;
    }

}

// display books
class Display {
    add(book) {
        let tbody = document.getElementById('tbody');
        let strToAdd =
            `
        <tr class="tRow">
        <th scope="row">${index}</th>
        <td id="name">${book.name}</td>
        <td id="bookAuthor">${book.author}</td>
        <td id="bookType">${book.type}</td>
        </tr>
        `
        tbody.innerHTML += strToAdd;
    }

    clear() {
        let libForm = document.getElementById('libForm');
        libForm.reset();
    }

    showAlert(type, displayMsg) {
        let addAlert = document.getElementById('alert');
        let status;
        if (type === 'success') {
            status = 'Success!';
        } else {
            status = 'Error!'
        }
        addAlert.innerHTML = `<div class="alert alert-${type} fade show" role="alert">
        <strong>${status} </strong>${displayMsg}
        </div>`;
        setTimeout(function () {
            addAlert.innerHTML = ''
        }, 2000);
    }

    validate(book) {
        if (book.name.length < 2 || book.author.length < 2) {
            return false
        } else {
            return true;
        }
    }
}
let libForm = document.getElementById('libForm');
libForm.addEventListener('submit', libFormSubmit);

function libFormSubmit(e) {
    e.preventDefault();
    let name = document.getElementById('bookName').value;
    let author = document.getElementById('author').value;
    let fiction = document.getElementById('fiction');
    let tech = document.getElementById('tech');
    let misc = document.getElementById('misc');
    let type;
    if (fiction.checked) {
        type = fiction.value;
    } else if (tech.checked) {
        type = tech.value;
    } else if (misc.checked) {
        type = misc.value;
    }
    let book = new Book(name, author, type);
    // console.log(book)
    let displayBooks = new Display();
    if (displayBooks.validate(book)) {
        displayBooks.add(book);
        index++;
        displayBooks.clear();
        displayBooks.showAlert('success', ' Your Book was added successfuly. ')
    } else {
        displayBooks.showAlert('danger', ' You cannot add this book')
    }

}

//function to search books
let searchStr = document.getElementById('searchStr');
searchStr.addEventListener('input', function (e) {
    let inputVal = searchStr.value.toLowerCase();
    let tRow = document.getElementsByClassName('tRow');
    Array.from(tRow).forEach(function (element) {
        let name = document.getElementById('name').innerText;
        let author = document.getElementById('bookAuthor').innerText;
        let fiction = document.getElementById('fiction');
        let tech = document.getElementById('tech');
        let misc = document.getElementById('misc');
        let type;
        if (fiction.checked) {
            type = fiction.innerText;
        } else if (tech.checked) {
            type = tech.innerText;
        } else if (misc.checked) {
            type = misc.innerText;
        }
        if (name.includes(inputVal) || author.includes(inputVal) || type.includes(inputVal)) {
            element.style.display = '';
        } else {
            element.style.display = 'none';
        }
    });
})