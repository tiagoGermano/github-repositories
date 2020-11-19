var repositories = []
var repoListElem = document.getElementById('repository-list')

function listRepositories(response){
    repositories = response.data;
    
    setTimeout(() => {
        repoListElem.innerHTML = '';
        for(repository of repositories){
            repoListElem.appendChild(createRepositoryItemElement(repository.name))
        }
        
    }, 1000);
    
}
function createRepositoryItemElement(repositoryName){
    var spanEl = document.createElement('span');
    spanEl.style = 'font-size: 18px;'
    var iEl = document.createElement('i');
    iEl.classList = ['fab fa-github'];
    iEl.style = 'padding : 8px'
    spanEl.appendChild(iEl);
    spanEl.appendChild(document.createTextNode(repositoryName));

    var liElem = document.createElement('li');
    liElem.appendChild(spanEl);
    return liElem;
}

function createErrorMessageElement(errorMessage){
    var spanEl = document.createElement('span');
    spanEl.style = 'font-size: 18px;'
    var iEl = document.createElement('i');
    iEl.classList = ['fas fa-exclamation-triangle'];
    iEl.style = 'padding : 8px'
    spanEl.appendChild(iEl);
    spanEl.appendChild(document.createTextNode(errorMessage));

    var liElem = document.createElement('li');
    liElem.appendChild(spanEl);
    return liElem;
}

function search(){
    repoListElem.innerHTML = '';

    let iEl = document.createElement('i');
    iEl.appendChild(document.createTextNode('loading....'))
    repoListElem.appendChild(iEl);

    let userNameElem = document.getElementById('username');
    let userName = userNameElem.value;
    loadGitHubRepositories(userName, listRepositories);
}


function loadGitHubRepositories(userName, success){
    axios.get('https://api.github.com/users/' +userName +'/repos')
    .then(function (response) {
        success(response);
    })
    .catch(function (error) {

        repoListElem.innerHTML = '';
        if(error.response.status === 404) {
            repoListElem.appendChild(createErrorMessageElement('user not found'))
        } else {
            repoListElem.appendChild(createErrorMessageElement(error.response.data))
        }
    })
}
