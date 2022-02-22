
var token;
var httpRequest;
  document.getElementById("ajaxButton").addEventListener('click', makeRequest);

  function makeRequest() {
    httpRequest = new XMLHttpRequest();
    request2 = new XMLHttpRequest();
    if (!httpRequest) {
      console.log('Abandon :( Impossible de créer une instance de XMLHTTP');
      return false;
    }
    httpRequest.onreadystatechange = alertContents;
    httpRequest.open('GET', 'http://10.0.213.57/dolibarr/htdocs/api/index.php/login?login=20courtot&password=20courtot');
    httpRequest.send();
    request2.onreadystatechange = alertContents;
    request2.open('POST','http://10.0.213.57/dolibarr/htdocs/api/index.php/users');
    request2.setRequestHeader('DOLAPIKEY', '4I4Xb0VGEl0mN9xUW6PsTmlvdqK1a786');
    request2.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
    request2.send("login=test2&id=test2&password=test2");
    
  }

  function alertContents() {

    if (httpRequest.readyState === XMLHttpRequest.DONE) {
      if (httpRequest.status === 200) {
        var rep = httpRequest.responseText;
        var repJSON = JSON.parse(rep);
        token = repJSON.success.token;
        alert(token);
      } else {
        console.log('Il y a eu un problème avec la requête.');
      }
    }
  }
  
function goform(){
    let pageport = document.getElementById('formulaire');
    let pageform = document.getElementById('portail');
    pageform.hidden = true;
    pageport.hidden = false;
}
function goport(){
    let pageport = document.getElementById('formulaire');
    let pageform = document.getElementById('portail');
    pageform.hidden = false;
    pageport.hidden = true;
}