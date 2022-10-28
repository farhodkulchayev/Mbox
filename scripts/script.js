// let tv = new Swiper(`.trend__tv-slider`, {
//     slidesPerView: 1,
//     spaceBetween: 27,
//     // slidesPerGroup: 3,
//     loop: true,
//     // loopFillGroupWithBlank: true,
//     navigation: {
//         nextEl: `.trend__tv-slider .swiper-button-next`,
//         prevEl: `.trend__tv-slider .swiper-button-prev`,
//     },
//     breakpoints: {
//         1440: {
//             slidesPerView: 6,
//         },
//         1200: {
//             slidesPerView: 5,
//         },
//         960: {
//             slidesPerView: 4,
//         },
//         720: {
//             slidesPerView: 3,
//         },
//         500: {
//             slidesPerView: 2,
//         },
//     }
// });

// let awaited = new Swiper(`.popular__actors-slider`, {
//     slidesPerView: 1,
//     spaceBetween: 27,
//     // slidesPerGroup: 3,
//     loop: true,
//     // loopFillGroupWithBlank: true,
//     navigation: {
//         nextEl: `.popular__actors-slider .swiper-button-next`,
//         prevEl: `.popular__actors-slider .swiper-button-prev`,
//     },
//     breakpoints: {
//         1440: {
//             slidesPerView: 6,
//         },
//         1200: {
//             slidesPerView: 5,
//         },
//         960: {
//             slidesPerView: 4,
//         },
//         720: {
//             slidesPerView: 3,
//         },
//         500: {
//             slidesPerView: 2,
//         },
//     }
// });

const searchLink = document.querySelector(".search__link .icon-reg"),
    mainContent = document.querySelector(".main__content"),
    mainClose = document.querySelectorAll(".main__close"),
    mainBlock = document.querySelector(".main__block"),
    mainSolo = document.querySelector(".main__solo"),
    moviesLink = document.querySelectorAll(".movies__link"),
    formMain = document.querySelector(".form__main"),
    formInput = document.querySelector(".header__input"),
    anime = document.querySelector(".anime"),
    pagination = document.querySelector(".pagination"),
    headerBtn = document.querySelector(".header__btn"),
    headerAbs = document.querySelector(".header__abs"),
    headerItem = document.querySelector(".header__items");

// menu burger

headerBtn.addEventListener("click", function (e) {
    e.preventDefault()
    this.classList.toggle("active")
    headerItem.classList.toggle("active")
    headerAbs.classList.toggle("active")
    body.classList.toggle("active")
})

headerAbs.addEventListener("click", function (e) {
    if (e.target === e.currentTarget) {
        this.classList.remove("active")
        headerBtn.classList.remove("active")
        headerItem.classList.remove("active")
        body.classList.remove("active")
    }
})

// menu burger

// host

const host = "https://kinopoiskapiunofficial.tech";
const hostName = "X-API-KEY";
const hostValue = "1ac59e9f-c69c-446f-ae09-964b2f041c96";

class Kino {
    constructor() {
        this.date = new Date().getMonth();
        this.curYear = new Date().getFullYear();
        this.months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
        this.curMonth = this.months[this.date];
    }

    fOpen = async (url) => {
        let response = await fetch(url, {
            headers: {
                [hostName]: hostValue
            }
        })

        if (response.ok) return response.json();
        else throw new Error(`Cannot access to ${url}`)
    }

    getTopMovies = (page = 1) => this.fOpen(`${host}/api/v2.2/films/top?type=TOP_250_BEST_FILMS&page=${page}`);
    getSoloFilm = (id) => this.fOpen(`${host}/api/v2.1/films/${id}`);
    getMostAwaited = (page = 1, year = this.curYear, month = this.curMonth) => this.fOpen(`${host}/api/v2.1/films/releases?year=${year}&month=${month}&page=${page}`);
    getReviews = (id) => this.fOpen(`${host}/api/v2.2/films/${id}/reviews?page=1&order=DATE_DESC`);
    getFrames = (id) => this.fOpen(`${host}/api/v2.2/films/${id}/images?type=STILL&page=1`);
    getSearch = (page = 1, keyword) => this.fOpen(`${host}/api/v2.1/films/search-by-keyword?keyword=${keyword}&page=${page}`);
    getPremier = (year = this.curYear, month = this.curMonth) => this.fOpen(`${host}/api/v2.2/films/premieres?year=${year}&month=${month}`);
}

const db = new Kino()

// db.getTopMovies().then(res => {
//     console.log(res);
// })

// db.getSoloFilm(1015471).then(res => {
//     console.log(res);
// })

// db.getMostAwaited().then(res => {
//     console.log(res);
// })

// db.getReviews(435).then(res => {
//     console.log(res);
// })

// db.getFrames(435).then(res => {
//     console.log(res);
// })

// db.getPremier().then(res => {
//     console.log(res);
// })

// host

// render Trend movies

function renderTrendMovies(elem = [], fn = [], films = [], pages = []) {
    anime.classList.add("active");
    elem.forEach((item, i) => {
        let parent = document.querySelector(`${item} .swiper-wrapper`);
        db[fn[i]](pages[i]).then(data => {
            // console.log(data);
            data[films[i]].forEach(el => {
                // console.log(el);
                let slide = document.createElement("div");
                slide.classList.add("swiper-slide");
                slide.innerHTML = `
                    <div class="movie__item" data-id="${el.filmId}">
                        <img src="${el.posterUrlPreview}" alt="${el.nameEn || el.nameRu}" loading="lazy">
                    </div>
                `
                parent.append(slide);
            });
            anime.classList.remove("active");
        })
        .then(() => {
            elem.forEach(item => {
                new Swiper(`${item}`, {
                    slidesPerView: 1,
                    spaceBetween: 27,
                    // slidesPerGroup: 3,
                    // loop: true,
                    // loopFillGroupWithBlank: true,
                    navigation: {
                        nextEl: `${item} .swiper-button-next`,
                        prevEl: `${item} .swiper-button-prev`,
                    },
                    breakpoints: {
                        1440: {
                            slidesPerView: 6,
                        },
                        1200: {
                            slidesPerView: 5,
                        },
                        960: {
                            slidesPerView: 4,
                        },
                        720: {
                            slidesPerView: 3,
                        },
                        500: {
                            slidesPerView: 2,
                        },
                    }
                });
            });
        })
        .then(() => {
            let movieItem = document.querySelectorAll(".movie__item");
            movieItem.forEach(item => {
                item.addEventListener("click", function (e) {
                    e.preventDefault();
                    let attr = this.getAttribute("data-id");
                    openSoloFilm(e);
                    renderSolo(attr);
                })
            })
        })
        .catch(e => {
            console.error(e);
            anime.classList.remove("active");
        })
    });
}

renderTrendMovies([".trend__tv-slider", ".popular__actors-slider"], ["getTopMovies", "getMostAwaited"], ["films", "releases"], [1, 1]);

// render Trend movies

// rand

function randMovies(num) {
    return Math.trunc(Math.random() * num + 1)
}

// rand

// render header

function renderHeader(page) {
    db.getTopMovies(page).then(data => {
        // console.log(data);
        anime.classList.add("active");
        let max = randMovies(data.films.length);
        let filmId = data.films[max].filmId;
        let filmRating = data.films[max].rating;
        db.getSoloFilm(filmId).then(response => {
            console.log(response);
            let info = response.data;
            let headerText = document.querySelector(".header__text");
            let url = info.webUrl.split("kinopoisk").join("kinopoiskk");
            headerText.innerHTML = `
                <h1 class="header__title">${info.nameRu || info.nameEn}</h1>
                <div class="header__balls">
                    <span class="header__year">${info.year}</span>
                    <span class="logo__span header__rating  header__year">${info.ratingAgeLimits}+</span>
                    <div class="header__seasons header__year">${info.seasons.length > 0 ? info.seasons[0] : ""}</div>
                        <div class="header__stars header__year"><span class="icon-solid"></span><strong>${filmRating}</strong>
                    </div>
                </div>
                <p class="header__descr">
                    ${info.description}
                </p>
                <div class="header__buttons">
                    <a href="${url}" target="_blank" class="header__watch"><span class="icon-solid"></span>watch</a>
                    <a href="#!" class="header__more header__watch movie__item" data-id="${info.filmId}">More information</a>
                </div>
            `
            anime.classList.remove("active");
        })
        .then(() => {
            let headerMore = document.querySelector('.header__more');
            headerMore.addEventListener("click", function (e) {
                e.preventDefault();
                let attr = this.getAttribute("data-id");
                openSoloFilm(e);
                renderSolo(attr);
            })
        })
    })
}

let page = 13;
let rand = randMovies(page)
renderHeader(rand)

// render header

// current date

const popularActorsTitle = document.querySelector('.popular__actors-title strong');
const comingSoonBlock = document.querySelector('.coming__soon-block > img');
const year = document.querySelector('.year');

popularActorsTitle.innerHTML = `${db.curMonth} ${db.curYear}`;
year.innerHTML = `${db.curYear}`;

db.getPremier().then(res => {
    let rand = randMovies(res.total);
    comingSoonBlock.src = res.items[rand].posterUrlPreview
})

// current date

// open solo film

function openSoloFilm(e) {
    e.preventDefault();
    mainContent.classList.add("active");
    body.classList.add("active");
}

mainClose.forEach(closes => {
    closes.addEventListener("click", function (e) {
        e.preventDefault();
        mainContent.classList.remove("active");
        body.classList.remove("active");
    })
});

// open solo film

// render solo

async function renderSolo(id) {
    mainBlock.innerHTML = "";
    pagination.innerHTML = "";
    anime.classList.add("active");
    (async function () {
        const [reviews, frames, solo] = await Promise.all([
            db.getReviews(id),
            db.getFrames(id),
            db.getSoloFilm(id),
        ])
        return { reviews, frames, solo };
    })()
    .then(res => {
        console.log(res);
        let solo = res.solo.data;
        let genres = solo.genres.reduce((acc, item) => acc + `${item.genre} `, '');
        let countries = solo.countries.reduce((acc, item) => acc + `${item.country} `, '');
        let facts = "";
        let frames = "";
        let reviews = "";
        
        let fact = solo.facts.slice(0, 5);
        // console.log(fact);
        fact.forEach((item, i) => {
            facts += `<li class="solo__facts">${i+1}: ${item}</li>`;
        })
        
        let frame = res.frames.items.slice(0, 8);
        frame.forEach(item => {
            frames += `<img src="${item.previewUrl}" alt="" loading="lazy">`
        });
        
        let review = res.reviews.items.slice(0, 10);
        review.forEach(item => {
            reviews += `
                <div class="review__item">
                    <span>${item.author}</span>
                    <p class="review__descr">${item.description}</p>
                </div>
            `
        })
        let url = `https://www.kinopoiskk.ru/film/${solo.filmId}`;
        // console.log(url);
        let div = `
        <div class="solo__img">
            <img src="${solo.posterUrlPreview}" alt="">
            <a href="${url}" target="_blank" class="solo__link header__watch">Смотреть фильм</a>
        </div>
        <div class="solo__content">
            <h3 class="solo__title trend__tv-title">${solo.nameRu || solo.nameEn}</h3>
            <ul>
                <li class="solo__countries">Страны: ${countries}</li>
                <li class="solo__genres">Жанры: ${genres}</li>
                <li class="solo__dur">Продолжительность: ${solo.filmLength != null ? solo.filmLength : "Неизвестно"}</li>
                <li class="solo__year">Год: ${solo.year}</li>
                <li class="solo__premiere">Мировая премьера: ${solo.premiereWorld}</li>
                <li class="solo__rating">Возрастной рейтинг: ${solo.ratingAgeLimits != null ? solo.ratingAgeLimits + "+" : "Неизвестно"}</li>
                <li class="solo__slogan">Слоган: ${solo.slogan != null ? solo.slogan : "Неизвестно"}</li>
                <li class="solo__descr header__descr">Описание: ${solo.description != null ? solo.description : "Неизвестно"}</li>
            </ul>
        </div>
        <div class="solo__facts">
            <h3 class="trend__tv-title">Интересные факты</h3>
            ${facts}
        </div>
        <h3 class="trend__tv-title">Кадры из фильма</h3>
        <ul class="solo__images">${frames}</ul>
        <div class="solo__reviews">
            <h3 class="trend__tv-title">Отзывы</h3>
            ${reviews}
        </div>
        `
        mainSolo.innerHTML = div;
        anime.classList.remove("active");
    })
    .catch(e => {
        console.log(e);
        anime.classList.remove("active");
    })
}

// render solo

// search movie

searchLink.addEventListener("click", function (e) {
    e.preventDefault();
    openSoloFilm(e);
})

formMain.addEventListener("submit", function (e) {
    e.preventDefault();
    // anime.classList.add("active");
    renderCards(1, formInput.value, 'getSearch');
})

// search movie

// render cards

function renderCards(page = 1, value = "", fn = "getTopMovies") {
    mainBlock.innerHTML = "";
    mainSolo.innerHTML = "";
    db[fn](page, value).then(data => {
        if (data.films.length > 0) {
            data.films.forEach(item => {
                let someItem = document.createElement("div");
                someItem.classList.add("some__item");
                someItem.innerHTML = `
                <div class="some__img">
                    <img src="${item.posterUrlPreview}" alt="" loading="lazy">
                    <span class="some__rating">${item.rating != null ? item.rating : 0}</span>
                </div>
                <h3 class="some__title">${item.nameRu || item.nameEn}</h3>
                `
                someItem.setAttribute("data-id", item.filmId);
                mainBlock.append(someItem);
            });
        } else {
            mainBlock.innerHTML = `<p class="undefined">Ничего не найдено</p>`;
        }
    })
    .then(() => {
        let film = document.querySelectorAll(".some__item");
        film.forEach(item => {
            item.addEventListener("click", function () {
                let attr = this.getAttribute("data-id");
                renderSolo(attr);
            })
        })
    })
}

// render cards