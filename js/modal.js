/**
 * Fonction d'affichage de la modal
 * @param {String} message message à afficher
 * @param {function} actionOk callback function de traiment si OK
 * @param {function?} actionCancel callback function si cancel
 */
function showModal(message, actionOk, actionCancel) {
    //modele de structure pour la modal
    var modalInner = '<div id="modal" style="background-color: rgba(128, 128, 128, 0.89) ;top:0;bottom:0;left:0;right:0;position: absolute;padding:20vw 15vh;text-align: center;">\
            <div id="modal-content" style="border-radius:7px;background-color: rgba(255, 255, 255, 1);height:25vh;width:400px;padding-top:40px;margin-left:calc(50vw - 400px)">\
                <div id="modal-text" style="text-align: center; height:80%">text de la modal</div>\
                <div id="modal-button" style="text-align: center;"></div>\
            </div>\
        </div>';
    var modalNode = document.createElement('div');
    //definition du contenu d'une modal
    modalNode.innerHTML = modalInner;

    //on applique le contenu du text du message dans la modal
    modalNode.querySelector('#modal-text').innerHTML = message;

    //on vide la section prévu pour les boutton avec un inner vide
    // modalNode.querySelector('#modal-button').innerHtml='';

    //on creer un element button pour faire le boutton yes ou OK 
    btnOk = document.createElement('button');

    //remplissage conditionnel par condition ternaire en fonction de la presence ou non d'un action cancel
    //equi a if(undefined!==actionCancel){btnOk.innerHTML='ok';}else{btnOk.innerHTML='yes';}
    btnOk.innerHTML = (undefined !== actionCancel ? 'Yes' : 'OK');
    //j'ajoute les class css pour un affichage du boutton avec mon css
    btnOk.className = 'btn btn-success';
    //j'ajoute l'evenement lié au boutton ok
    btnOk.addEventListener('click', function (evt) {
        //fermeture de la fenetre
        evt.path[3].remove()
        actionOk();
    });
    //j'ajoute le bouton ok a la div #modal-button
    modalNode.querySelector('#modal-button').append(btnOk);

    if (undefined !== actionCancel) {
        //on creer un element button pour faire le boutton yes ou OK 
        btnCancel = document.createElement('button');

        //remplissage conditionnel par condition ternaire en fonction de la presence ou non d'un action cancel
        //equi a if(undefined!==actionCancel){btnOk.innerHTML='ok';}else{btnOk.innerHTML='yes';}
        btnCancel.innerHTML ='No';
        //j'ajoute les class css pour un affichage du boutton avec mon css
        btnCancel.className = 'btn btn-error';
        //j'ajoute l'evenement lié au boutton ok
        btnCancel.addEventListener('click', function (evt) {
            //fermeture de la fenetre
            evt.path[3].remove()
            actionCancel();
        });
        //j'ajoute le bouton ok a la div #modal-button
        modalNode.querySelector('#modal-button').append(btnCancel);
    }
    //j'ajoute la modal a ma structure html a la fin pour pas gener le contenu
    //le css sur la modal prevoit qu'il soit au dessus de tout contenu si il est a la fin du body
    document.body.append(modalNode.firstChild);
}