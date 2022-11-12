fetch('http://localhost:3030/rest_infos', {
    method: 'POST',
    headers: {
        'content-type': 'application/json'
    },
    body: JSON.stringify({
        id: sessionStorage.getItem('userid'),
        type: 'get'
    })
}).then(res => res.json()).then(
    res => {
        infos = res.infos
    }
)

console.log(sessionStorage.getItem('userid'))