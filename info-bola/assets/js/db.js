var dbPromise = idb.open("db_bola", 1, function (upgradeDb) {
    if (!upgradeDb.objectStoreNames.contains("teams")) {
        upgradeDb.createObjectStore('teams', {
            keyPath: 'id',
            autoIncrement: true
        });
    }
});

function addTeam(id, name, address, phone, website, founded, clubColor, venue, crestUrl) {
    dbPromise.then(function (db) {
        var tx = db.transaction('teams', 'readwrite');
        var store = tx.objectStore('teams');
        var item = {
            id: id,
            name: name,
            address: address,
            phone: phone,
            website: website,
            founded: founded,
            clubColor: clubColor,
            venue: venue,
            pict: crestUrl
        }
        store.put(item);
        return tx.complete;
    }).then(function () {
        M.toast({
            html: name + ' berhasil di tambahkan'
        });
    }).catch(function (error) {
        console.error(name + ' gagal di tambahkan', error);
        M.toast({
            html: name + ' gagal di tambahkan'
        });
    });
}

function deleteTeam(id, name) {
    dbPromise.then(function (db) {
        var tx = db.transaction('teams', 'readwrite');
        var store = tx.objectStore('teams');
        store.delete(id);
        return tx.complete;
    }).then(function () {
        M.toast({
            html: name + ' berhasil di hapus'
        });
        showTeam();
    }).catch(function () {
        M.toast({
            html: name + ' gagal di hapus'
        });
    });
}

function showTeam() {
    dbPromise.then(function (db) {
        var tx = db.transaction('teams', 'readonly');
        var store = tx.objectStore('teams');
        return store.getAll();
    }).then(function (items) {
        var str = JSON.stringify(items).replace(/http:/g, 'https:');
            items = JSON.parse(str);
        
        var article = "";
        items.forEach(function (arrayItem, index) {
            article += `
            <div class="col s12 m6">
                <div class="card my-card">
                    <div class="card-image">
                        <img class="gambar-teams" src="${items[index].pict}">
                        <a onclick="deleteTeam(${items[index].id}, '${items[index].name}');" class="btn-floating halfway-fab waves-effect waves-light red"><i
                                class="material-icons">delete</i></a>
                    </div>
                    <div class="card-content">
                        <h5>${items[index].name}</h5>
                        <p><strong>Address : </strong> ${items[index].address}</p>
                        <p><strong>Phone : </strong> ${items[index].phone}</p>
                        <p><strong>Website : </strong> 
                            <a href="${items[index].website}"> ${items[index].website} </a>
                        </p>
                        <p><strong>Founded : </strong> ${items[index].founded}</p>
                        <p><strong>Club Colors : </strong> ${items[index].clubColor}</p>
                        <p><strong>Venue : </strong> ${items[index].venue}</p>
                    </div>
                </div>
            </div>
            `;
        });

        if (items.length == 0) article += '<p class="center-align my-warning">Favourite Teams not found!</p>'

        var root = document.getElementById("fav-teams-container");
        root.innerHTML = article;
    });
}
