const btnLogWriter = document.querySelector('#btnLogWriter');
const btnLogManager = document.querySelector('#btnLogManager');
const btnLogAdmin = document.querySelector('#btnLogAdmin');
const btnRegAdmin = document.querySelector('#btnRegAdmin');

//   LOG WRITER
btnLogWriter.addEventListener('click',(e)=>{
    e.preventDefault();

    let pop = [prompt('username'), prompt('password')];

    if( pop[0] === null && pop[1] === null ){
            alert('Try again')
    }

    else if ( pop[0] === "" || pop[1] === "" ) {
        alert('Fill all the Inputs !!')
    }

    else {
        let username = pop[0];
        let password = pop[1];

        $.ajax({
            type: 'get',
            url: `/api/writerlogin/${username}/${password}/`,
            data: {
                username: username,
                password: password
            },
            success: function (data) {
                window.localStorage.setItem('LoggedWriter', username);
                window.localStorage.setItem('WriterToken', data.token);
                window.location.href = '/home/';
            },
            error: function (err) {
                alert('Access Denied !!');
            }

        })
    }

});

//   LOG Manager
btnLogManager.addEventListener('click',(e)=>{
    e.preventDefault();

    let pop = [prompt('username'), prompt('password')];

    if( pop[0] === null && pop[1] === null ){
            alert('Try again')
    }

    else if ( pop[0] === "" || pop[1] === "" ) {
        alert('Fill all the Inputs !!')
    }

    else {
        let username = pop[0];
        let password = pop[1];

        $.ajax({
            type: 'get',
            url: `/api/managerlogin/${username}/${password}/`,
            data: {
                username: username,
                password: password
            },
            success: function (data) {
                window.localStorage.setItem('LoggedManager', username);
                window.localStorage.setItem('ManagerToken', data.token);
                window.location.href = '/management/';
            },
            error: function (err) {
                alert('Access Denied !!')
            }

        })
    }

});


//   LOG Admin
btnLogAdmin.addEventListener('click',(e)=>{
    e.preventDefault();

    let pop = [prompt('username'), prompt('password')];

    if( pop[0] === null && pop[1] === null ){
            alert('try again')
    }

    else if ( pop[0] === "" || pop[1] === "" ) {
        alert('Fill all the Inputs !!')
    }

    else {
        let username = pop[0];
        let password = pop[1];

        $.ajax({
            type: 'post',
            url: '/api/auth/',
            data: {
                username: username,
                password: password
            },
            success: function (data) {

                window.localStorage.setItem('LoggedAdmin', username);
                window.localStorage.setItem('AdminToken', data.token);
                window.location.href = '/administration/';
            },
            error: function (err) {
                alert('Access Denied !!');
            }

        })
    }

});


//   Register Admin
btnRegAdmin.addEventListener('click',(e)=>{
    e.preventDefault();

    let pop = [prompt('Username'), prompt('Email'), prompt('Password'), prompt('Confirm Password')];

    function validateEmail(email) {
        let re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    if( pop[0] === null && pop[1] === null && pop[2] === null && pop[3] === null ){
            alert('Try Again..')
    }

    else if ( pop[0] === "" || pop[1] === "" || pop[2] === "" ) {
        alert('Fill all the Inputs !')
    }

    else if (!validateEmail(pop[1])){
        alert('Wrong Email Format !')
    }

    else if (pop[3] !== pop[2]){
        alert('Password does not match !')
    }

    else {

        let username = pop[0];
        let email = pop[1];
        let password = pop[2];

        $.ajax({
            type: 'POST',
            url: "/api/adminreg/",
            data:{
                username: username,
                email: email,
                password: password
            },
            success: function (data) {
                alert('Admin Created');

                // Login Registered admin
                        $.ajax({
                                type: 'post',
                                url: '/api/auth/',
                                data: {
                                    username: username,
                                    email: email,
                                    password: password
                                },
                                success: function (data) {
                                    window.localStorage.setItem('LoggedAdmin', username);
                                    window.localStorage.setItem('AdminToken', data.token);
                                    window.location.href = '/administration/';
                                },
                                error: function (err) {
                                    alert('Access Denied !!');
                                }

                            })

            },
            error: function (err) {
                alert('Registration Failed !!');
            }
        });
    }


});


