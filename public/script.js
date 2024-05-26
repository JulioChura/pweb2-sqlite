function filterMovie() {
    const url = 'http://localhost:3000/'
    const year = document.getElementById('year').value;
    const score = document.getElementById('score').value;
    const votes = document.getElementById('votes').value;
    let boxMovie  = document.getElementById('boxMovie').value;

    if (!verify(year, score, votes)) {
        alert("Todos los campos deben llenarse!")
        return;
    }

    const data = {
        year: year,
        score: score,
        votes: votes
    }
    const request = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) 
    }
    console.log(request);

    http = fetch(url, request)

    http
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert(data.error);
        } else {

            alert('Evento creado correctamente');
        }
        
        document.getElementById('eventForm').reset(); 
    })
    .catch(error => console.error('Error:', error));
}

function verify(year, score,  votes) {
    if (year.trim() === '' || score.trim() === '' || votes.trim() === '') {
        return false;
    }
    return true;
}
function showMovies(data) {
    let body = `
        <br><br>
        <table>
            <tr>
                <th>Title</th>
                <th>Year</th>
                <th>Score</th>
                <th>Votes</th>
            </tr>
    `;
    for (let i = 0; i < data.length; i++) {
        body += `
            <tr>
                <td>${data[i].Title}</td>
                <td>${data[i].Year}</td>
                <td>${data[i].Score}</td>
                <td>${data[i].Votes}</td>
            </tr>
        `;
    }
    body += `</table>`;
    return body;
}
