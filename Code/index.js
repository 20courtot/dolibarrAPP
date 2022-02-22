// Variables globales
var token = "";
var ip = "";
var cheminAcces = "";
// Liste des pages utilisées pour la fonction display()
var pages = ["formulaire", "portail", "loading", "portailIP", "success"];

// Fonctions globales
function SetIP() {
    // La fonction SetIP permet de définir les variabloes globales IP, et chemin d'accès.
    ip = document.getElementById("ip").value
    cheminAcces = document.getElementById("cheminAcces").value

    display("portail")
}

function login() {
    // La fonction login permet de se connecter, elle envoi la requête avec le pwd et le login entré.
    var identifiant = document.getElementById("id").value;
    var password = document.getElementById("pwd").value;
    display("loading")
    makeRequest(password, identifiant)
}

function makeRequest(pwd, id) {
    // La fonction makeRequest va envoyer la requête qui s'occupera de récupérer le token
    httpRequest = new XMLHttpRequest();
    httpRequest.open('GET', 'http://' + ip + '/' + cheminAcces + 'api/index.php/login?login=' + id + '&password=' + pwd + ''); // On définit le chemin d'accès
    httpRequest.send();
    // Si il y a une erreur :
    httpRequest.onerror = function() {
        display("portail")
        document.getElementById('erreur').innerText = "Identifiant ou mot de passe incorrect ou erreur avec la requête";
    }

    // A la fin du chargement de la requête :
    httpRequest.onloadend = function() {
        if (httpRequest.status == 200) { // Si la requête retourne succès :
            var rep = httpRequest.responseText;
            var repJSON = JSON.parse(rep);

            token = repJSON.success.token;
            console.log(token);
            display("formulaire")
        } else { // Sinon : on signale une erreur
            httpRequest.onerror()
        }
    }
}

function sendForm() {
    // La fonction SendForm s'occupe d'envoyer les données du formulaire à Dolibarr, en utilisant le token.
    var date = new Date(document.getElementById("date").value);
    var dateTimestamp = date.getTime() / 1000;
    var libelle = document.getElementById("libelle").value;
    var montant = document.getElementById("montant").value;
    var mode = document.getElementById("mode").value;
    var request = new XMLHttpRequest()

    request.open('POST', 'http://' + ip + '/' + cheminAcces + 'api/index.php/bankaccounts/1/lines'); // On définit le chemin d'accès
    // On définit les Headers
    request.setRequestHeader('DOLAPIKEY', token);
    request.setRequestHeader("Content-Type", "application/json")

    // On envoi les données récupérées sous forme de JSON.
    request.send(JSON.stringify({
        "date": dateTimestamp,
        "type": mode,
        "label": libelle,
        "amount": parseInt(montant)
    }))
    display("success")
}

function display(id) {
    // La fonction display permet de afficher une seule page, en cachant toutes les autres.
    pages.forEach((v) => {
        if (v == id) {
            document.getElementById(v).hidden = false
        } else if (v != id) {
            document.getElementById(v).hidden = true
        }
    })
}