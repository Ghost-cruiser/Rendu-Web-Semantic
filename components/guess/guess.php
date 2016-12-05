    <?php  
    session_start();  
    if(!isset($_SESSION['userid'])) {  
        header("Location: ../../main.php");  
    } else {  
     // ici, récupérer la liste des commandes dans la table DRAWINGS avec l'identifiant $_GET['id']  
     // l'enregistrer dans la variable $commands  
     $id = $_GET['id'];
        $dbh = new PDO('mysql:host=localhost;dbname=pictionnary', 'test', 'test');  
        $sql = $dbh->query("SELECT commands FROM drawings WHERE id=" . $id); 
        $commands = $sql->fetch()["commands"];
    }  
      
    ?>  
    <!DOCTYPE html>  
    <html>  
    <head>  
        <meta charset=utf-8 />  
        <title>Pictionnary</title>  
        <link rel="stylesheet" media="screen" href="../../css/styles.css" >  
        <script>  
            // la taille et la couleur du pinceau  
            var size, color;  
            // la dernière position du stylo  
            var x0, y0;  
            // le tableau de commandes de dessin à envoyer au serveur lors de la validation du dessin  
            var drawingCommands = <?php echo $commands;?>;  
            
                console.log(drawingCommands);
            window.onload = function() {  
                var canvas = document.getElementById('myCanvas');  
                canvas.width = 400;  
                canvas.height= 400;  
                var context = canvas.getContext('2d');  
      
                var start = function(c) {  
                    // complétez  
                    context.beginPath();
                    context.arc(c.x, c.y, c.size / 10, 0, 2 * Math.PI, false);
                    context.fillStyle = c.color;
                    context.fill();
                    x0 = c.x;
                    y0 = c.y;
                }  
      
                var draw = function(c) {  
                    // complétez  
                    context.moveTo(x0, y0);
                    context.lineTo(c.x,c.y);
                    context.lineWidth = c.size / 5;
                    context.strokeStyle = c.color;  
                    context.stroke();
                    x0 = c.x;
                    y0 = c.y;
                }  
      
                var clear = function() {  
                    // complétez  
                    contexte.clearRect();
                }  
      
                // étudiez ce bout de code  
                // = itère sur les commandes afin de reproduire le dessin
                var i = 0;  
                var iterate = function() {  
                    if(i>=drawingCommands.length)  
                        return;  
                    var c = drawingCommands[i];  
                    switch(c.command) {  
                        case "start":  
                            start(c);  
                            break;  
                        case "draw":  
                            draw(c);  
                            break;  
                        case "clear":  
                            clear();  
                            break;  
                        default:  
                            console.error("cette commande n'existe pas "+ c.command);  
                    }  
                    i++;  
                    setTimeout(iterate,30);  
                };  
      
                iterate();  
      
            };  
      
        </script>  
    </head>  
    <body>  
    <canvas id="myCanvas"></canvas>  
    </body>  
    </html>  