const string_ = [
    'http://localhost:3030/check_login','/home','application/json','.error','userinfos'
];
function vl2(){
    const email = document.querySelector('input[type=email]').value;
    const senha = document.querySelector('input[type=password]').value;
    fetch(string_[0],{
        method:'POST',
        body:JSON.stringify({pass:senha,email:email}),
        headers:{'Content-type':string_[2]}
    }).then(res => res.json()).then(res => {
        if(res.status==200) {
            sessionStorage.setItem('email',res.userDate.email);
            sessionStorage.setItem('password',res.userDate.password);
            sessionStorage.setItem('userid',res.userDate.id);
            sessionStorage.setItem(string_[4],true);
            setTimeout(() => {
                location.href=string_[1]
            },1000)
        }else{
            er(res.error)
        }
    })
}
const keys={
    Enter: () => vl2() 
};
document.addEventListener('keydown', (event) =>{
    const func = keys[event.key];
    if(!func) return;
    func()
});

function er(x){
    document.querySelector(string_[3]).innerHTML=x;
    console.warn(x)
}