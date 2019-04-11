const switcher = document.querySelector('#cbx'),
    more = document.querySelector('.more'),
    modal = document.querySelector('.modal'),
    videos = document.querySelectorAll('.videos__item');
let player;

 function bindSlideToggle(trigger,boxBody,content,openClass){
    let button = {
        'element': document.querySelector(trigger),
        'active': false
    };    
    const  box = document.querySelector(boxBody),
            boxContent = document.querySelector(content);

    button.element.addEventListener('click',() =>{
        if (button.active === false) { // проверяем меню на вкл выкл
            button.active = true;      // еслине акти => вкл
            box.style.height = boxContent.clientHeight + 'px';
            box.classList.add(openClass); // фктивный класс для меню
        }else {
            button.active = false;
            box.style.height = 0 + 'px';
            box.classList.remove(openClass);
        }
    });
 }
bindSlideToggle('.hamburger', '[data-slide="nav"]', '.header__menu', 'slide-active');


function switchMode(){
    if(night===false){
        night = true;
        // document.body.style.backgroundColor ='#000';//меняем боди п\при нажатии на ползунок поиска
        document.body.classList.add('night');
        document.querySelectorAll('.hamburger > line').forEach(item =>{       //здесь красим гамбургер
            item.style.stroke = '#fff';
        });

        document.querySelectorAll('.videos__item-descr').forEach(item =>{       //здесь красим описание под видео
            item.style.color = '#fff';
        });
        document.querySelectorAll('.videos__item-views').forEach(item =>{       //здесь красим кол.просмотров под видео
            item.style.color = '#fff';
        });

        document.querySelector('.header__item-descr').style.color ='#fff';           //здесь меняем цвет nightMore 
        document.querySelector('.logo > img').src = 'logo/youtube_night.svg';       // меняем цвет логотипа ютуб
    }else {
        night = false;
        document.body.classList.remove('night');//обратно меняем на светлый
        document.querySelectorAll('.hamburger > line').forEach(item =>{        //здесь красим гамбургер обратно
            item.style.stroke = '#000';
        }); 
        document.querySelectorAll('.videos__item-descr').forEach(item =>{       //здесь красим описание под видео
            item.style.color = '#000';
        });
        document.querySelectorAll('.videos__item-views').forEach(item =>{       //здесь красим кол.просмотров под видео
            item.style.color = '#000';
        });
        document.querySelector('.logo > img').src = 'logo/youtube.svg';         //меняем цвет логотипа ютуб
        document.querySelector('.header__item-descr').style.color ='#000';      //здесь меняем цвет nightMore
    }
}
let night = false;

switcher.addEventListener('change',()=>{
    switchMode();
});

const data = [
    ['img/thumb_3.webp', 'img/thumb_4.webp', 'img/thumb_5.webp'],
    ['#3 Верстка на flexbox CSS | Блок преимущества и галерея | Марафон верстки | Артема Исламова',
        '#2 Установка spimki  и работа с ветками на Github | Марафон вёрстки Урок 2 ',
        '#1 Верстка реального заказа landing Page | Марафон верстки | Артема Исламова'],
     ['3,4 тыс. просмотров', '4,2 тыс.просмторов', '28 тыс.просмотров'],
     ['X9SmcY3lm-U', '7BvHoh08rMw','mC8JW_aG2EM']
];

more.addEventListener('click', () => {
    const  videosWrapper = document.querySelector('.videos__wrapper');
    more.remove();

    for(let i = 0; i < data[0].length; i++){
        let card =document.createElement('a');
        card.classList.add('videos__item','videos__item-active');
        card.setAttribute('data-url',data[3][i]);
        card.innerHTML = `
            <img src="${data[0][i]}" alt="thumb">
            <div class="videos__item-descr">
                 ${data[1][i]}
            </div>
            <div class="videos__item-views">
                ${data[2][i]} 
            </div>
        `;
        videosWrapper.appendChild(card);
        setTimeout(() => {
            card.classList.remove('videos__item-active');
        },50);
            bindNewModal(card);

    }

    sliceTitle('.videos__item-descr', 100);
});
//фунция обрезания текста под видео 100 символов+ ...
function sliceTitle(selector, count) {
    document.querySelectorAll(selector).forEach(item => {
        item.textContent.trim();

        if (item.textContent.lenght < count){
            return;
        } else {
            const str = item.textContent.slice(0, count +1 ) + "...";
            item.textContent = str;
        }
    });
}
sliceTitle('.videos__item-descr', 100);


//модальное окно при нажатии на видео
function openModal(){
    modal.style.display = 'block';
}

function closeModal(){
    modal.style.display = 'none';
}
//открываем модальное окно при клике
function bindModal(cards){
    cards.forEach(item => {
        item.addEventListener('click', (e) => {
           e.preventDefault();                  //отменяет стандартное поведение браузера
            openModal();
        });
    });
}
bindModal(videos);

function bindNewModal(cards) {                  //получаем карточку
    cards.addEventListener('click', (e) => {    // вешаем на неё клик
        e.preventDefault();                     //отменяет стандартное поведение браузера
         openModal();
     });  
}
//закрывает модал окно вне нажатия на него
modal.addEventListener('click', (e)=>{
    if (!e.target.classList.contains('modal__body')) {
        closeModal();
    }
});

function createVideo(){
    // 2. This code loads the IFrame Player API code asynchronously.
    //загрузка видео с ютуба
    let tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    let firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
};




