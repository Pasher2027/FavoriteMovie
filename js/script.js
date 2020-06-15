/* Задания на урок:

1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.  - +

2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки   - +

3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)       - +

4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение:      - +
"Добавляем любимый фильм" 

5) Фильмы должны быть отсортированы по алфавиту                                     - +
*/  
document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против всех",
        ]
    };

    let adv = document.querySelectorAll('.promo__adv img'), //Блоки рекламы
        poster = document.querySelector('.promo__bg'), //Фоновая картинка
        genre = poster.querySelector('.promo__genre'), //Название жанра
        movieList = document.querySelector('.promo__interactive-list'), //Список фильмов
        addForm = document.querySelector('form.add'),
        addInput = addForm.querySelector('.adding__input'), //Поле для ввода просмотренных фильмов
        addButton = addForm.querySelector('button'), //Кнопка на добавление фильма
        checkbox = document.querySelector('[type="checkbox"]'); //Проверка на Любимый фильм




    // Удаление блоков рекламы 

    addForm.addEventListener('submit',  (e) => {
        e.preventDefault();

        let newFilm = addInput.value;
        const favorite = checkbox.checked;

        if (newFilm) {

            if (newFilm.length > 21) {
                newFilm = `${newFilm.substring(0, 22)}...`;
            }

            movieDB.movies.push(newFilm);
            sortArr(movieDB.movies);
    
            createMovieList(movieDB.movies, movieList); 
        }

        if (favorite) {
            console.log("Добавляем любимый фильм");
        }


        e.target.reset();

    });  

    
    const deleteAdv = (arr) => {
        arr.forEach(item => {
            item.remove();
        });
    };

    const makeChanges = () => {
        genre.textContent = 'драма';

        poster.style.backgroundImage = 'url("img/bg.jpg")';
    };

    const sortArr = (arr) => {
        arr.sort();
    };

    function createMovieList(films, parent) {

        parent.innerHTML = "";

        sortArr(films);
        
        films.sort();

        films.forEach( (film, i) => {
            parent.innerHTML += `
                <li class="promo__interactive-item">${++i} ${film}
                    <div class="delete"></div>
                </li>`;
        });
        document.querySelectorAll('.delete').forEach((btn, i) => {
            btn.addEventListener('click', () => {
                btn.parentElement.remove();
                films.splice(i, 1);
                createMovieList(films, parent); 
            });
        });
    }


    deleteAdv(adv);
    makeChanges();
    createMovieList(movieDB.movies, movieList);

    // };

    // function deleteElement() {
    //     //Поиск всех "Корзин"
    //     let del = document.querySelectorAll('.delete');

    //     //Обработка массива всех "Корзин"
    //     del.forEach(btn => {

    //         // Добавление события "Клика"
    //         btn.addEventListener('click', (e) => {
    //             //Удаление элемента из массива
    //             let previousName = e.target.parentElement.textContent.slice(3),
    //                 i = 0;

    //             for (let filmName of movieDB.movies) {

    //                 if (filmName == previousName) {
    //                     delete movieDB.movies[i];
    //                     break;
    //                 }

    //                 i++;
    //             }

                
    //             // //Удаление объекта из HTML

    //             clearList(movieDB.movies, movieList);

    //             deleteElement();
    //         });
        
    //     });

    // }

    // //Укорачивание имени
    // function shortName(arr) {
        
    //     for (let filmName of arr) {

    //         if (filmName.length > 21) {
    //             filmName = filmName.slice(0, 21) + '...';
    //         }
    //     }
    // }

    // function addFilm() {

    //     addButton.addEventListener('click',  (e) => {
    //         e.preventDefault();
        
    //         if (checkbox.checked == true) {
    //             console.log("Добавляем любимый фильм");
    //         }
        
    //         if (addInput.value != "") {
    //             movieDB.movies.push(addInput.value);
    //         }
            
            
    //         movieDB.movies.sort();

    //         addInput.value = "";
        
    //         clearList(movieDB.movies, movieList);
            
    //         deleteElement();
        
    //     });  
    // }

   

}); //Документ загружен