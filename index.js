(function() {
    let disabledCardArr =[];
    let allCards = [];
    const NEW_GAME_BTN = document.getElementById('linkId');
    const TIMER_TEXT = document.getElementById('timer-text');

    function arrayGeneratorFunc(fieldSize) {
        let resultArr = []

        for (let i = 0; i < 2; i++) {
            for (let a = 1; a < (fieldSize ** 2) / 2 + 1; a++) {
                resultArr.push(a);
            }
        }        

        return resultArr;
    }


    function shuffleFunc(arr){
        var j, temp;
        for(var i = arr.length - 1; i > 0; i--){
            j = Math.floor(Math.random()*(i + 1));
            temp = arr[j];
            arr[j] = arr[i];
            arr[i] = temp;
        }
        return arr;
    }

    // 

    function createListFunc() {
        let list = document.createElement('ul');
        list.classList.add('list');

        return list;
    }

    let arrCheck = [];

    function createCardFunc(randArrMean) {
        let card = document.createElement('li');
        card.classList.add('list-item-disabled');
        card.classList.add('list-item');   

        card.addEventListener('click', () => {
            
            if(!card.classList.contains('card-pass')) {
            
                card.classList.remove('list-item-disabled')
                card.classList.add('card-pass')

                card.textContent = randArrMean;     

                let chek = card.textContent;
                arrCheck.push(chek)

                disabledCardArr.push(card);

                if(arrCheck[0] !== arrCheck[1] && arrCheck.length === 2) {
                    setTimeout(() => {
                        for (let i = 0; i < disabledCardArr.length; i++) {
                            disabledCardArr[0].innerHTML = '';
                            disabledCardArr[0].className = 'list-item-disabled list-item';
                            disabledCardArr[1].innerHTML = '';
                            disabledCardArr[1].className = 'list-item-disabled list-item';
                            disabledCardArr.splice(0, 2);
                            console.log(allCards);
                        } 
                    }, 600);

                    arrCheck = []
                } else if(arrCheck[0] === arrCheck[1] && arrCheck.length === 2) {
                    for (let i = 0; i < disabledCardArr.length + 1; i++) {
                        disabledCardArr.splice(0,2)
                        allCards.splice(i, 2);
                        console.log(allCards);
                    }
                    
                    arrCheck = []

                    if(allCards.length === 0) {
                        NEW_GAME_BTN.classList.remove('link')
                    }
                }

            }         
            
        })

        return card;
    }

    document.addEventListener('DOMContentLoaded', function() {
        const FORM_SIZE = document.getElementById('form-size')
        const INPUT_SIZE = document.getElementById('input-size')

        FORM_SIZE.addEventListener('submit', (e) => {
            e.preventDefault();

            const INPUT_VAL = parseInt(INPUT_SIZE.value)
            let arrayGenerator = arrayGeneratorFunc(INPUT_VAL);
            let shuffle = shuffleFunc(arrayGenerator);
            
            if (INPUT_VAL <= 10 && INPUT_VAL >= 2 && INPUT_VAL % 2 === 0) {
                createApp(shuffle);
            } else {         
                createApp(shuffleFunc([1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8]))
            }
        })

        function createApp(randArr) {
            let createList = createListFunc();
            let createCard = createCardFunc();
            document.body.append(createList);

            for (let i = 0; i < randArr.length; i++) {
                createList.append(createCardFunc(randArr[i]));
                allCards.push(createCardFunc(randArr[i]));
            }
            
            interval = setInterval(timer, 1000);

            let number = 60;

            function timer() {

                if(allCards.length ===  0) {
                    clearInterval(interval);
                }
        
                if (number > 0) {
                number--;
                TIMER_TEXT.textContent = `У вас осталось ${number} сек`;
                    if (number === 0) {
                        TIMER_TEXT.textContent = 'Вы проиграли';
                    }
                } else {
                    clearInterval(interval);
                    createList.style='display:none;';
                }
            }
        }
    })
})()