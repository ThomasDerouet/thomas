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
    if(input.localName!=='button' && input.value===''){
        //mettre champs en rouge si non rempli
        input.style.backgroundColor="tomato";
        return false;
    }else {
        //repasser champs en blanc quand rempli
        if(!input.classList.contains('btn')) input.style.backgroundColor="white";
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
 * @param {Postit} postitValues  objet comprenant les valeurs dun postit a afficher
 */
function makePostIt(postitValues) {
    //recuperation du postit model pour la creation des autres postit a remplir
    //clone permet d'obtenir un double non lié a l'élément d'origine
    var postitNode = document.querySelector('.post-it').cloneNode(true);
    //composition d'un post it rempli avec les valeurs recus en argument d'entree de fonction
    postitNode.querySelector('.post-it-titre').innerText = postitValues.titre;
    postitNode.querySelector('.post-it-adresse').innerText = postitValues.adresse;
    postitNode.querySelector('.post-it-email').innerText = postitValues.mail;
    postitNode.querySelector('.post-it-date').innerText = 'Le' + postitValues.date + ' a ' + postitValues.heure;
    postitNode.querySelector('.post-it-description').innerText = postitValues.description;
    postitNode.querySelector('.post-it-auteur').innerText = postitValues.auteurId;
    //ajout à la fin e la liste du postit cloné et rempli   
    document.querySelector('#post-it-liste').append(postitNode);
}
function onformsubmit(evt) {
    //annuler comportement par default qui vide nos chaps remplis
    evt.preventDefault(); 
    //si le formulaire n'est pas rempli je sors de la fonction
    if (!isFormFullFill())return;
    //recupération des valeurs dans le formulaire
    var postitValues = getFormulaire();
    //creation du post it rempli
    makePostIt(postitValues);
    //reset du contenu de form
    evt.target.reset();
}
//connexion de la fonction de gestion de l'event submit au formulaire
document.forms['mon-form'].addEventListener('submit', onformsubmit);