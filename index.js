console.clear();
const express = require('express');
const app = express();

const env = require('./src/env.json')
const FIreray = require('fireray')
const firebase = require('firebase')
firebase.initializeApp(env['firebase'])
const db = firebase.database();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({ extended: false })

let member = 'undefined';
let firstAcess = true;

app.use(express.json());
app.use(express.static(__dirname + '/src/public'));

// require('./src/routes.js')(db, app, express)

app.get('/', (request, response) => {
    response.render(__dirname + `/src/views/index.ejs`, {
        page: 'index'
    })
})

app.get('/login', (request, response) => {
    response.render(__dirname + `/src/views/login.ejs`, {
        page: 'login'
    })
})

app.get('/register', (request, response) => {
    response.render(__dirname + `/src/views/register.ejs`, {
        page: 'register'
    })
})

app.get('/home', (request, response) => {
    response.render(__dirname + `/src/views/home.ejs`, {
        page: 'home'
    })
})

app.post('/check_account', urlencodedParser, async (request, response) => {
    const infos = request.body;
    console.log(infos)
    let email = infos.email;
    const emailS = email.split('')
    let tof = false;
    const permitido = [
        'a', 'b', 'c', 'd', 'e', 
        'f', 'g', 'h', 'i', 'j',
        'k', 'l', 'm', 'n', 'o',
        'p', 'q', 'r', 's', 't', 
        'u', 'v', 'w', 'x', 'y',
        'z', '0', '1', '2', '3',
        '4', '5', '6', '7', '8',
        '9', '.', '@', '+', '-'
    ]
    emailS.forEach((item, index) => {
        if(! permitido.includes(item) ) tof = true;
        if( index == ( emailS.length - 1 ) && tof == false ) looping();
        if( index == ( emailS.length - 1 ) && tof == true) return response.send({status: 404});
    })

    function looping() {
        if( email.includes('.') ) {
            email = email.replace('.', '{-dot=true-}')
            looping()
        } else nextPass();
    }

    function nextPass() {
        db.ref(`lsmg/users/${email}`)
            .once('value')
            .then(x => exec(x))

        function exec(x) {
            if( x.val() == null ) return response.send({status: 404})
            else {
                if( x.val().password == infos.password ) {
                    if( x.val().id == infos.id ) {
                        member = infos.id;
                        return response.send({status: 200})
                    } else return response.send({status: 404})
                } else return response.send({status: 404})
            }
        }
    }
})

app.post('/check_login', urlencodedParser, async (request, response) => {
    const infos = request.body;
    console.log(infos)
    let email = infos.email;
    const emailS = email.split('')
    let tof = false;
    const permitido = [
        'a', 'b', 'c', 'd', 'e', 
        'f', 'g', 'h', 'i', 'j',
        'k', 'l', 'm', 'n', 'o',
        'p', 'q', 'r', 's', 't', 
        'u', 'v', 'w', 'x', 'y',
        'z', '0', '1', '2', '3',
        '4', '5', '6', '7', '8',
        '9', '.', '@', '+', '-'
    ]
    emailS.forEach((item, index) => {
        if(! permitido.includes(item) ) tof = true;
        if( index == ( emailS.length - 1 ) && tof == false ) looping();
        if( index == ( emailS.length - 1 ) && tof == true) return response.send({status: 404, error: 'Email inválido.'});
    })

    function looping() {
        if( email.includes('.') ) {
            email = email.replace('.', '{-dot=true-}')
            looping()
        } else nextPass();
    }

    function nextPass() {
        db.ref(`lsmg/users/${email}`)
            .once('value')
            .then(x => exec(x))

        function exec(x) {
            if( x.val() == null ) return response.send({status: 404, error: 'O email fornecido não está registrado.'})
            else {
                if( x.val().password == infos.pass ) return response.send({status: 200, userDate: { email: x.val().email, password: infos.pass, id: x.val().id }})
                else return response.send({status: 404, error: 'A senha forneccida está incorreta.'})
            }
        }
    }
})

app.post('/create_account', urlencodedParser, async (request, response) => {
    const infos = request.body;
    console.log(infos)
    let email = infos.email;
    const emailS = email.split('')
    let tof = false;
    const permitido = [
        'a', 'b', 'c', 'd', 'e', 
        'f', 'g', 'h', 'i', 'j',
        'k', 'l', 'm', 'n', 'o',
        'p', 'q', 'r', 's', 't', 
        'u', 'v', 'w', 'x', 'y',
        'z', '0', '1', '2', '3',
        '4', '5', '6', '7', '8',
        '9', '.', '@', '+', '-'
    ]
    emailS.forEach((item, index) => {
        if(! permitido.includes(item) ) tof = true;
        if( index == ( emailS.length - 1 ) && tof == false ) looping();
        if( index == ( emailS.length - 1 ) && tof == true) return response.send({status: 404, error: 'Email inválido.'});
    })

    function looping() {
        if( email.includes('.') ) {
            email = email.replace('.', '{-dot=true-}')
            looping()
        } else nextPass();
    }

    function nextPass() {
        db.ref(`lsmg/users/${email}`)
            .once('value')
            .then(x => exec(x))

        function exec(x) {
            if( x.val() == null ){
                var array;
                eval(
                    FIreray.get(db, `lsmg/users`, {
                        var: 'array', exe: 'nextTick'
                    })
                )
                function nextTick() {
                    if( array == undefined ) array = [];
                    db.ref(`lsmg/users/${email}`)
                        .set(
                            {
                                email: infos.email,
                                password: infos.pass,
                                id: array.length,
                                username: infos.username
                            }
                        )
                    FIreray.push(db, 'lsmg/users', { email: infos.email, password: infos.pass, id: array.length, username: infos.username, contatos: [] })
                    response.send({status: 200, id: array.length})
                }
            } else response.send({status: 404, error: 'Esse email já está registrado.'})
        }
    }
})

app.post('/rest_infos', urlencodedParser, async (request, response) => {
    const body = request.body;
    let array;
    eval(
        FIreray.get(db, `lsmg/contacts/${body.id}`, {
            var: 'array', exe: 'contact'
        })
    )
    function contact() {
        let contact = []
        if( array == undefined && body.id == '0' ) contact = [{username: 'LSMG', lastMessage: 'Bem vindo!', lasuser: 'other'}];
        else if( array == undefined && body.id !== '0' ) contact = [];
        else contact = array
        console.log(body)
        response.send({
            infos: {
                contacts: contact
            }
        })
    }
})

app.listen(3030, () => {
    console.log(`[Servidor] Servidor online!`)
})