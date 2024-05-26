document.getElementById('eventForm').addEventListener('submit', function(event) {
    event.preventDefault(); 
    filterMovie();
});

function filterMovie() {
    const url = 'http://localhost:3000/';
    const year = document.getElementById('year').value;
    const score = document.getElementById('score').value;
    const votes = document.getElementById('votes').value;
    let boxMovie = document.getElementById('boxMovie');
    
    if (!verify(year, score, votes)) {
        alert("¡Todos los campos deben llenarse!");
        return;
    }

    const data = {
        year: year,
        score: score,
        votes: votes
    };

    const request = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) 
    };

    fetch(url, request)
    .then(response => response.json())
    .then(dataServer => {
        if (dataServer.error) {
            alert(dataServer.error);
        } else {
            console.log(dataServer);
            boxMovie.innerHTML = showMovies(dataServer); 
        }
    })
    .catch(error => console.error('Error:', error));
}

function verify(year, score,  votes) {
    if (year.trim() === '' || score.trim() === '' || votes.trim() === '') {
        return false;
    }
    return true;
}

function showMovies(dataArray) {
    let body = `
        <table>
            <tr>
                <th>Title</th>
                <th>Year</th>
                <th>Score</th>
                <th>Votes</th>
            </tr>
    `;
    for (let data of dataArray) {
        body += `
            <tr>
                <td>${data.Title}</td>
                <td>${data.Year}</td>
                <td>${data.Score}</td>
                <td>${data.Votes}</td>
            </tr>
        `;
    }
    body += `</table>`;
    return body;
}
