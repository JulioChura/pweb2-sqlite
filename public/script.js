function filterMovie() {
    const url = 'http://localhost:3000/'
    const year = document.getElementById('year').value;
    const score = document.getElementById('score').value;
    const votes = document.getElementById('votes').value;
    if (!verify(year, score, time)) {
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

function verify(year, score,  time) {
    if (year.trim() === '' || score.trim() === '' || time === '') {
        return false;
    }
    return true;
}
