const searchProfile = document.getElementById('search');
const searchCard = document.querySelector("#searchCard");

function getProfileMethod(name){
    fetch(`http://localhost:3000/users?q=${name}`)
    .then(response => response.json())
    .then(data => renderUsers(data));
}

function renderUsers(data) {
    let userHTML = '';

    data.forEach(user => {
        userHTML += `
        <div class="card">
            <div class="d-flex">
                <img src="${user.img}" class="rounded-circle" width="20%" >
                <div class="p-2 d-flex flex-column bd-highlight">
                    <span class="fw-bold bd-highlight">${user.name}</span>
                    <span class="bd-highlight">${user.username}</span>
                </div>
            </div>
        </div>`;
    });

    document.querySelector("#searchCard").innerHTML = userHTML;
}

function getProfile() {
    let text = searchProfile.value;

    if (!text) {
        searchCard.innerHTML = '<div class="card"><p class="no-results m-2">Lütfen arama yapınız.</p><div>';
    } else {
        getProfileMethod(text);
    }
}

searchProfile.addEventListener('input', getProfile);

searchProfile.addEventListener('click', getProfile);

function temizle() {
    // Input odak dışında olduğunda içeriği temizle
    searchCard.innerHTML = '';
}
searchCard.addEventListener('blur', temizle);