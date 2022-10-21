(() => {
    function createCard() {
        let elementsList = document.createElement('li');
        let clickElement = document.createElement('button');
        let textButton = document.createElement('p');
        let index = 0;

        textButton.textContent = "?";
        textButton.classList.add('textCard')
        clickElement.classList.add('styleCard');

        elementsList.append(clickElement);
        clickElement.append(textButton);

        return {
            elementsList,
            clickElement,
            textButton,
            index
        }
    }

    function createListCards() {
        let listCards = document.createElement('ul');
        listCards.id = "menu";
        return listCards;
    }

    function createGame() {
        let cards = [];
        let restartButton = createRestartButton();
        let nameGame = createMainHeader();
        let indexesCard = createIndexCard();

        document.body.append(nameGame);
        logicCard(indexesCard, cards);

        document.body.append(restartButton.divElement);

        restartButton.button.addEventListener('click', () => {
            location.reload();
        })
    }

    document.addEventListener('DOMContentLoaded', () => createGame());

    function logicCard(indexesCard, cards) {
        let countClick = 0;
        let countVictory = 0;
        let listCard  = createListCards();
        let countCards = 0;
        let clickCards = { firstClick: null, secondClick: null }
        for (let index = 0; index < 16; index++) {
            let card = createCard();
            listCard.append(card.elementsList);
            countCards++;
            if (countCards % 4 === 0) {
                document.body.append(listCard);
                listCard = createListCards();
            }

            card.index = indexesCard[index];
            cards.push(card);

            card.clickElement.addEventListener('click', () => {
                card.textButton.textContent = String(card.index);
                card.clickElement.disabled = true;

                if (countClick === 0)
                    clickCards.firstClick = card;
                else
                    clickCards.secondClick = card;

                countClick++;

                setTimeout(function () {
                    if (countClick === 2) {
                        countClick = 0;
                        if (clickCards.firstClick.index !== clickCards.secondClick.index) {
                            cleanCard(clickCards.firstClick);
                            cleanCard(clickCards.secondClick);
                        }
                        else
                            countVictory++;
                        cleanClickTap(clickCards);
                    }

                    if (countVictory === 8) {
                        alert("Поздравляем! Вы выиграли!");
                    }
                }, 1000)
            })

            function cleanCard(card) {
                card.textButton.textContent = "?";
                card.clickElement.disabled = false;
            }

            function cleanClickTap(clickTap) {
                clickTap.firstClick = null;
                clickTap.secondClick = null;
            }
        }
    }

    function createIndexCard() {
        let indexes = []
        for (let indexCard = 0; indexCard < 8; indexCard++){
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
        let divElement = document.createElement('div');
        let button = document.createElement('button');
        button.textContent = "Сыграть ещё раз!";
        divElement.classList.add('positionButton');
        button.classList.add('btn', 'btn-primary', 'restartButton');
        divElement.append(button);
        return {
            divElement,
            button
        };
    }

    function createMainHeader() {
        let header = document.createElement('h1');
        header.textContent = "Игра карточная";
        header.classList.add();
        return header;
    }
})();