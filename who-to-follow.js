fetch(`http://localhost:3000/users`)
.then(response => response.json())
.then(data => renderFollow(data));

function renderFollow(data) {
    let followHTML = ' ';

    data.forEach(user => {
        followHTML += `
        <div class="d-flex align-items-center justify-content-evenly">
            <img src="${user.img}" alt="" class="rounded-circle" width="60px">
            <div class=" p-2 d-flex flex-column bd-highlight">
                <span class="fw-bold bd-highlight">${user.name}</span>
                <span class="bd-highlight">${user.username}</span>
            </div>
            <button class="btn btn-dark">Takip Et</button>
        </div>
        `;
    });
    document.querySelector('#profile').innerHTML = followHTML;
}