<h2>Inscrivez-vous</h2>
    <form class="inscription" action="php/req_inscription.php" method="post" name="inscription">
        <!-- c'est quoi les attributs action et method ? -->
        <!--
            Action : adresse que le formulaire demandera
            Method : type de requête effectuée
        -->

        <!-- qu'y a-t-il d'autre comme possiblité que post pour l'attribut method ? -->
        <!--
            GET, DELETE, PUT (deprécié)
        -->
        <span class="required_notification">Les champs obligatoires sont indiqués par *</span>
        <ul>
            <li>
                <label for="email">E-mail :</label>
                <input type="email" name="email" id="email" autofocus required />
                <!-- ajouter à input l'attribut qui lui donne le focus automatiquement : autofocus -->
                <!-- ajouter à input l'attribut qui dit que c'est un champs obligatoire : required -->
                <!-- quelle est la différence entre les attributs name et id ? -->
                <!--
                    Id : Identifiant de l'élément HTML
                    Name : Nom que portera la propriété dans la requête
                -->
                <!-- c'est lequel qui doit être égal à l'attribut for du label ? -->
                <!--
                    Id
                -->
                <span class="form_hint">Format attendu "name@something.com"</span>
            </li>

            <li>
                <label for="mdp1">Mot de passe :</label>
                <input type="password" name="password" id="mdp1" required placeholder="Entrez votre mot de passe..." pattern="[a-zA-Z0-9]{6,8}" onkeyup="validateMdp2()" title="Le mot de passe doit contenir de 6 à 8 caractères alphanumériques.">
                <!-- ajouter à input l'attribut qui dit que c'est un champs obligatoire -->
                <!-- ajouter à input l'attribut qui donne une indication grisée (placeholder) -->
                <!-- spécifiez l'expression régulière: le mot de passe doit être composé de 6 à 8 caractères alphanumériques -->
                <!-- quels sont les deux scénarios où l'attribut title sera affiché ? -->
                <!--
                    Cas 1 : lorsque la souris déclenche le tooltip par défaut de certains navigateurs
                    Cas 2 : technologie d'assistance pour mal voyants
                -->
                <!-- encore une fois, quelle est la différence entre name et id pour un input ? -->
                <!--
                    Id : Identifiant de l'élément HTML
                    Name : Nom que portera la propriété dans la requête
                -->
                <span class="form_hint">De 6 à 8 caractères alphanumériques.</span>
            </li>
            <li>
                <label for="mdp2">Confirmez mot de passe :</label>
                <input type="password" id="mdp2" required onkeyup="validateMdp2()">
                <!-- ajouter à input l'attribut qui dit que c'est un champs obligatoire -->
                <!-- ajouter à input l'attribut qui donne une indication grisée (placeholder) -->
                <!-- pourquoi est-ce qu'on a pas mis un attribut name ici ? -->
                <!--
                    Parce que l'attribut est déjà sur le mdp1, nous n'avons beosin d'envoyer l'information qu'une seule fois
                -->                
                <!-- quel scénario justifie qu'on ait ajouté l'écouter validateMdp2() à l'évènement onkeyup de l'input mdp1 ? -->
                <!--
                    Dans le cas où l'utilisateur rentre un mauvais mot de passe dans le premier champ, le réalise après avoir rempli le 2e, et 
                    corrige donc le premier, impliquant un besoin de révérifier
                -->
                <span class="form_hint">Les mots de passes doivent être égaux.</span>
                <script>

                    validateMdp2 = function(e) {
                        var mdp1 = document.getElementById('mdp1');
                        var mdp2 = document.getElementById('mdp2');

                        if (mdp1.value && mdp2.value && mdp1.value === mdp2.value) {
                            // ici on supprime le message d'erreur personnalisé, et du coup mdp2 devient valide.
                            document.getElementById('mdp2').setCustomValidity('');
                    } else {
                        // ici on ajoute un message d'erreur personnalisé, et du coup mdp2 devient invalide.
                        document.getElementById('mdp2').setCustomValidity('Les mots de passes doivent être égaux.');
                    }
                    }
                </script>
            </li>

            <li>
                <label for="prenom">Prénom :</label>
                <input type="text" name="prenom" id="prenom" required placeholder="Votre prénom..." />
                <!-- ajouter à input l'attribut qui dit que c'est un champs obligatoire : required -->
                <!-- ajouter à input l'attribut qui donne une indication grisée (placeholder) -->
            </li>
            <li>
                <label for="name">Nom :</label>
                <input type="text" name="name" id="name" placeholder="Votre nom..." />
            </li>
            <li>
                <label for="tel">Telephone :</label>
                <input type="tel" name="tel" id="tel" />
            </li>
            <li>
                <label for="website">Site :</label>
                <input type="url" name="website" id="tel" />
            </li>
            <li>
                <label for="city">Ville :</label>
                <input type="text" name="ville" id="city" placeholder="Votre ville..." />
            </li>
            <li>
                <label for="sexM">H</label>
                <input type="radio" name="sexe" id="sexM" value="H" />
            </li>
            <li>
                <label for="sexF">F</label>
                <input type="radio" name="sexe" id="sexF" value="F" />
            </li>
            <li>
                <label for="birthdate">Date de naissance:</label>
                <input type="date" name="birthdate" id="birthdate" placeholder="JJ/MM/AAAA" required onchange="computeAge()" />
                <script>

                computeAge = function(e) {
                    try{
                        console.log(document.getElementById("birthdate").valueAsDate)
                        var years = new Date() - document.getElementById("birthdate").valueAsDate;
                        document.getElementById("age").value = new Date(years).getFullYear() - 1970;
                    } catch(e) {
                        // supprimez ici la valeur de l'élément age
                        document.getElementById("age").value = null;
                    }
                }
                </script>
                <span class="form_hint">Format attendu "JJ/MM/AAAA"</span>
            </li>
            <li>
                <label for="age">Age:</label>
                <input type="number" name="age" id="age" disabled />
                <!-- à quoi sert l'attribut disabled ? -->
                <!--A eempêcher des actions utilisateurs sur ce champ-->
            </li> 
            <li>
                <label for="size">Taille :</label>
                <input type="range" name="taille" id="size" min="0" max="2.50" step="0.01" />
            </li>
            <li>
                <label for="color">Couleur préférée :</label>
                <input type="color" name="couleur" id="color" value="#000000" />
            </li>
            <li>
                <label for="profilepicfile">Photo de profil:</label>
                <input type="file" id="profilepicfile" onchange="loadProfilePic(this)" />
                <!-- l'input profilepic va contenir le chemin vers l'image sur l'ordinateur du client -->
                <!-- on ne veut pas envoyer cette info avec le formulaire, donc il n'y a pas d'attribut name -->
                <span class="form_hint">Choisissez une image.</span>
                <input type="hidden" name="profilepic" id="profilepic" />
                <!-- l'input profilepic va contenir l'image redimensionnée sous forme d'une data url -->
                <!-- c'est cet input qui sera envoyé avec le formulaire, sous le nom profilepic -->
                <canvas id="preview" width="0" height="0"></canvas>
                <!-- le canvas (nouveauté html5), c'est ici qu'on affichera une visualisation de l'image. -->
                <!-- on pourrait afficher l'image dans un élément img, mais le canvas va nous permettre également
        de la redimensionner, et de l'enregistrer sous forme d'une data url-->
                <script>

                loadProfilePic = function (e) {
                    // on récupère le canvas où on affichera l'image
                    var canvas = document.getElementById("preview");
                    var ctx = canvas.getContext("2d");
                    // on réinitialise le canvas: on l'efface, et déclare sa largeur et hauteur à 0
                    ctx.fillStyle = "white";
                    ctx.fillRect(0,0,canvas.width,canvas.height);
                    canvas.width=0;
                    canvas.height=0;
                    // on récupérer le fichier: le premier (et seul dans ce cas là) de la liste
                    var file = document.getElementById("profilepicfile").files[0];
                    // l'élément img va servir à stocker l'image temporairement
                    var img = document.createElement("img");
                    // l'objet de type FileReader nous permet de lire les données du fichier.
                    var reader = new FileReader();
                    // on prépare la fonction callback qui sera appelée lorsque l'image sera chargée
                    reader.onload = function(e) {
                        //on vérifie qu'on a bien téléchargé une image, grâce au mime type
                        if (!file.type.match(/image.*/)) {
                            // le fichier choisi n'est pas une image: le champs profilepicfile est invalide, et on supprime sa valeur
                            document.getElementById("profilepicfile").setCustomValidity("Il faut télécharger une image.");
                            document.getElementById("profilepicfile").value = "";
                        }
                        else {
                            // le callback sera appelé par la méthode getAsDataURL, donc le paramètre de callback e est une url qui contient
                            // les données de l'image. On modifie donc la source de l'image pour qu'elle soit égale à cette url
                            // on aurait fait différemment si on appelait une autre méthode que getAsDataURL.
                            img.src = e.target.result;
                            // le champs profilepicfile est valide
                            document.getElementById("profilepicfile").setCustomValidity("");

                            resize(img, canvas);

                            // on dessine l'image dans le canvas à la position 0,0 (en haut à gauche)
                            // et avec une largeur de width et une hauteur de height
                            ctx.drawImage(img, 0, 0, img.width, img.height);

                            // on exporte le contenu du canvas (l'image redimensionnée) sous la forme d'une data url
                            var dataurl = canvas.toDataURL("image/png");
                            // on donne finalement cette dataurl comme valeur au champs profilepic
                            document.getElementById("profilepic").value = dataurl;
                        };
                    }
                    // on charge l'image pour de vrai, lorsque ce sera terminé le callback loadProfilePic sera appelé.
                    reader.readAsDataURL(file);
                }

                function resize(image, canvas) {
                    // A FAIRE: si on garde les deux lignes suivantes, on rétrécit l'image mais elle sera déformée
                    // Vous devez supprimer ces lignes, et modifier width et height pour:
                    //    - garder les proportions,
                    //    - et que le maximum de width et height soit égal à 96
                    var maxWidth = 96,
                        maxHeight = 96,
                        imageWidth = image.width,
                        imageHeight = image.height;


                    if (imageWidth > imageHeight) {
                        if (imageWidth > maxWidth) {
                            imageHeight *= maxWidth / imageWidth;
                            imageWidth = maxWidth;
                        }
                    }
                    else {
                        if (imageHeight > maxHeight) {
                            imageWidth *= maxHeight / imageHeight;
                            imageHeight = maxHeight;
                        }
                    }

                    image.width = imageWidth;
                    image.height = imageHeight;

                    if (canvas) {
                        canvas.width = imageWidth;
                        canvas.height = imageHeight;
                    }
                }
                </script>
            </li>
            <li>
                <input type="submit" value="Soumettre Formulaire">
            </li>
        </ul>
    </form>