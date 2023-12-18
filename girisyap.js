document.getElementById('form').onsubmit = function(event) {
    event.preventDefault();

    const apiUrl = 'http://localhost:3000/users';
    fetch(apiUrl)
    .then(response => response.json())
    .then((data) => validateLogin(data));
};

function validateLogin(data) {
const loginUsername= document.getElementById('login-username').value;
const loginPassword = document.getElementById('login-password').value;
    // Kullanıcı adı ve şifre kontrolü
    const user =  data.find(u => u.username === loginUsername && u.password === loginPassword);
     if (user) {
         // Anasayfaya yönlendirme işlemi burada yapılır
         window.location.href = "profile.html";
     } else {
         // Hatalı giriş
         alert("Hatalı giriş. Lütfen bilgilerinizi kontrol edin.");
     }
}
