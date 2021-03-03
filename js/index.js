//chargement dans une variable de la balise <div id=jsLoaded">...</div>
var jsloaded=document.querySelector("#jsloaded");

//modification du style css de la balise
jsloaded.style.backgroundColor="green";

//modif du contenu textuelle de la balise
jsloaded.innerText="le js est chargé";

console.log("le fichier index.js a fini d'etre exécuté");