const btnRegisterWriter = document.querySelector('#btnRegisterWriter');
const btnRegisterManager = document.querySelector('#btnRegisterManager');
const btnRegisterAdmin = document.querySelector('#btnRegisterAdmin');
const loggedUser = document.querySelector('#loggedUser');
const btnLogout = document.querySelector('#logout');

const listGroupAdmin = document.querySelector('#list_group_admin');
const listGroupManagers = document.querySelector('#list_group_managers');
const listGroupWriters = document.querySelector('#list_group_writers');
const listGroupArticles = document.querySelector('#list_group_articles');

const AdminToken = window.localStorage.getItem('AdminToken');

// Router control


// Router Authentication
window.addEventListener('load', ()=>{
    if (!window.localStorage.getItem('LoggedAdmin')){
        window.location.href = '/login/';
    }
    else {
        loggedUser.innerHTML = window.localStorage.getItem('LoggedAdmin');
    }
});

// LogOut
btnLogout.addEventListener('click', ()=>{
    window.localStorage.removeItem('LoggedAdmin');
    window.localStorage.removeItem('AdminToken');
    window.location.href = '/login/';
});


//  Register Admin
btnRegisterAdmin.addEventListener('click',(e)=>{
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
            url: "/api/admins/",
            headers: {
                'Authorization' : `Token ${AdminToken}`
            },
            data: {
                username: username,
                email: email,
                password: password
            },
            success: function (data) {
                alert('Admin Created');
            },
            error: function (err) {
                alert('Failed!!');
            }
        });
    }


});


//   Register Manager
btnRegisterManager.addEventListener('click',(e)=>{
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
            url: "/api/managers/",
            headers: {
                'Authorization' : `Token ${AdminToken}`
            },
            data: {
                username: username,
                email: email,
                password: password
            },
            success: function (data) {
                alert('Manager Created');
            },
            error: function (err) {
                alert('Failed!!');
            }
        });
    }


});



//   Register Writer
btnRegisterWriter.addEventListener('click',(e)=>{
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
            url: "/api/writers/",
            headers: {
                'Authorization' : `Token ${AdminToken}`
            },
            data: {
                username: username,
                email: email,
                password: password
            },
            success: function (data) {
                alert('Writer Created');
            },
            error: function (err) {
                alert('Failed!!');
            }
        });
    }

});



// ===== List Admin=======
setInterval(()=>{

    $.ajax({
        type: 'GET',
        headers: {
            'Authorization' : `Token ${AdminToken}`
        },
        url: "/api/admins/",
        success: function (data) {
            listGroupAdmin.innerHTML = '';
            data.forEach(user =>{
                        const div = document.createElement('div');
                        const li = document.createElement('li');
                        const bl = document.createElement('blockquote');
                        const created = document.createElement('footer');
                        const updated = document.createElement('footer');

                        li.id = user.id;
                        div.className = 'list-group-item list-group-item-warning';

                        li.appendChild(document.createTextNode(`${user.id}.${user.username}`));
                        created.appendChild(document.createTextNode(`created : ${user.date_joined}`));
                        updated.appendChild(document.createTextNode(`last login : ${user.last_login}`));


                        const editIcon = document.createElement('fa');
                        const deleteIcon = document.createElement('fa');

                        editIcon.className = 'fas fa-pen text-primary float-right mr-3';
                        deleteIcon.className = 'fas fa-trash text-danger float-right';

                        created.className = "blockquote-footer mr-auto";
                        updated.className = "blockquote-footer ml-auto";

                        li.appendChild(deleteIcon);
                        li.appendChild(editIcon);

                        bl.appendChild(created);
                        bl.appendChild(updated);

                        div.appendChild(li);
                        div.appendChild(bl);


                        listGroupAdmin.appendChild(div);

            })

        }
    })
}, 500);


// Delete Edit Admin

listGroupAdmin.addEventListener('click', (e)=>{


    // Delete
    if(e.target.classList.contains('fa-trash')){

        let id = e.target.parentElement.id;
        if(confirm(`Are your sure you want to delete admin ${id} ?`)){


            $.ajax({
                type: 'delete',
                headers: {
                    'Authorization' : `Token ${AdminToken}`
                },
                url: `/api/admin/${id}`,
                success : function () {
                    alert('Admin Deleted!');
                },
                error: function (err) {
                    alert('Failed!!');
                }
            })


        }

    }

    // Edit
    if(e.target.classList.contains('fa-pen')){

        let id = e.target.parentElement.id;
        let pop = [prompt(`Username : admin ${id}`), prompt(`Email : admin ${id}`),
            prompt(`Password : admin ${id}`), prompt(`Confirm Password : admin ${id}`)];

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
        else{
            if(confirm(`Are you sure you want to edit admin : ${id}`)){
                    let username = pop[0];
                    let email = pop[1];
                    let password = pop[2];
                $.ajax({
                    type: 'put',
                    headers: {
                    'Authorization' : `Token ${AdminToken}`
                    },
                    url: `/api/admin/${id}/`,
                    data: {
                        username: username,
                        email: email,
                        password: password
                    },
                    success: function (data) {
                        alert('Admin Edited');
                    },
                    error: function (err) {
                        alert('Failed!!');
                    }
                })

            }
        }
    }

});







// ===== List Managers====

setInterval(()=>{
    $.ajax({
        type: 'GET',
        headers: {
            'Authorization' : `Token ${AdminToken}`
        },
        url: "/api/managers/",
        success: function (data) {
            listGroupManagers.innerHTML = '';
            data.forEach(user =>{
                        const div = document.createElement('div');
                        const li = document.createElement('li');
                        const bl = document.createElement('blockquote');
                        const created = document.createElement('footer');
                        const updated = document.createElement('footer');

                        li.id = user.id;
                        div.className = 'list-group-item list-group-item-warning';

                        li.appendChild(document.createTextNode(`${user.id}.${user.username}`));
                        created.appendChild(document.createTextNode(`created : ${user.created_at}`));
                        updated.appendChild(document.createTextNode(`updated : ${user.updated_at}`));


                        const editIcon = document.createElement('fa');
                        const deleteIcon = document.createElement('fa');

                        editIcon.className = 'fas fa-pen text-primary float-right mr-3';
                        deleteIcon.className = 'fas fa-trash text-danger float-right';

                        created.className = "blockquote-footer mr-auto";
                        updated.className = "blockquote-footer ml-auto";

                        li.appendChild(deleteIcon);
                        li.appendChild(editIcon);

                        bl.appendChild(created);
                        bl.appendChild(updated);

                        div.appendChild(li);
                        div.appendChild(bl);


                        listGroupManagers.appendChild(div);

            })

        }
    })
}, 500);


// Delete Edit Manager

listGroupManagers.addEventListener('click', (e)=>{


    // Delete
    if(e.target.classList.contains('fa-trash')){

        let id = e.target.parentElement.id;
        if(confirm(`Are your sure you want to delete manager ${id} ?`)){

            $.ajax({
                type: 'delete',
                headers: {
                    'Authorization' : `Token ${AdminToken}`
                },
                url: `/api/manager/${id}`,
                success : function () {
                    alert('User Deleted!');
                },
                error : function () {
                    alert('Failed !!');
                }
            })


        }

    }

    // Edit
    if(e.target.classList.contains('fa-pen')){

        let id = e.target.parentElement.id;
        let pop = [prompt(`Username : manager ${id}`), prompt(`Email : manager ${id}`),
            prompt(`Password : manager ${id}`), prompt(`Confirm Password : user ${id}`)];

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
        else{
            if(confirm(`Are you sure you want to edit manager : ${id}`)){
                    let username = pop[0];
                    let email = pop[1];
                    let password = pop[2];
                $.ajax({
                    type: 'put',
                    headers: {
                        'Authorization' : `Token ${AdminToken}`
                    },
                    url: `/api/manager/${id}/`,
                    data: {
                        username: username,
                        email: email,
                        password: password
                    },
                    success: function (data) {
                        alert('Manager Edited');
                    },
                    error: function () {
                        alert('Failed !!');
                    }
                })

            }
        }
    }

});







// ===== List writers ====

setInterval(()=>{
    $.ajax({
        type: 'GET',
        headers: {
            'Authorization' : `Token ${AdminToken}`
        },
        url: "/api/writers/",
        success: function (data) {
            listGroupWriters.innerHTML = '';
            data.forEach(user =>{

                        const div = document.createElement('div');
                        const li = document.createElement('li');
                        const bl = document.createElement('blockquote');
                        const created = document.createElement('footer');
                        const updated = document.createElement('footer');

                        li.id = user.id;
                        div.className = 'list-group-item list-group-item-warning';

                        li.appendChild(document.createTextNode(`${user.id}.${user.username}`));
                        created.appendChild(document.createTextNode(`created : ${user.created_at}`));
                        updated.appendChild(document.createTextNode(`updated : ${user.updated_at}`));


                        const editIcon = document.createElement('fa');
                        const deleteIcon = document.createElement('fa');

                        editIcon.className = 'fas fa-pen text-primary float-right mr-3';
                        deleteIcon.className = 'fas fa-trash text-danger float-right';

                        created.className = "blockquote-footer mr-auto";
                        updated.className = "blockquote-footer ml-auto";

                        li.appendChild(deleteIcon);
                        li.appendChild(editIcon);

                        bl.appendChild(created);
                        bl.appendChild(updated);

                        div.appendChild(li);
                        div.appendChild(bl);


                        listGroupWriters.appendChild(div);

            })

        }
    })
}, 500);


// Delete Edit Writer

listGroupWriters.addEventListener('click', (e)=>{
    e.preventDefault();

    // Delete
    if(e.target.classList.contains('fa-trash')){

        let id = e.target.parentElement.id;

        if(confirm(`Are your sure you want to delete writer ${id} ?`)){

            $.ajax({
                type: 'delete',
                headers: {
                    'Authorization' : `Token ${AdminToken}`
                },
                url: `/api/writer/${id}`,
                success : function () {
                    alert('Writer Deleted!');
                },
                error: function () {
                    alert('Failed');
                }
            })


        }

    }

    // Edit
    if(e.target.classList.contains('fa-pen')){

        let id = e.target.parentElement.id;
        let pop = [prompt(`Username : writer ${id}`), prompt(`Email : writer ${id}`),
            prompt(`Password : writer ${id}`), prompt(`Confirm Password : writer ${id}`)];

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
        else{
            if(confirm(`Are you sure you want to edit writer : ${id}`)){
                    let username = pop[0];
                    let email = pop[1];
                    let password = pop[2];
                $.ajax({
                    type: 'put',
                    headers: {
                        'Authorization' : `Token ${AdminToken}`
                    },
                    url: `/api/writer/${id}/`,
                    data: {
                        username: username,
                        email: email,
                        password: password
                    },
                    success: function (data) {
                        alert('Writer Edited');
                    },
                    error: function () {
                        alert('Failed');
                    }
                })

            }
        }
    }

});



// ===== List Articles ====

setInterval(()=>{
    $.ajax({
        type: 'get',
        headers: {
            'Authorization' : `Token ${AdminToken}`
        },
        url: "/api/articles/",
        success: function (data) {
            listGroupArticles.innerHTML = '';
            data.forEach(art =>{

                        const div = document.createElement('div');
                        const li = document.createElement('li');
                        const bl = document.createElement('blockquote');
                        const created = document.createElement('footer');
                        const updated = document.createElement('footer');

                        li.id = art.id;
                        div.className = 'list-group-item';

                        li.appendChild(document.createTextNode(`${art.title}`));
                        created.appendChild(document.createTextNode(`created : ${art.created_at}`));
                        updated.appendChild(document.createTextNode(`updated : ${art.updated_at}`));

                        const authorTag = document.createElement('h6');
                        const authorName = document.createElement('span');

                        authorTag.id = 'authorTag';
                        authorName.id = 'authorName';

                        authorTag.className = '';
                        authorName.className = 'ml-1';

                        authorTag.appendChild(document.createTextNode('By'));
                        authorName.appendChild(document.createTextNode(`${art.author}`));

                        created.className = "blockquote-footer mr-auto";
                        updated.className = "blockquote-footer ml-auto";

                        authorTag.appendChild(authorName);

                        li.appendChild(authorTag);

                        bl.appendChild(created);
                        bl.appendChild(updated);

                        div.appendChild(li);
                        div.appendChild(bl);


                        listGroupArticles.appendChild(div);

            })

        }
    })
}, 500);



