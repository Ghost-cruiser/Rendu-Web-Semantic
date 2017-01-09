    <?php  
     session_start();

    // récupérer les éléments du formulaire  
    // et se protéger contre l'injection MySQL (plus de détails ici: http://us.php.net/mysql_real_escape_string)  
    $drawing=stripslashes($_POST['picture']);  
    $commands=stripslashes($_POST['drawingCommands']);  
    try {  
        // Connect to server and select database.  
        $dbh = new PDO('mysql:host=localhost;dbname=pictionnary', 'test', 'test'); 

            // Tenter d'inscrire l'utilisateur dans la base  
            $sql = $dbh->prepare("INSERT INTO drawings (userId, commands, drawing) "  
                    . "VALUES (:userId, :commands, :drawing)");  
            $sql->bindValue(":userId", $_SESSION["userid"]);  
            $sql->bindValue(":commands", $commands);
            $sql->bindValue(":drawing", $drawing);   
      
            // on tente d'exécuter la requête SQL, si la méthode renvoie faux alors une erreur a été rencontrée.  
            if (!$sql->execute()) {  
                echo "PDO::errorInfo():<br/>";  
                echo $drawing;
                $err = $sql->errorInfo();  
                print_r($err);  
            } else {  
                
                header("Location: ../../main.php");
            }  
            $dbh = null;  
        
    } catch (PDOException $e) {  
        print "Erreur !: " . $e->getMessage() . "<br/>";  
        $dbh = null;  
        die();  
    }  
    ?>  