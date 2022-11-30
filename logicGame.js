function createCard() {
    const elementsList = document.createElement('li');
    const clickElement = document.createElement('button');
    const textButton = document.createElement('p');
    let isSolve = false;
    let index = 0;

    textButton.textContent = '?';
    textButton.classList.add('text-card');
    clickElement.classList.add('styleCard');

    elementsList.append(clickElement);
    clickElement.append(textButton);

    return {
        elementsList,
        clickElement,
        textButton,
        index,
        isSolve
    }
}

function createForm() {
    const form = document.createElement('form');
    const input = document.createElement('input');
    const button = document.createElement('button');

    form.classList.add('form-app');
    input.classList.add('input-form');
    button.classList.add('btn', 'btn-primary');

    button.textContent = 'Отправить';
    input.placeholder = 'Количество карточек по вертикали/горизонтали';
    input.type = 'number';

    form.append(input, button);
    return {
        form,
        input,
        button
    }
}


function createListCards() {
    const listCards = document.createElement('ul');
    listCards.id = 'menu';
    return listCards;
}

function createGame() {
    const cards = [];
    const formCountCards = createForm();
    const restartButton = createRestartButton();
    const nameGame = createMainHeader();

    document.body.append(nameGame, formCountCards.form);
    logicCard(cards, 4);

    document.body.append(restartButton.divElement);

    formCountCards.form.addEventListener('submit', evt => {
        evt.preventDefault();
        const countCards = +formCountCards.input.value;
        if (countCards % 2 !== 0 || countCards < 2 || countCards > 10) alert('Некорректное введенное значение клеток!');
        else {
            const oldCardList = document.querySelector('#list-div');
            oldCardList.replaceWith(logicCard(cards, countCards));
        }
    });

    restartButton.button.addEventListener('click', () => {
        location.reload();
    });
}

document.addEventListener('DOMContentLoaded', () => createGame());

function logicCard(cards, countUserCards) {
    let countClick = 0;
    let countVictory = 0;
    let listCard = createListCards();
    let countCards = 0;
    const clickCards = {firstClick: null, secondClick: null};
    const indexesCard = createIndexCard(countUserCards);
    const divList = document.createElement('div');
    divList.id = 'list-div';
    divList.appendChild(listCard);

    for (let index = 0; index < countUserCards ** 2; index++) {
        const card = createCard();
        listCard.append(card.elementsList);
        countCards++;

        if (countCards % countUserCards === 0) {
            listCard = createListCards();
            divList.appendChild(listCard);
        }

        card.index = indexesCard[index];
        cards.push(card);

        card.clickElement.addEventListener('click', () => {
            card.textButton.textContent = String(card.index);
            card.clickElement.disabled = true;

            if (countClick === 0) clickCards.firstClick = card;
            else clickCards.secondClick = card;

            countClick++;

            changeStateCards(true);
            waitAnswer();

            function waitAnswer() {
                setTimeout(() => {
                    if (countClick === 2) {
                        countClick = 0;
                        if (clickCards.firstClick.index !== clickCards.secondClick.index) {
                            cleanCard(clickCards.firstClick);
                            cleanCard(clickCards.secondClick);
                        } else {
                            clickCards.firstClick.isSolve = true;
                            clickCards.secondClick.isSolve = true;
                            countVictory++;
                        }
                        cleanClickTap(clickCards);
                    }

                    if (countVictory === countUserCards) {
                        alert("Поздравляем! Вы выиграли!");
                        location.reload();
                    }

                    changeStateCards(false);
                }, 1000);
            }

            function changeStateCards(state) {
                for (let bLockCard of cards) {
                    if (!bLockCard.isSolve) bLockCard.clickElement.disabled = state;
                }
            }

            function cleanCard(card) {
                card.textButton.textContent = '?';
                card.clickElement.disabled = false;
            }

            function cleanClickTap(clickTap) {
                clickTap.firstClick = null;
                clickTap.secondClick = null;
            }
        });
    }

    document.body.append(divList);
    return divList;
}

function createIndexCard(countCards) {
    const indexes = []
    for (let indexCard = 0; indexCard < countCards ** 2 / 2; indexCard++) {
        indexes.push(indexCard);
        indexes.push(indexCard);
    }
    shuffle(indexes);
    return indexes;
}

function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    return array;
}

function createRestartButton() {
    const divElement = document.createElement('div');
    const button = document.createElement('button');

    button.textContent = 'Сыграть ещё раз!';
    divElement.classList.add('position-button-again');
    button.classList.add('btn', 'btn-primary', 'restartButton');
    divElement.append(button);

    return {
        divElement,
        button
    };
}

function createMainHeader() {
    const header = document.createElement('h1');
    header.textContent = 'Игра карточная';
    header.classList.add('main-header');
    return header;
}