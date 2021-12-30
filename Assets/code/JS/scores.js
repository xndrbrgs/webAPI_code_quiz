function retrieveHighScores () {
    var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];

    highscores.sort(function(a, b) {
        return b.score - a.score;
      });

    highscores.forEach(function(score) {
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

function clearKey () {
    var clearBtn = document.getElementById("clear");
    clearBtn.addEventListener("click", clearScores);
    console.log("clear");
}

retrieveHighScores();

