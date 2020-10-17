const url = "https://api.football-data.org/v2/competitions/2021/matches?matchday=1";
const url_peringkat = "https://api.football-data.org/v2/competitions/2021/standings?standingType=TOTAL";
const url_teams = "https://api.football-data.org/v2/competitions/2021/teams";
const token = "cc1cc5b3ddce4c6293f77083722314e5";

// blok kode yang akan terpanggil jika fetch berhasil
function status(response) {
    if (response.status !== 200) {
        console.log("Error : " + response.status);
        // method reject() akan membuat blok catch terpanggil
        return Promise.reject(new Error(response.statusText));
    } else {
        // mengubah suatu objek menjadi promise agar bisa di then kan
        return Promise.resolve(response);
    }
}

// blok kode untuk memparsing json menjadi array js
function json(response) {
    return response.json();
}

// blok kode untuk mengahnddle kesalahan di blok catch
function error(error) {
    // parameter error berasal dari promise.reject
    console.log("Error : " + error);
}

// blok kode untuk melakukan request data json
function pertandingan() {
    fetch(url, {
            method: "GET",
            headers: {
                "X-Auth-Token": token
            }
        })
        .then(status)
        .then(json)
        .then(function (data) {

            var article = "";
            data.matches.forEach(function (arrayItem, index) {
                article += `
                    <div class="col s12 m6">
                        <div class="card blue-grey darken-1">
                            <div class="card-content white-text">
                            <span class="card-title center"><h5> ${data.competition.name} </h5></span> 
                            <div class="divider"></div>
                                <div class="row">
                                    <div class="col s6 m6 center">
                                        <h5 style="height : 40px;"> ${data.matches[index].homeTeam.name} </h5>
                                        <h3> ${data.matches[index].score.fullTime.homeTeam} </h3>
                                    </div>
                                    <div class="col s6 m6 center">
                                        <h5 style="height : 40px;"> ${data.matches[index].awayTeam.name} </h5>
                                        <h3> ${data.matches[index].score.fullTime.awayTeam} </h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            });

            var root = document.getElementById("pertandingan");
            root.innerHTML = article;
        }).catch(function (error) {
            console.error(error);
        });
}

function peringkat() {

    fetch(url_peringkat, {
            method: "GET",
            headers: {
                "X-Auth-Token": token
            }
        })
        .then(status)
        .then(json)
        .then(function (data) {
            var article = "";

            data.standings[0].table.forEach(function (arrayItem, index) {

                article += `
                <tr>
                    <th>${data.standings[0].table[index].position}</th>
                    <td>${data.standings[0].table[index].team.name}</td>
                    <td>${data.standings[0].table[index].won}</td>
                    <td>${data.standings[0].table[index].draw}</td>
                    <td>${data.standings[0].table[index].lost}</td>
                    <td>${data.standings[0].table[index].points}</td>
                </tr>
                `;
            });

            var root = document.getElementById("tabel");
            root.innerHTML = article;
        }).catch(function (error) {
            console.error(error);
        });
}

function teams() {

    fetch(url_teams, {
            method: "GET",
            headers: {
                "X-Auth-Token": token
            }
        })
        .then(status)
        .then(json)
        .then(function (data) {
            var str = JSON.stringify(data).replace(/http:/g, 'https:');
                data = JSON.parse(str);
            
            var article = "";

            data.teams.forEach(function (arrayItem, index) {
                article += `
                <div class="col s12 m6">
                    <div class="card my-card">
                        <div class="card-image">
                            <img class="gambar-teams" src="${data.teams[index].crestUrl}">
                            <a onclick="addTeam(${data.teams[index].id}, '${data.teams[index].name}', '${data.teams[index].address}', '${data.teams[index].phone}', '${data.teams[index].website}', '${data.teams[index].founded}', '${data.teams[index].clubColors}', '${data.teams[index].venue}', '${data.teams[index].crestUrl}' );" class="btn-floating halfway-fab waves-effect waves-light red"><i
                                    class="material-icons">add</i></a>
                        </div>
                        <div class="card-content">
                            <h5>${data.teams[index].name}</h5>
                            <p><strong>Address : </strong> ${data.teams[index].address}</p>
                            <p><strong>Phone : </strong> ${data.teams[index].phone}</p>
                            <p><strong>Website : </strong> 
                                <a href="${data.teams[index].website}"> ${data.teams[index].website} </a>
                            </p>
                            <p><strong>Founded : </strong> ${data.teams[index].founded}</p>
                            <p><strong>Club Colors : </strong> ${data.teams[index].clubColors}</p>
                            <p><strong>Venue : </strong> ${data.teams[index].venue}</p>
                        </div>
                    </div>
                </div>
                `;
            });

            var root = document.getElementById("teams-container");
            root.innerHTML = article;
        }).catch(function (error) {
            console.error(error);
        });
}
