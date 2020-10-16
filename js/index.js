let cats = document.querySelector('.cats')
let profileCatContainer = document.querySelector('.profileCatContainer')
let btnAddCat = document.querySelector('.btnAddCat')

// Получение данных с сервера
let promice = getImages()
promice.then(onDataReceived)

// Объект в который будут записаны данные получшенные с сервера
let arrCats = {}

function onDataReceived(data) {
    arrCats = data
    start()
}

function start() {
    cats.innerHTML = ''
    for (i of arrCats) {
        let cat = `<div class='cat'>
                        <div class="voiceCounted">Ваш голос учтён!</div>
                        <div class="imgItem">
                            <div class="goToCard">Перейти в карточку котика</div>
                            <div class="img">
                                <img src="${i.img}"/>
                            </div>
                        </div>
                        <div class="spec">
                            <div><b>Имя котика:</b> <span class="name">${i.name}</span></div>
                            <div><b>Номер котика:</b> <span class="id">${i._id}</span></div>
                            <div><b>Лайков:</b> <span class="like">${i.like}</span></div>
                        </div>
                        <div class="btnEstimate">
                            <div><button class="addLike">Лайк</button></div>
                            <div><button class="addDislike">Дизлайк</button></div>
                        </div>
                    </div>`
        cats.insertAdjacentHTML("beforeend", cat)
    }

    addLikeCat()
    addDislikeCat()
    selectProfileCat()
    addNewCat()
}

// Добавление лайка
function addLikeCat() {
    let addLikeBtn = document.querySelectorAll('.addLike')
    let voiceCounted = document.querySelectorAll('.voiceCounted')

    addLikeBtn.forEach(el => {
        el.onclick = event => {
            let id = event.target.parentNode.parentNode.parentNode.children[2].children[1].children[1].textContent
            id = id - 1
            voiceCounted[id].style.top = 0
            setTimeout(() => {
                voiceCounted[id].style.top = '-50px'
            }, 2000)
        }
    })
}

// Добавление дизлайка
function addDislikeCat() {
    let addDislikeBtn = document.querySelectorAll('.addDislike')
    let voiceCounted = document.querySelectorAll('.voiceCounted')

    addDislikeBtn.forEach(el => {
        el.onclick = function (event) {
            let id = event.target.parentNode.parentNode.parentNode.children[2].children[1].children[1].textContent
            id = id - 1
            voiceCounted[id].style.top = 0
            setTimeout(() => {
                voiceCounted[id].style.top = '-50px'
            }, 2000)
        }
    })
}

// Выбрать профиль котика
function selectProfileCat() {
    let imgItem = document.querySelectorAll('.imgItem')

    imgItem.forEach(el => {
        el.onmouseover = function () {
            let card = this.children[0]
            card.style.opacity = '1'
        }

        el.onmouseout = function () {
            let card = this.children[0]
            card.style.opacity = '0'
        }

        el.onclick = event => {
            let id = event.target.parentNode.parentNode.children[2].children[1].children[1].textContent
            id = id - 1
            profileCat(arrCats[id].img, arrCats[id].name, arrCats[id]._id, arrCats[id].description, arrCats[id].like)
            profileCatContainer.style.display = 'flex'
        }
    })
}

// Профиль котика
function profileCat(img, name, id, description, like) {
    let profile = `
            <div class="profileCat">
                <div class="imgCat">
                    <img src=${img}>
                </div>
                <div class="obj">
                    <div class="specific">
                        <div><b>Имя котика:</b> <span class="nameProfile">${name}</span></div>
                        <div><b>Номер котика:</b> <span class="idProfile">${id}</span></div>
                        <div><b>Описание котика:</b> <span class="descriptionProfile">${description}</span></div>
                        <div><b>Лайков:</b> <span class="likeProfile">${like}</span></div>
                    </div>
                    <div class="confirm">
                        Вы точно хотите удалить котика ?
                        <div class="btnsConfirm">
                            <button class="btnYes">Да</button>
                            <button class="btnNo">Нет</button>
                        </div>
                    </div>
                    <div class="btnsProfileCat">
                        <button class="btnRemove">Удалить</button>
                        <button class="btnChangeCat">Изменить</button>
                    </div>
                </div>
                <button class="btnClose">X</button>
            </div>
    `
    profileCatContainer.innerHTML = ''
    profileCatContainer.insertAdjacentHTML('beforeend', profile)

    let btnClose = document.querySelector('.btnClose')

    btnClose.onclick = () => {
        profileCatContainer.style.display = 'none'
    }

    removeCat()
    changeProfileCat()
}

// Удаление котика
function removeCat() {
    let btnRemove = document.querySelector('.btnRemove')
    let confirm = document.querySelector('.confirm')
    let btnYes = document.querySelector('.btnYes')
    let btnNo = document.querySelector('.btnNo')

    btnRemove.onclick = (event) => {
        confirm.style.display = 'flex'

        btnYes.onclick = () => {
            let id = event.target.parentNode.parentNode.children[0].children[1].children[1].textContent
            id = +id - 1
            delete arrCats[id]

            arrCats = arrCats.filter(item => { return item }); // Удаление пустых элементов из объекта

            let count = 1
            arrCats.forEach(el => {
                el._id = count
                count++
            })
            profileCatContainer.style.display = 'none'
            start()
        }

        btnNo.onclick = () => {
            confirm.style.display = 'none'
        }
    }
}

// Добавление нового котика
let addName = document.querySelector('.addName')
let addDescription = document.querySelector('.addDescription')
let addUrl = document.querySelector('.addUrl')
let btnAddCatSave = document.querySelector('.btnAddCatSave')
let addCat = document.querySelector('.addCat')

let btnCloseAdd = document.querySelector('.btnCloseAdd')

function addNewCat() {
    btnAddCat.onclick = () => {
        addCat.style.top = '200px'

        setInterval(() => {
            if (addName.value.trim() === '' || addDescription.value.trim() === '' || addUrl.value.trim() === '') {
                btnAddCatSave.setAttribute("disabled", "disabled");
            }
            else {
                btnAddCatSave.removeAttribute("disabled");
            }
        }, 100);

        btnAddCatSave.onclick = () => {
            addCat.style.top = '-200px'
            let newCat = {
                _id: 0,
                name: addName.value,
                description: addDescription.value,
                img: addUrl.value,
                like: 0
            }
            arrCats[arrCats.length] = newCat
            let count = 1
            arrCats.forEach(el => {
                el._id = count
                count++
            })
            addName.value = ''
            addDescription.value = ''
            addUrl.value = ''
            start()
        }

        btnCloseAdd.onclick = () => addCat.style.top = '-200px'
    }
}

// Изменить данные котика
function changeProfileCat() {
    let btnChangeCat = document.querySelector('.btnChangeCat')
    btnChangeCat.onclick = (event) => {
        let id = event.target.parentNode.parentNode.children[0].children[1].children[1].textContent
        id = +id - 1
        changeThisCat(id)
    }
}

// Изменение котика
let changeName = document.querySelector('.changeName')
let changeDescription = document.querySelector('.changeDescription')
let changeUrl = document.querySelector('.changeUrl')
let btnChangeCatSave = document.querySelector('.btnChangeCatSave')
let changeCat = document.querySelector('.changeCat')

let btnCloseChnage = document.querySelector('.btnCloseChnage')

function changeThisCat(id) {

    changeCat.style.top = '40%'
    changeName.value = arrCats[id].name
    changeDescription.value = arrCats[id].description
    changeUrl.value = arrCats[id].img

    setInterval(() => {
        if (changeName.value.trim() === '' || changeDescription.value.trim() === '' || changeUrl.value.trim() === '') {
            btnChangeCatSave.setAttribute("disabled", "disabled");
        }
        else {
            btnChangeCatSave.removeAttribute("disabled");
        }
    }, 100);

    btnChangeCatSave.onclick = () => {
        arrCats[id].name = changeName.value
        arrCats[id].description = changeDescription.value
        arrCats[id].img = changeUrl.value
        changeCat.style.top = '-200px'
        profileCatContainer.style.display = 'none'
        start()
    }

    btnCloseChnage.onclick = () => changeCat.style.top = '-200px'
}