const btnRegWriter = document.querySelector('#btnRegWriter');
const loggedUser = document.querySelector('#loggedUser');
const btnLogout = document.querySelector('#logout');
const listGroupWriters = document.querySelector('#list_group_writers');

const ManagerToken = window.localStorage.getItem('ManagerToken');


// Router Auth
window.addEventListener('load', ()=>{
    if (!window.localStorage.getItem('LoggedManager')){
        window.location.href = '/login/';
    }
    else {
        loggedUser.innerHTML = window.localStorage.getItem('LoggedManager');
    }
});


// LogOut
btnLogout.addEventListener('click', (e)=>{
    e.preventDefault();
    window.localStorage.removeItem('LoggedManager');
    window.localStorage.removeItem('ManagerToken');
    window.location.href = '/login/';
});


// ------ Register writer --------------

btnRegWriter.addEventListener('click', (e)=>{
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
                'Authorization' : `Token ${ManagerToken}`
            },
            data: {
                username: username,
                email: email,
                password: password
            },
            success: function (data) {
                alert('Writer Added');
            },
            error: function () {
                alert('Failed');
            }
        });
    }
});


// ===== List writers ====

setInterval(()=>{
    $.ajax({
        type: 'GET',
        headers: {
            'Authorization' : `Token ${ManagerToken}`
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
                    'Authorization' : `Token ${ManagerToken}`
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
        let pop = [prompt(`Username : user ${id}`), prompt(`Email : user ${id}`),
            prompt(`Password : user ${id}`), prompt(`Confirm Password : user ${id}`)];

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
                        'Authorization' : `Token ${ManagerToken}`
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



