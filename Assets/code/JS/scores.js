function retrieveHighScores () {
    var scoresList = JSON.parse(window.localStorage.getItem("highscores")) || [];

    scoresList.sort(function(a, b) {
        return b.score - a.score;
      });

    scoresList.forEach(function(score) {
        var listEl = document.createElement("li");
        listEl.textContent = score.initials + " = " + score.score;

        var ordListEl = document.getElementById("highscores");
        ordListEl.appendChild(listEl);
    });
}

function clearScores () {
    window.localStorage.removeItem("highscores");
    window.location.reload();
}

document.getElementById('clear').onclick = clearScores;
retrieveHighScores();

