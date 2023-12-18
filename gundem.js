fetch('http://localhost:3000/gundem')
.then(response => response.json())
.then((data) => renderGundem(data));

function renderGundem(data){
    let gundemHTML =' ';

    data.forEach(gundem=>{
        gundemHTML += `
            <li class="list-group-item"><a href="#" class="text-decoration-none" key="${gundem.id}">${gundem.subject}</a></li>
        `;
    });
    document.getElementById("gundem_list").innerHTML = gundemHTML;
}