fetch('http://localhost:3000/users')
.then(response => response.json())
.then((data) => renderTweets(data));

function renderTweets(data) {
    let tweetHTML = '';

    data.forEach(user => {
        user.tweets.forEach(tweet => {
            tweetHTML += `   
                <div class="card mt-3">
                    <div class="card-header d-flex justify-content-start">
                        <img src=${user.img} width="50px">
                        <span class="fw-bold m-2">${user.name}</span>
                        <span class="me-2">${user.username}</span>
                        <span>${tweet.time}</span>
                    </div>
                    <div class="card-body">
                        <p>${tweet.text}</p>
                    </div>
                </div>`;
        });
    });
    
    document.querySelector("#tweet_list").innerHTML = tweetHTML;
}