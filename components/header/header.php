<header>
     <?php  
        session_start();  
        if(isset($_SESSION['username'])){
            echo "<h3>Bonjour " . $_SESSION['username']. "</h3>";

            if (isset($_SESSION['userpic']))
                echo "<img src=\"" . $_SESSION['userpic'] . "\"></img>";

            echo "<form action='php/logout.php' method='get'> <label for='deco'>Déconnexion </label> <input type='submit' id='deco'/> </form>";
        }
        else {
            echo "<form action='php/logout.php' method='get'> <label for='deco'>Utilisateur</label><input type='email' id='user' name='email'/>  <label for='pass'>Mot de passe</label><input type='password' id='pass' name='password'/> </form>";
        } 
    ?>  
</header>