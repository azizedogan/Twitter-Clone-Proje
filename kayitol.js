const form = document.getElementById('form');
const name = document.getElementById('name');
const username = document.getElementById('username');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const password = document.getElementById('password');
const repassword = document.getElementById('repassword');

function error(input, message) { // hatalı durumda çalışacak fonksiyon
    input.className = 'form-control is-invalid';
    const div = input.nextElementSibling;
    div.innerText = message;
    div.className ='invalid-feedback';
}

function success(input) {  //başarılı durumda çalışacak
    input.className ='form-control is-valid';
}

function checkEmail(input) { // email fotmatını kontrol eder
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if(re.test(input.value)){
        success(input);
    } else {
        error(input ,'hatalı email girdiniz');
    }
}

function checkRequired(inputs) { //form elemanlarının boş olup olmadığını kontrol eder
    inputs.forEach (function(input) {
        if(input.value === '' ) {
            error(input, `${input.id} gerekli`);
        } else {
            success(input);
        }
    })
}

function checkLength(input, min, max) { //form elemanlarının uzunluk ve kısalığını kontrol eder
    if(input.value.length < min) {
        error(input, `${input.id} en az ${min} karakte olmalıdır`);
    } else if (input.value.length > max) {
        error(input, `${input.id} en fazla ${max} karakter olmalıdır.`);
    } else {
        success(input);
    }
}

function checkPhone(input) {  //telefon numarasını kontrol eder
    var exp = /^\d{10}$/;
    if(!exp.test(input.value)) {
        error(input, 'Telefon numarası 10 haneli olmalı');
    }
}

function checkPasswords(input1, input2) { //parola eşleşme kontrolü
    if(input1.value !== input2.value) {
        error(input2, 'Parolalar eşleşmiyor');
    }
}

function showAlert(message, alertType) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${alertType}`;
    alertDiv.appendChild(document.createTextNode(message));

    const container = form.parentElement;
    container.insertBefore(alertDiv, form);

    setTimeout(function () {
        alertDiv.remove();
    }, 3000);
}

form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Form bilgilerini kontrol etme
    checkRequired([name, username, email, phone, password, repassword]);
    checkLength(name, 6, 20);
    checkLength(username, 7, 15);
    checkLength(password, 7, 12);
    checkEmail(email);
    checkPhone(phone);
    checkPasswords(password, repassword);
    
    const isValidForm = document.querySelectorAll('.is-invalid').length === 0;

    if(isValidForm) {
        const user = {
            name: name.value,
            username: username.value,
            email: email.value,
            phone: phone.value,
            password: password.value,
            tweets : []
        };

        const apiUrl = 'http://localhost:3000/users';

        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify(user),
        })
        .then(response => response.json())
        .then(data => {
            showAlert('Başarıyla kayıt oldunuz.' , 'success');
            
            window.location.href = 'giris-yap.html'; 
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
});