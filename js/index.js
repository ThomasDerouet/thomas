var srvAdresse = 'http://localhost:5629';
var postItCrud = new Crud(srvAdresse);

function jsIsLoaded() {


    //chargement dans une variable de la balise <div id=jsLoaded">...</div>
    var jsloaded = document.querySelector("#jsloaded");

    //modification du style css de la balise
    jsloaded.style.backgroundColor = "skyblue";

    //modif du contenu textuelle de la balise
    jsloaded.innerText = "le js est chargé";

    console.log("le fichier index.js a fini d'etre exécuté");

}
jsIsLoaded();
//verifie le remplissage du formulaire
function isFormFullFill() {
    for (var input of document.forms['mon-form']) {
        if (input.localName !== 'button' && input.value === '') {
            //mettre champs en rouge si non rempli
            input.style.backgroundColor = "tomato";
            return false;
        } else {
            //repasser champs en blanc quand rempli et si l'input de la class ne cntient pas btn
            if (!input.classList.contains('btn')) input.style.backgroundColor = "white";
        }
    }
    return true;
}
//while: tant que la condition est vrai, on fait. Le nombre d'itération n'est pas connu
//do while: si un parcours obligatoire avant while on utilise le do while
//boucle for: nombre d'itération connu

function getFormulaire() {
    //access a la balise form par document.form
    var formulaire = document.forms["mon-form"];
    //console.log('titre:', formulaire["form-titre"].value);
    //console.log('auteur:', formulaire["form-auteur"].value);
    // console.log('date:', formulaire["form-date"].value);
    //console.log('heure:', formulaire["form-hour"].value);
    //console.log('adresse:', formulaire["form-adresse"].value);
    // console.log('adresse mail:', formulaire["form-mail"].value);
    // console.log('description:', formulaire["form-description"].value);
    //Constitution d'un objet avec les champs
    var unPostIt =
    {
        titre: formulaire['form-titre'].value,
        auteurId: formulaire['form-auteur'].value,
        date: formulaire['form-date'].value,
        heure: formulaire['form-hour'].value,
        adresse: formulaire['form-adresse'].value,
        mail: formulaire['form-email'].value,
        description: formulaire['form-description'].value,
    }
    console.log(unPostIt);
    return unPostIt;
}
/**
 * clone d'un postit modele et remplissage des valeurs puis ajout à la liste
 *  * @param {Document} postitDOM Document du template xhtml de la vue postit
 * @param {Postit} postitValues  objet comprenant les valeurs dun postit a afficher
 */
function makePostIt(postitDOM, postitValues) {
    //recuperation du postit model pour la creation des autres postit a remplir
    //clone permet d'obtenir un double non lié a l'élément d'origine
    //var postitNode = document.querySelector('.post-it').cloneNode(true);
    var postitNode = document.createElement('div');
    //remplissage du contenu de la balise div vide par tout le contenu de la premiere balise de postitDOM
    postitNode.innerHTML = postitDOM.firstChild.outerHTML;
    //composition d'un post it rempli avec les valeurs recus en argument d'entree de fonction
    postitNode.querySelector('.post-it-titre').innerHTML = postitValues.titre;
    postitNode.querySelector('.post-it-adresse').innerHTML = postitValues.adresse;
    postitNode.querySelector('.post-it-mail').innerHTML = postitValues.mail;
    postitNode.querySelector('.post-it-date').innerHTML = 'Le <b>' + postitValues.date + '</b> a ' + postitValues.heure;
    postitNode.querySelector('.post-it-description').innerHTML = postitValues.description;
    postitNode.querySelector('.post-it-auteur').innerHTML = postitValues.auteurId;
    postitNode.querySelector('.close-image img').addEventListener('dblclick', function (evt) {
        if (confirm('delete postit???')) {
            alert('you have to click on YES answer');
            console.log('le click est sur le postit :', postitValues);
            console.log('le click est sur le DOM node :', evt.currentTarget);
            postItCrud.del('/postits/' + postitValues.id, function (response) {
                evt.path[2].remove();
                console.log('deleted postit on REST server and in DOM:', postitValues);
            });
        }
        // else alert ('it wont be deleted');
    });
    //Supression puis mise en affichage dans le form après suppression pour éditer une note
    postitNode.querySelector('.post-it').addEventListener('dbclick', function (evt) {
        //Suppression du postit
        postItCrud.del('.postits/' + postitValues.id, function (response) {
            evt.target.remove();
            //delete postitValues.id
            putPostItInForm(postitValues);
        });
    });
    //ajout à la fin de la liste du document de template postit rempli 
    document.querySelector('#post-it-liste').append(postitNode.firstChild);
}
function putPostItInForm(values){
    varform=document.forms['mon-form'];
    form['postit-titre'].value=values.titre;
}

function onformsubmit(evt) {
    //annuler comportement par default qui vide nos chaps remplis
    evt.preventDefault();
    //si le formulaire n'est pas rempli je sors de la fonction
    if (!isFormFullFill()) return;
    //recupération des valeurs dans le formulaire
    var postitValues = getFormulaire();

    //envoie au serveur du postit (attention le body est une chaise JSON et pas un objet JS)
    postItCrud.post('/postits', function (responseValues) {
        //recuperation ave (xrh) du template de postit avec fonction de traitement du retour
        getTemplateView('postit.xhtml',
            function (responseDocument) {
                //creation du post it rempli
                //construction du postit de façon asynchrone par appel des call back basé sur les valeurs de postit recu par le POST sous forme de chaine JSON
                makePostIt(responseDocument, JSON.parse(responseValues));
                //vidange du formulaire
                evt.target.reset();
            }
        );
    }, JSON.stringify(postitValues));

}
//connexion de la fonction de gestion de l'event submit au formulaire
document.forms['mon-form'].addEventListener('submit', onformsubmit);

function getTemplateView(templateFileName, callback) {
    //étape 1 obtention d'un objet xhr
    var xhr = new XMLHttpRequest();
    //etape 2 préparation de la requete
    xhr.open('GET', 'vues/' + templateFileName);
    //etape 3 definition du contenu a executer a chaque changement d'état d'execution. Une fonction evenementielle est totalement en minuscule
    xhr.onreadystatechange = function (evt) {
        //requete pas achevée donc sortie de la fonction
        if (xhr.readyState !== XMLHttpRequest.DONE) return;
        //status different de OK message puis sortie de fonction
        if (xhr.status !== 200) {
            console.log('ERROR XHR' + xhr.responseURL + ' -->' + xhr.status + ':' + xhr.statusText);
            return;
        }
        //console.log(evt.target);
        var postitDocParser = new DOMParser();
        var postitDoc = postitDocParser.parseFromString(xhr.responseText, 'application/xml');
        callback(postitDoc);
        // console.log(xhr);
    };
    //etape 4: on envoit la requete
    xhr.send();
}

/**
 * Fonction de chargement de la liste postit et creation des postits dans le dom avec les valeurs reçus
 */
function loadPostIt() {
    //appel de la fonction get de l'objet nécéssitant une fonction de traitement de la réponse en argument d'entree de l'appel de fonction
    postItCrud.get('/postits', function (responseJSON) {
        //je transforme la chaine json recu en véritable objet javascript
        var postits = JSON.parse(responseJSON);
        //je charge le model html d'un postit, appel necessitant une fontion de traitement de la réponse en argument d'entrée
        getTemplateView('postit.xhtml', function (responseDoc) {
            // dans la liste des postits, pour chaque element
            postits.forEach(function (element, index) {
                //je creer le postit pour l'element parcouru du foreach
                makePostIt(responseDoc, element);
            });
        });
    });
}
loadPostIt();