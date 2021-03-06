<?php  
// on démarre la session, si l'utilisateur n'est pas connecté alors on redirige vers la page main.php.  
session_start();  
if(!isset($_SESSION['user'])) {  
    header("Location: main.php");  
}  
?>  
<!DOCTYPE html>  
<html>  
<head>  
    <meta charset=utf-8 />  
    <title>Pictionnary</title>  
    <link rel="stylesheet" media="screen" href="../../css/styles.css" >  
    <script>  
  
        // les quatre tailles de pinceau possible.  
        var sizes=[8,20,44,90];  
        // la taille et la couleur du pinceau  
        var size, color;  
        // la dernière position du stylo  
        var x0, y0;  
        // le tableau de commandes de dessin à envoyer au serveur lors de la validation du dessin  
        var drawingCommands = [];  
  
        var setColor = function() {  
            // on récupère la valeur du champs couleur  
            color = document.getElementById('color').value;  
            console.log("color:" + color);  
        }  
  
        var setSize = function() {  
            // ici, récupèrez la taille dans le tableau de tailles, en fonction de la valeur choisie dans le champs taille. 
            size = sizes[document.getElementById('size').value];   
            console.log("size:" + size);  
        }  
  
        window.onload = function() {  
            var canvas = document.getElementById('myCanvas');  
            canvas.width = 400;  
            canvas.height= 400;  
            var context = canvas.getContext('2d');  
  
            setSize();  
            setColor();  
            document.getElementById('size').onchange = setSize;  
            document.getElementById('color').onchange = setColor;  
  
            var isDrawing = false;  
  
            var startDrawing = function(e) {  
                e = e || window.event;
                console.log("start");  
                // créer un nouvel objet qui représente une commande de type "start", avec la position, la couleur  
                var command = new Command("start", e);
                drawingCommands.push(command);  
  
                // ici, dessinez un cercle de la bonne couleur, de la bonne taille, et au bon endroit.   
                drawCircle(command);

                isDrawing = true;  
            }  
  
            var stopDrawing = function(e) {  
                console.log("stop");  
                isDrawing = false;  
            }  
  
            var draw = function(e) {  
                e = e || window.event;
                if(isDrawing) {  
                    // ici, créer un nouvel objet qui représente une commande de type "draw", avec la position, et l'ajouter à la liste des commandes.                  
                    var command = new Command("draw", e); 
                    drawingCommands.push(command);  
                    // ici, dessinez un cercle de la bonne couleur, de la bonne taille, et au bon endroit.   
                    drawCircle(command);
                }  
            }  
  
            canvas.onmousedown = startDrawing;  
            canvas.onmouseout = stopDrawing;  
            canvas.onmouseup = stopDrawing;  
            canvas.onmousemove = draw;  
  
            document.getElementById('restart').onclick = function() {  
                console.log("clear");  
                // ici ajouter à la liste des commandes une nouvelle commande de type "clear"                     
                var command = new Command("clear");
                drawingCommands.push(command);  

                // ici, effacer le context, grace à la méthode clearRect.   
                drawCircle(command);
            };  
  
            document.getElementById('validate').onclick = function() {  
                // la prochaine ligne transforme la liste de commandes en une chaîne de caractères, et l'ajoute en valeur au champs "drawingCommands" pour l'envoyer au serveur.  
                document.getElementById('drawingCommands').value = JSON.stringify(drawingCommands);  
  
                // ici, exportez le contenu du canvas dans un data url, et ajoutez le en valeur au champs "picture" pour l'envoyer au serveur.  
                     document.getElementById('picture').value = document.getElementById('myCanvas').toDataURL();

            }; 

            function drawCircle(command){

                var context = document.getElementById('myCanvas').getContext("2d");

                if (command.command === "start"){
                    context.beginPath();
                    context.arc(command.x, command.y, size / 10, 0, 2 * Math.PI, false);
                    context.fillStyle = color;
                    context.fill();
                    
                    x0 = command.x;
                    y0 = command.y;
                }
                if (command.command === "draw"){
                    context.beginPath();
                    context.moveTo(x0,y0);
                    context.lineTo(command.x,command.y);
                    context.lineWidth = size / 5;
                    
                    x0 = command.x;
                    y0 = command.y;

                    context.strokeStyle = color;      
                    context.stroke();
                }
                else if (command.command === "clear"){
                    context.clearRect(0, 0, canvas.width, canvas.height);
                }
            }

            function Command(type, e){
                return {
                    command:type, 
                    x: e ? e.x : "",
                    y: e ? e.y : "",
                    size:size,
                    color: color
                }
            }
        };  
    </script>  
</head>  
<body>  
  
<canvas id="myCanvas"></canvas>  
  
<form name="tools" action="../../php/req_paint.php" method="post">  
    <!-- ici, insérez un champs de type range avec id="size", pour choisir un entier entre 0 et 4) -->
    <input id="size" type="range" min="0" max="4" />
    <!-- ici, insérez un champs de type color avec id="color", et comme valeur l'attribut  de session couleur (à l'aide d'une commande php echo).) -->  
    <?php echo '<input id="color" type="color" value="#'. $_SESSION['usercolor'] . '" />' ?>
  
    <input id="restart" type="button" value="Recommencer"/>  

    <!-- à quoi servent ces champs hidden ? -->  
    <input type="hidden" id="drawingCommands" name="drawingCommands" required/>  
    <!--Permet de contenir les commandes de l'utilisateur pour les envoyer vers le serveur au moment de la validation-->
    <input type="hidden" id="picture" name="picture" required />  
    <!--Permet de contenir l'url du dessin pour l'envoyer vers le serveur au moment de la validation-->


    <input id="validate" type="submit" value="Valider"/>  
</form>  
  
</body>  
</html>