<!DOCTYPE html>
<html>
<head>
    <meta charset=utf-8 />
    <link href="css/styles.css" rel="stylesheet" />
    <title>Pictionnary - Inscription</title>
</head>
<body>    

    <?php  
        include("components/header/header.php");
    ?>  



    <div id="content-presenter">
    <?php  
        if(!isset($_SESSION['userid'])) {  
            include("components/inscription/inscription.php");
        }
        else {
            echo '<div><a href="components/paint/paint.php">GO Paint !</a></div>';


                  
    try {  
        // Connect to server and select database.  
        $dbh = new PDO('mysql:host=localhost;dbname=pictionnary', 'test', 'test'); 

            // Tenter d'inscrire l'utilisateur dans la base  
                $sql = $dbh->query("SELECT * FROM drawings WHERE userId=" . $_SESSION['userid']);  
      
                $i =0;
                if ($sql){
                    while ($drawing = $sql->fetch()) {  
                        $i++;
                        echo '<div><a href="components/guess/guess.php?id='. $drawing["id"].'">Dessin numero '. $i . '</a></div>';  
                    } 
                }
                else {
                    echo "Pas encore de dessin!";
                }
            $dbh = null;  
        
    } catch (PDOException $e) {  
        print "Erreur !: " . $e->getMessage() . "<br/>";  
        $dbh = null;  
        die();  
    }  
        }
    ?>  
    </div>


</body>
</html>
