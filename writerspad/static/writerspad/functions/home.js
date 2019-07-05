const btnCreateArticle = document.querySelector('#btnCreateArticle');
const msg = document.querySelector('.msg');
const loggedUser = document.querySelector('#loggedUser');
const btnLogout = document.querySelector('#logout');
const listGroupArticles = document.querySelector('#list_group_articles');

const WriterToken = window.localStorage.getItem('WriterToken');


// Router Auth
window.addEventListener('load', ()=>{
    if (!window.localStorage.getItem('LoggedWriter')){
        window.location.href = '/login/';
    }
    else {
        loggedUser.innerHTML = window.localStorage.getItem('LoggedWriter');
    }
});


// LogOut
btnLogout.addEventListener('click', (e)=>{
    e.preventDefault();
    window.localStorage.removeItem('LoggedWriter');
    window.localStorage.removeItem('WriterToken');
    window.location.href = '/login/';
});


// ------ Write An Article --------------

btnCreateArticle.addEventListener('click', (e)=>{
    e.preventDefault();

    let pop = [prompt('Title'), prompt('Body')];

    if( pop[0] === null && pop[1] === null ){
            alert('try again')
    }

    else if ( pop[0] === "" || pop[1] === "") {
        alert('Fill all the Inputs !!')
    }
    else {

        let author = window.localStorage.getItem('LoggedWriter');
        let title = pop[0];
        let body = pop[1];

        $.ajax({
            type: 'POST',
            headers: {
                'Authorization' : `Token ${WriterToken}`
            },
            url: `/api/articles/`,
            data: {
                title: title,
                body: body
            },
            success: function (data) {
                alert('Article Posted');
            },
            error: function () {
                alert('Posting Failed');
            }
        });
    }
})


// -------- Listing Articles -------------
setInterval(()=>{
    $.ajax({
        type: 'GET',
        headers: {
            'Authorization' : `Token ${WriterToken}`
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
                        div.className = 'list-group-item list-group-item-warning';

                        li.appendChild(document.createTextNode(`${art.id}.${art.title}`));
                        created.appendChild(document.createTextNode(`created : ${art.created_at}`));
                        updated.appendChild(document.createTextNode(`updated : ${art.updated_at}`));

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


                        listGroupArticles.appendChild(div);

            })

        }
    })
}, 500);


// Delete Edit Articles

listGroupArticles.addEventListener('click', (e)=>{


    // Delete
    if(e.target.classList.contains('fa-trash')){

        if(confirm('Are your sure you want to delete article ?')){

            let pk = e.target.parentElement.id;

            $.ajax({
                type: 'delete',
                headers: {
                    'Authorization' : `Token ${WriterToken}`
                },
                url: `/api/article/${pk}`,
                success : function () {
                    alert('Arcticle Deleted!');
                }
            })


        }

    }

    // Edit
    if(e.target.classList.contains('fa-pen')){

        let pk = e.target.parentElement.id;
        let pop = [prompt(`Title : article ${pk}`),
                    prompt(`Body : article ${pk}`)]

        if( pop[0] === null && pop[1] === null ){
            alert('try again')
        }

        else if ( pop[0] === "" || pop[1] === "" ) {
            alert('Fill all the Inputs !!')
        }
        else{
            if(confirm(`Are you sure you want to edit article : ${pk}`)){

                    let title = pop[0];
                    let body = pop[1];
                $.ajax({
                    type: 'put',
                    headers: {
                        'Authorization' : `Token ${WriterToken}`
                    },
                    url: `/api/article/${pk}/`,
                    data: {
                        title: title,
                        body: body
                    },
                    success: function (data) {
                        alert('Article Edited');
                    }
                })

            }
        }
    }

});

