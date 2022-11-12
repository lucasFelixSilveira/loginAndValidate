const plugout = document.querySelector('.screen');
setTimeout(() => {
    const divContectsElement = document.createElement('div')
    const divMessageElement = document.createElement('div')
    const divContects = plugout.appendChild(divContectsElement)
    divContects.classList.add('contact')
    const divMessage = plugout.appendChild(divMessageElement)
    divMessage.classList.add('message-conteiner')
    document.querySelector('.inputsWithJS').innerHTML = `<link rel="stylesheet" href="./css/homePc.css">`
    divContects.innerHTML = `
        <div class="top-list-header">
            <button id="add">
                <ion-icon name="person-add-outline"></ion-icon> Adicionar
            </button>
        </div>
    `
    setTimeout(() => {
        infos.contacts.forEach((item, index) => {
            divContects.innerHTML = divContects.innerHTML + `
                <div class="contato">
                    <div class="align-items">
                        <ion-icon name="person-circle-outline" id="user"></ion-icon>
                    </div>
                    <div class="align-items">
                        <div>
                            <p class="name">
                                ${item.username}
                            </p>
                            <p class="lastMsg">
                                ${item.lastMessage}
                            </p>
                        </div>
                    </div>
                </div>
            `
        }) 
    }, 1000)
}, 1000)