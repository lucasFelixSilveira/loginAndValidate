const pages = [ 'home' ];
let string = [
    'userinfos','http://localhost:3030/check_account','application/json','/login','/home'
];
function vl(){
    const userinfos = sessionStorage.getItem(string[0]);
    if( userinfos ) {
        fetch(string[1],{
            method:'POST',
            body:JSON.stringify({
                email:sessionStorage.getItem('email'),
                password:sessionStorage.getItem('password'),
                id:sessionStorage.getItem('userid')
            }),
            headers:{
                'Content-type':string[2]
            }
        }).then(res => res.json()).then(res => {
            if( res.status == 200 ) {
                if(! pages.includes(page) ) location.href=string[4];
            } else {
                if( page !== 'login' ){
                    location.href=string[3];
                    sessionStorage.removeItem('email');
                    sessionStorage.removeItem('password');
                    sessionStorage.removeItem('userid');
                    sessionStorage.removeItem('userinfos');
                }
            }
        })
    } else {
        if( page !== 'login' )location.href=string[3]
    }
} vl();