const booksGrid = document.getElementById("books-grid");

const modal = document.getElementById("book-modal");
const closeModalButton = document.getElementById("close-modal");

const modalCover = document.getElementById("modal-cover");
const modalTitle = document.getElementById("modal-title");
const modalAuthor = document.getElementById("modal-author");
const modalStart = document.getElementById("modal-start");
const modalFinish = document.getElementById("modal-finish");
const modalRating = document.getElementById("modal-rating");
const modalQuotes = document.getElementById("modal-quotes");
const modalReview = document.getElementById("modal-review");


// Cria as estrelas da avaliação
function createStars(rating) {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
}


// Cria os cards dos livros
function createBookCards(books) {
    booksGrid.innerHTML = "";

    books.forEach(book => {
        const card = document.createElement("article");
        card.className = "book-card";

        card.innerHTML = `
            <div class="book-cover">
                <img src="${book.cover}" alt="Capa de ${book.title}">
            </div>

            <h2 class="book-title">${book.title}</h2>
            <p class="book-author">${book.author}</p>
            <div class="book-rating">${createStars(book.rating)}</div>
        `;

        card.addEventListener("click", () => openModal(book));

        booksGrid.appendChild(card);
    });
}


// Abre o modal com os dados do livro
function openModal(book) {
    modalCover.src = book.cover;
    modalCover.alt = `Capa de ${book.title}`;

    modalTitle.textContent = book.title;
    modalAuthor.textContent = book.author;

    modalStart.textContent = book.startDate;
    modalFinish.textContent = book.finishDate;

    modalRating.textContent = createStars(book.rating);

    modalQuotes.innerHTML = "";

    book.quotes.forEach(quote => {
        const quoteElement = document.createElement("p");
        quoteElement.className = "quote";
        quoteElement.textContent = quote;

        modalQuotes.appendChild(quoteElement);
    });

    modalReview.textContent = book.review;

    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
}


// Fecha o modal
function closeModal() {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
}


// Clique no botão fechar
closeModalButton.addEventListener("click", closeModal);


// Clique fora do conteúdo
modal.addEventListener("click", event => {
    if (event.target === modal) {
        closeModal();
    }
});


// Tecla ESC
document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closeModal();
    }
});


// Carrega os livros
fetch("books.json")
    .then(response => response.json())
    .then(books => createBookCards(books))
    .catch(error => {
        console.error("Não foi possível carregar os livros:", error);
    });