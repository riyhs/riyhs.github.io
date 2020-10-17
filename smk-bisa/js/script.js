document.addEventListener("DOMContentLoaded", function () {
    var elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems);
    loadNav();

    function loadNav() {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (this.readyState === 4 && this.status != 200) return;

            document.querySelectorAll(".topnav, .sidenav, .rLinksFooter").forEach(function (elm) {
                elm.innerHTML = xhr.responseText;
            });

            document.querySelectorAll(".sidenav a, .topnav a, .rLinksFooter a").forEach(function (elm) {
                elm.addEventListener("click", function (event) {
                    var sidenav = document.querySelector(".sidenav");
                    M.Sidenav.getInstance(sidenav).close();

                    halaman = event.target.getAttribute("href").substr(1);
                    bukaHalaman(halaman);
                });
            });

        };

        xhr.open("GET", "nav.html", true);
        xhr.send();
    }

    var halaman = window.location.hash.substr(1);
    if (halaman == "") halaman = "home";
    bukaHalaman(halaman);

    function bukaHalaman(halaman) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (this.readyState == 4) {
                var konten = document.querySelector("#body-content");
                if (this.status == 200) {
                    konten.innerHTML = xhr.responseText;
                } else if (this.status == 404) {
                    konten.innerHTML = "<p>Halaman tidak ditemukan.</p>";
                } else {
                    konten.innerHTML = "<p>Halaman tidak dapat di akses</p>";
                }
            }
        };
        xhr.open("GET", "halamans/" + halaman + ".html", true);
        xhr.send();
    }

});