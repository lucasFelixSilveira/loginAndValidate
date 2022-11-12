const string = [
     'http://localhost:3030/create_account','/home','application/json','.error','userinfos' 
];
function vl(){
    const email = document.querySelector('input[type=email]').value;
    const username = document.querySelector('input[type=text]').value;
    const senha = document.querySelector('input[type=password]').value;
    fetch(string[0],{
        method: 'POST',
        body: JSON.stringify({
            pass:senha,
            email:email,
            username:username
        }),
        headers: {
            'Content-type': string[2]
        }
    }).then(res => res.json()).then(res => {
        if( res.status == 200 ) {
            location.href=string[1];
            sessionStorage.setItem('userid',res.id);
            sessionStorage.setItem('email',email);
            sessionStorage.setItem('password',senha);
            sessionStorage.setItem('userinfos',true);
        } else {
            er(res.error)
        }
    })
}
const keys={
    Enter: () => vl()
};
document.addEventListener('keydown', (event) => {
    const func = keys[event.key];
    if(! func ) return;
    func()
});
function er(x){
    document.querySelector(string[3]).innerHTML=x;
    console.warn(x)
}