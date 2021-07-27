<?PHP
//$connect    =   mysqli_connect("sql213.epizy.com","epiz_25683249","dUdzKoN537","epiz_25683249_bids");


$connect    =   mysqli_connect("localhost","root","","bookshop");

//$connect    =   mysqli_connect("localhost:3306","ravent13","@Ngissah1","ravent13_bookshop");

require 'phpmailer/PHPMailerAutoload.php';



session_start();

$mail=new PHPMailer;

$mail->Host='mail.raventechhub.com';
$mail->Port=465;
$mail->SMTPAuth=true;
$mail->SMTPSecure='tls';
$mail->Username='response@raventechhub.com';
$mail->Password='@Ngissah1';   
 
  

$_SESSION['prompt']=0;
$date = date("y-m-d", time());
$time = date("h:i:sa");
$attendance="[]";
$academics="[]";
$finance="[]";
$all_data= array();
$all_data_staff= array();
//$student_id=90;

// echo "added1";
function make_thumb($src, $dest, $desired_width,$type) {

	/* read the source image */
//    echo $src;
	$source_image = "";
    if($type=="png"){
       $source_image = imagecreatefrompng($src); 
    }elseif($type=="jpeg"){
       $source_image = imagecreatefromjpeg($src); 
    }elseif($type=="jpg"){
        $source_image = imagecreatefromjpg($src);
    }
	$height = imagesy($source_image);
    $width = imagesx($source_image);
    
//    if($width>$height){
//                
//    }
	
	/* find the "desired height" of this thumbnail, relative to the desired width  */
	$desired_height = floor($height * ($desired_width / $width));
	
	/* create a new, "virtual" image */
	$virtual_image = imagecreatetruecolor($desired_width, $desired_height);
	
	/* copy source image at a resized size */
	imagecopyresampled($virtual_image, $source_image, 0, 0, 0, 0, $desired_width, $desired_height, $width, $height);
	
	/* create the physical thumbnail image to its destination */
     if($type=="png"){
       imagepng($virtual_image, $dest); 
    }elseif($type=="jpeg"){
       imagejpeg($virtual_image, $dest);
    }elseif($type=="jpg"){
       imagejpg($virtual_image, $dest);
    }
	
}

if(isset($_POST['logout'])){
    session_destroy();
    
}


if(isset($_POST['login'])){

    $password=  $_POST['password'];
    $email= $_POST['email'];  
 
    
//   echo $email;
//   echo $password;
//    if(!empty($email) && !empty($password)){
if(!empty($email) && !empty($password)){ 

   $data_1="SELECT `img`, `fname`, `oname`, `sname`, `email`, `contact`, `residence`, `country`, `password`, `id`, `date`, `orders`, `publishes`, `cart`, `account`, `my_books` FROM `register` WHERE `email`='$email' && `password`='$password'"; 
   
    $done= mysqli_query($connect,$data_1);
    
    if ($done){
        $row = mysqli_fetch_assoc($done);
if($row['email']==$email && $row['password']==$password){
        $row= json_encode($row);
        $_SESSION['login']=$row;
        
        echo $_SESSION['login'];

}else{
    echo 0;
}
    }

    }
    
        
    else{
        echo 0;
        $_SESSION['prompt']="not registered";
    }
    
//    echo  $_SESSION['prompt'];
  
//$mail->SetFrom('heraldsworldinc@gmail.com','Heralds World Ministries Inc.');
//$mail->AddAddress($main_email,$main_fname." ".$main_oname." ".$main_sname);
//// $mail->AddReplyTo('jngissah@gmail.com','Joseph Ngissah');
//      
//$mail->isHTML(true);
//$mail->Subject='Prayer Request Received';
//$mail->Body='<div>  <p>Shalom '.$main_fname.' </p>       <p> Your Prayer request has been received, Pastor David will be praying for you. Your request will be met by the mighty hand of God.<br> Thank you.    </p>  <br>     <hr>  <br>     <div style="text-align:center;">  <img src="http://www.heraldsworldinc.com/images/hh.png" width="12%" >   <br>        <span style="font-style:italic; font-family:san-sarif; color:#006994">Heralds World Ministries Incorporated</span>  <br>         <span style="font-style:italic; font-family:san-sarif; color:#006994">Madina, Baba Yara Near the Aviation Building</span>   <br>        <span style="font-style:italic; font-family:san-sarif; color:#006994">Accra, Ghana</span> <br>         <span style="font-style:italic; font-family:san-sarif; color:#006994">	+233 244060781</span> ,          <span style="font-style:italic; font-family:san-sarif; color:#006994">	+233 246246105</span> <br>          <span style="font-style:italic; font-family:san-sarif; color:#006994">	<a>www.heraldsworldinc.com</a> </span> <br>      </div>      </div>  <div>';
//      
//if($mail->send()){
//    
//    // echo 'email sent';
//}
    
}

if(isset($_POST['add_cart'])){
    $id=mysqli_real_escape_string($connect,  $_POST['id']);
    $data= mysqli_real_escape_string($connect, $_POST['data']);
    
    if(!empty($id) && !empty($data)){
        $check  = " UPDATE `register` SET `cart`='$data' WHERE `id`='$id' ";
        $done_check=mysqli_query($connect,$check);
        
        if($done_check){
            echo 1;
        }
        
    }
    
}
 
if(isset($_POST['recovery'])){
    $email=mysqli_real_escape_string($connect,  $_POST['email']);
//    echo $email;
    if(!empty($email) ){
        $check  = "SELECT `img`, `fname`, `oname`, `sname`, `email`, `contact`, `residence`, `country`, `password`, `id`, `date`, `orders`, `publishes`, `cart`, `account`, `my_books` FROM `register` WHERE `email`='$email' "; 
        $done_check=mysqli_query($connect,$check);
//        print_r($done_check);
         $row = mysqli_fetch_assoc($done_check);
        if($row['email']==$email){
             
           
            
            $mail->SetFrom('response@raventechhub.com','Online Library');
        
$mail->AddAddress($email,$row['fname']." ".$row['oname']." ".$row['sname']);
// $mail->AddReplyTo('jngissah@gmail.com','Joseph Ngissah');
      
$mail->isHTML(true);
$mail->Subject='Password Recovery';
$mail->Body='<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
 
    <link rel="stylesheet" href="css/bootstrap.css">
   
</head>


<body>
   
    <div class="row no-gutters">
        <div class="col-lg-3"></div>
        <div class="col-lg-6 p-2">
            <div class="shadow p-2 rounded">
                Hello '.$row['fname'].', <br>
                <br>
                Welcome to softcopie.com, your password is successfully recovered. <br>
                Your recovered password is below: <br>
                <b>Password:</b> '.$row['password'].' <br>
                <br>
                please login and change your password. <br>
                link <br>
                <br>
                You can alway recover your password with using the link below. <br>
                <br>
                <hr>
                <span>Please <b>do not</b> reply to this email. This ia an automated email. If you reply, it <b>cannot</b> be read.</span><br>
                <br>
                <div class="text-center">
                    
                </div>
                
                
            </div>
        </div>
        <div class="col-lg-3"></div>
    </div>
</body>

</html>';
      
if($mail->send()){
    
     echo 'email sent';
}
            
        }else{echo 0;}
        
    }
    
}
 
if(isset($_POST['add_my_books'])){
    $id=mysqli_real_escape_string($connect,  $_POST['id']);
    $data= mysqli_real_escape_string($connect, $_POST['data']);
    
    if(!empty($id) && !empty($data)){
        $check  = " UPDATE `register` SET `my_books`='$data' WHERE `id`='$id' ";
        $done_check=mysqli_query($connect,$check);
        
        if($done_check){
            echo 1;
        }
        
    }
    
}
 
if(isset($_POST['get_books'])){

   
   $get_books = "SELECT `img`, `title`, `price`, `ISBN`, `category`, `year`, `language`, `description`, `author`, `owner_email`, `owner_id`, `record`, `status`, `time`, `date`, `id`, `book_name` FROM `book`";
    
    $done_check = mysqli_query($connect,$get_books);

//    echo $done_check;
//        $row = mysqli_fetch_assoc($done_check);
        $row = mysqli_fetch_all($done_check);

        $row = json_encode($row);
    
        $_SESSION['get_books']=$row;
        
        echo $_SESSION['get_books'];


   
    
}
 
if(isset($_POST['add_new'])){
//    echo "added1";
    $img_name="";
    if(!(isset($_FILES['file']))){
        $img_name="none";
    }else{
     $img_name=$_FILES['file']['name'];   
    }
//    echo $_FILES['file']['name'];
    $type=(explode('/',$_FILES['file']['type']));
    $type=$type[1];
    
    $fname=mysqli_real_escape_string($connect,  $_POST['fname']);
    $oname= mysqli_real_escape_string($connect, $_POST['oname']);
    $sname= mysqli_real_escape_string($connect, $_POST['sname']);
    $residence= mysqli_real_escape_string($connect, $_POST['residence']);
    $country=  $_POST['country'];
    $password=  $_POST['password'];
    $email= mysqli_real_escape_string($connect, $_POST['email']);
    $contact= mysqli_real_escape_string($connect, $_POST['contact']); 
    $account= '[{"account_details":[],"total_withdrawal":[],"withdrawals":[]}]';
//    $img_name=$_FILES['img']['name'];
    
    
    
    
    
   $check = "SELECT `fname`, `oname`, `sname`, `email`, `contact`, `residence`, `country`, `password`, `date`  FROM `register` WHERE (`fname`='$fname' && `oname`='$oname' && `sname`='$sname') || `email`='$email' ";
    
    $done_check=mysqli_query($connect,$check);
//    echo $done_check;
    
    if((mysqli_num_rows($done_check)==0)){
    
if(!empty($email) && !empty($password)){ 
    
//    echo 1;
   
   $data_1="INSERT INTO `register`(`img`,`fname`, `oname`, `sname`, `email`, `contact`, `residence`, `country`, `password`, `date`, `orders`, `publishes`, `cart`, `account`, `my_books`) VALUES ('$img_name','$fname','$oname','$sname','$email','$contact','$residence','$country','$password','$date','[]','[]','[]','$account','[]')"; 
   
        $done= mysqli_query($connect,$data_1); 
    if ($done){
        
//        echo 1;
        
        $target="img_load/person/".basename($img_name);

        if(move_uploaded_file($_FILES['file']['tmp_name'],$target)){
//            echo "uploaded";
         make_thumb("img_load/person/".$img_name,"img_load/person/".$img_name,200,$type);

        }
        
//$mail->SetFrom('mail.raventechhub.com','Online Library');
//        
//$mail->AddAddress($main_email,$main_fname." ".$main_oname." ".$main_sname);
//// $mail->AddReplyTo('jngissah@gmail.com','Joseph Ngissah');
//      
//$mail->isHTML(true);
//$mail->Subject='Successfull Registration';
//$mail->Body='<div>  <p>Hello '.$main_fname.', </p><p> Thank you for signing up with softcopie.com, you are eligiblbe to download all free books on our platform</p>  <br>  <hr>  <br>   <div>';
//      
//if($mail->send()){
//    
//    // echo 'email sent';
//}
//        
        
    $data_1="SELECT `img`,`fname`, `oname`, `sname`, `email`, `contact`, `residence`, `country`, `password`, `id`, `date`, `orders`, `publishes`, `cart`, `account`, `my_books` FROM `register` WHERE `email`='$email' && `password`='$password'"; 
   
    $done= mysqli_query($connect,$data_1);
    
    if ($done){
        $row = mysqli_fetch_assoc($done);
if($row['email']==$email && $row['password']==$password){
        $row= json_encode($row);
        $_SESSION['login']=$row;
        
        echo $_SESSION['login'];

}
        
        
        
        
//                $_SESSION['prompt']="Registered";

        
}

    }
    }else{
//        $_SESSION['prompt']="Staff has been registered already";
//        echo 2;
    }
    }
    
//    echo  $_SESSION['prompt'];
  

    
}
  
if(isset($_POST['update_new'])){
//    echo $_FILES['file'];
     $img_name= "";
     $type = "";
    if(!(isset($_FILES['file']))){
        $img_name="null";
    }else{
    
    $img_name=$_FILES['file']['name']; 
    $type=(explode('/',$_FILES['file']['type']));
     $type=$type[1]; 
    }
//    echo $_FILES['file'];
    
   
    
   
    $fname=mysqli_real_escape_string($connect,  $_POST['fname']);
    $oname= mysqli_real_escape_string($connect, $_POST['oname']);
    $sname= mysqli_real_escape_string($connect, $_POST['sname']);
    $residence= mysqli_real_escape_string($connect, $_POST['residence']);
    $country=  $_POST['country'];
    $password=  $_POST['password'];
    $id=  $_POST['id'];
//    $email= mysqli_real_escape_string($connect, $_POST['email']);
    $contact= mysqli_real_escape_string($connect, $_POST['contact']);  
//    $img_name=$_FILES['img']['name'];
    
    
    
if(!empty($fname) && !empty($oname)){ 
    
//    echo 1;
//    $data_1="";
    
   if($img_name!='null'){
   $data_1="UPDATE `register` SET `img`='$img_name',`fname`='$fname',`oname`='$oname',`sname`='$sname',`contact`='$contact',`residence`='$residence',`country`='$country' WHERE `id`='$id' && `password`='$password' "; 
   }else{
       $data_1="UPDATE `register` SET `fname`='$fname',`oname`='$oname',`sname`='$sname',`contact`='$contact',`residence`='$residence',`country`='$country' WHERE `id`='$id' && `password`='$password' ";
   }
        $done= mysqli_query($connect,$data_1); 
    if ($done){
        
//        echo "uploaded";
        if($img_name!='null'){
        
        $target="img_load/person/".basename($img_name);

        if(move_uploaded_file($_FILES['file']['tmp_name'],$target)){
//            echo "uploaded";
//            echo 1;
                     make_thumb("img_load/person/".$img_name,"img_load/person/".$img_name,200,$type);

            
        }
        
        }
        
    $data_1="SELECT `img`,`fname`, `oname`, `sname`, `email`, `contact`, `residence`, `country`, `password`, `id`, `date`, `orders`, `publishes`, `cart`, `account`, `my_books` FROM `register` WHERE `id`='$id' && `password`='$password'"; 
   
    $done= mysqli_query($connect,$data_1);
    
    if ($done){
        $row = mysqli_fetch_assoc($done);
if($row['id']==$id && $row['password']==$password){
        $row= json_encode($row);
        $_SESSION['login']=$row;
        
        echo $_SESSION['login'];

}
        
        
        
        
//                $_SESSION['prompt']="Registered";

        
}

    }
    }else{
//        $_SESSION['prompt']="Staff has been registered already";
//        echo 2;
    }
    
    
//    echo  $_SESSION['prompt'];
  
//$mail->SetFrom('heraldsworldinc@gmail.com','Heralds World Ministries Inc.');
//$mail->AddAddress($main_email,$main_fname." ".$main_oname." ".$main_sname);
//// $mail->AddReplyTo('jngissah@gmail.com','Joseph Ngissah');
//      
//$mail->isHTML(true);
//$mail->Subject='Prayer Request Received';
//$mail->Body='<div>  <p>Shalom '.$main_fname.' </p>       <p> Your Prayer request has been received, Pastor David will be praying for you. Your request will be met by the mighty hand of God.<br> Thank you.    </p>  <br>     <hr>  <br>     <div style="text-align:center;">  <img src="http://www.heraldsworldinc.com/images/hh.png" width="12%" >   <br>        <span style="font-style:italic; font-family:san-sarif; color:#006994">Heralds World Ministries Incorporated</span>  <br>         <span style="font-style:italic; font-family:san-sarif; color:#006994">Madina, Baba Yara Near the Aviation Building</span>   <br>        <span style="font-style:italic; font-family:san-sarif; color:#006994">Accra, Ghana</span> <br>         <span style="font-style:italic; font-family:san-sarif; color:#006994">	+233 244060781</span> ,          <span style="font-style:italic; font-family:san-sarif; color:#006994">	+233 246246105</span> <br>          <span style="font-style:italic; font-family:san-sarif; color:#006994">	<a>www.heraldsworldinc.com</a> </span> <br>      </div>      </div>  <div>';
//      
//if($mail->send()){
//    
//    // echo 'email sent';
//}
    
}
  
if(isset($_POST['update_new_email'])){
//    echo $_FILES['file'];
     
   
    
    $password=  $_POST['password'];
    $id=  $_POST['id'];
    $email= mysqli_real_escape_string($connect, $_POST['new_email']);  
//    $img_name=$_FILES['img']['name'];
    
    
    
if(!empty($password) && !empty($id)){ 
    
//    echo 1;
    $data_1="";
    
   
       $data_1="UPDATE `register` SET `email`='$email' WHERE `id`='$id' && `password`='$password' ";

        $done= mysqli_query($connect,$data_1); 
    if ($done){
        
        
    $data_1="SELECT `img`,`fname`, `oname`, `sname`, `email`, `contact`, `residence`, `country`, `password`, `id`, `date`, `orders`, `publishes`, `cart`, `account` FROM `register` WHERE `id`='$id' && `password`='$password'"; 
   
    $done= mysqli_query($connect,$data_1);
    
    if ($done){
        $row = mysqli_fetch_assoc($done);
if($row['id']==$id && $row['password']==$password){
        $row= json_encode($row);
        $_SESSION['login']=$row;
        
        echo $_SESSION['login'];

}
        
        
        
        
//                $_SESSION['prompt']="Registered";

        
}

    }
    }else{
//        $_SESSION['prompt']="Staff has been registered already";
//        echo 2;
    }
    
    
//    echo  $_SESSION['prompt'];
  
//$mail->SetFrom('heraldsworldinc@gmail.com','Heralds World Ministries Inc.');
//$mail->AddAddress($main_email,$main_fname." ".$main_oname." ".$main_sname);
//// $mail->AddReplyTo('jngissah@gmail.com','Joseph Ngissah');
//      
//$mail->isHTML(true);
//$mail->Subject='Prayer Request Received';
//$mail->Body='<div>  <p>Shalom '.$main_fname.' </p>       <p> Your Prayer request has been received, Pastor David will be praying for you. Your request will be met by the mighty hand of God.<br> Thank you.    </p>  <br>     <hr>  <br>     <div style="text-align:center;">  <img src="http://www.heraldsworldinc.com/images/hh.png" width="12%" >   <br>        <span style="font-style:italic; font-family:san-sarif; color:#006994">Heralds World Ministries Incorporated</span>  <br>         <span style="font-style:italic; font-family:san-sarif; color:#006994">Madina, Baba Yara Near the Aviation Building</span>   <br>        <span style="font-style:italic; font-family:san-sarif; color:#006994">Accra, Ghana</span> <br>         <span style="font-style:italic; font-family:san-sarif; color:#006994">	+233 244060781</span> ,          <span style="font-style:italic; font-family:san-sarif; color:#006994">	+233 246246105</span> <br>          <span style="font-style:italic; font-family:san-sarif; color:#006994">	<a>www.heraldsworldinc.com</a> </span> <br>      </div>      </div>  <div>';
//      
//if($mail->send()){
//    
//    // echo 'email sent';
//}
    
}
  
if(isset($_POST['update_new_password'])){

    
    $password=  $_POST['new_password'];
    $id=  $_POST['id'];
    $email= mysqli_real_escape_string($connect, $_POST['email']);  
//    $img_name=$_FILES['img']['name'];
    
    
    
if(!empty($password) && !empty($id)){ 
    
//    echo 1;
    $data_1="";
    
   
       $data_1="UPDATE `register` SET `password`='$password' WHERE `id`='$id' && `email`='$email' ";

        $done= mysqli_query($connect,$data_1); 
    if ($done){
        
        
    $data_1="SELECT `img`,`fname`, `oname`, `sname`, `email`, `contact`, `residence`, `country`, `password`, `id`, `date`, `orders`, `publishes`, `cart`, `account` FROM `register` WHERE `id`='$id' && `password`='$password'"; 
   
    $done= mysqli_query($connect,$data_1);
    
    if ($done){
        $row = mysqli_fetch_assoc($done);
if($row['id']==$id && $row['password']==$password){
        $row= json_encode($row);
        $_SESSION['login']=$row;
        
        echo $_SESSION['login'];

}
        
        
        
        
//                $_SESSION['prompt']="Registered";

        
}

    }
    }else{
//        $_SESSION['prompt']="Staff has been registered already";
//        echo 2;
    }
    
    
//    echo  $_SESSION['prompt'];
  
//$mail->SetFrom('heraldsworldinc@gmail.com','Heralds World Ministries Inc.');
//$mail->AddAddress($main_email,$main_fname." ".$main_oname." ".$main_sname);
//// $mail->AddReplyTo('jngissah@gmail.com','Joseph Ngissah');
//      
//$mail->isHTML(true);
//$mail->Subject='Prayer Request Received';
//$mail->Body='<div>  <p>Shalom '.$main_fname.' </p>       <p> Your Prayer request has been received, Pastor David will be praying for you. Your request will be met by the mighty hand of God.<br> Thank you.    </p>  <br>     <hr>  <br>     <div style="text-align:center;">  <img src="http://www.heraldsworldinc.com/images/hh.png" width="12%" >   <br>        <span style="font-style:italic; font-family:san-sarif; color:#006994">Heralds World Ministries Incorporated</span>  <br>         <span style="font-style:italic; font-family:san-sarif; color:#006994">Madina, Baba Yara Near the Aviation Building</span>   <br>        <span style="font-style:italic; font-family:san-sarif; color:#006994">Accra, Ghana</span> <br>         <span style="font-style:italic; font-family:san-sarif; color:#006994">	+233 244060781</span> ,          <span style="font-style:italic; font-family:san-sarif; color:#006994">	+233 246246105</span> <br>          <span style="font-style:italic; font-family:san-sarif; color:#006994">	<a>www.heraldsworldinc.com</a> </span> <br>      </div>      </div>  <div>';
//      
//if($mail->send()){
//    
//    // echo 'email sent';
//}
    
}
   
if(isset($_POST['add_book'])){

//    echo 'add book';
    
    $img_name="";
     if(!(isset($_FILES['file']))){
        $img_name="none";
    }else{
     $img_name=$_FILES['file']['name'];   
    }
//    print_r($_FILES['file']);
    $type=explode('/',$_FILES['file']['type']);
    $type=$type[1];
    
    $book_name=$_FILES['file_book']['name'];
    $title=mysqli_real_escape_string($connect,  $_POST['title']);
    $price= mysqli_real_escape_string($connect, $_POST['price']);
    $ISBN= mysqli_real_escape_string($connect, $_POST['ISBN']);
    $category= mysqli_real_escape_string($connect, $_POST['category']);
    $year= mysqli_real_escape_string($connect, $_POST['year']);
    $language= mysqli_real_escape_string($connect, $_POST['language']);
    $description= mysqli_real_escape_string($connect, $_POST['description']);
    $author= mysqli_real_escape_string($connect, $_POST['author']);
    $owner_email= mysqli_real_escape_string($connect, $_POST['owner_email']);
    $owner_id= mysqli_real_escape_string($connect, $_POST['owner_id']);
    $record= '{"download":[],"purchase":[],"read":[]}';
    
if(!empty($title) && !empty($price) && !empty($category)){ 
    
//  echo "added2";
       
$data_1="INSERT INTO `book`(`img`, `title`, `price`, `ISBN`, `category`, `year`, `language`, `description`, `author`, `owner_email`, `owner_id`,`record`,`status`,`date`,`time`,`book_name`) VALUES ('$img_name','$title','$price','$ISBN','$category','$year','$language','$description','$author','$owner_email','$owner_id','$record','Pending','$date','$time','$book_name')";  
    
    $done = mysqli_query($connect,$data_1); 
    
    if ($done){
        
        $_SESSION['prompt']="Staff updated";
        
        $target="img_load/".basename($img_name);

        $target2="books/".basename($book_name);

        if(move_uploaded_file($_FILES['file_book']['tmp_name'],$target2)){
//            echo "uploaded";
//            echo 0;
              if(move_uploaded_file($_FILES['file']['tmp_name'],$target)){

                  make_thumb("img_load/".$img_name,"img_load/".$img_name,200,$type);
        }
            
        }
        
      

        
        
   
        
        
        
}
    
    }
    
//$mail->SetFrom('heraldsworldinc@gmail.com','Heralds World Ministries Inc.');
//$mail->AddAddress($main_email,$main_fname." ".$main_oname." ".$main_sname);
//// $mail->AddReplyTo('jngissah@gmail.com','Joseph Ngissah');
//      
//$mail->isHTML(true);
//$mail->Subject='Prayer Request Received';
//$mail->Body='<div>  <p>Shalom '.$main_fname.' </p>       <p> Your Prayer request has been received, Pastor David will be praying for you. Your request will be met by the mighty hand of God.<br> Thank you.    </p>  <br>     <hr>  <br>     <div style="text-align:center;">  <img src="http://www.heraldsworldinc.com/images/hh.png" width="12%" >   <br>        <span style="font-style:italic; font-family:san-sarif; color:#006994">Heralds World Ministries Incorporated</span>  <br>         <span style="font-style:italic; font-family:san-sarif; color:#006994">Madina, Baba Yara Near the Aviation Building</span>   <br>        <span style="font-style:italic; font-family:san-sarif; color:#006994">Accra, Ghana</span> <br>         <span style="font-style:italic; font-family:san-sarif; color:#006994">	+233 244060781</span> ,          <span style="font-style:italic; font-family:san-sarif; color:#006994">	+233 246246105</span> <br>          <span style="font-style:italic; font-family:san-sarif; color:#006994">	<a>www.heraldsworldinc.com</a> </span> <br>      </div>      </div>  <div>';
//      
//if($mail->send()){
//    
//    // echo 'email sent';
//}
}
   
if(isset($_POST['record_book'])){

//    echo 'add book';
    
    $id = mysqli_real_escape_string($connect,  $_POST['id']);
    $data = $_POST['record'];
    
    
if(!empty($id) && !empty($data) ){ 
    
  echo "added2";
       
$data_1="UPDATE `book` SET `record`='$data' WHERE `id`='$id' ";  
    
    $done = mysqli_query($connect,$data_1); 
    
    if ($done){
     
    }
    
    }
    
//$mail->SetFrom('heraldsworldinc@gmail.com','Heralds World Ministries Inc.');
//$mail->AddAddress($main_email,$main_fname." ".$main_oname." ".$main_sname);
//// $mail->AddReplyTo('jngissah@gmail.com','Joseph Ngissah');
//      
//$mail->isHTML(true);
//$mail->Subject='Prayer Request Received';
//$mail->Body='<div>  <p>Shalom '.$main_fname.' </p>       <p> Your Prayer request has been received, Pastor David will be praying for you. Your request will be met by the mighty hand of God.<br> Thank you.    </p>  <br>     <hr>  <br>     <div style="text-align:center;">  <img src="http://www.heraldsworldinc.com/images/hh.png" width="12%" >   <br>        <span style="font-style:italic; font-family:san-sarif; color:#006994">Heralds World Ministries Incorporated</span>  <br>         <span style="font-style:italic; font-family:san-sarif; color:#006994">Madina, Baba Yara Near the Aviation Building</span>   <br>        <span style="font-style:italic; font-family:san-sarif; color:#006994">Accra, Ghana</span> <br>         <span style="font-style:italic; font-family:san-sarif; color:#006994">	+233 244060781</span> ,          <span style="font-style:italic; font-family:san-sarif; color:#006994">	+233 246246105</span> <br>          <span style="font-style:italic; font-family:san-sarif; color:#006994">	<a>www.heraldsworldinc.com</a> </span> <br>      </div>      </div>  <div>';
//      
//if($mail->send()){
//    
//    // echo 'email sent';
//}
}
   
if(isset($_POST['publish_book']) || isset($_POST['decline_book'])){

//    echo 'add book';
    
    $id = mysqli_real_escape_string($connect,  $_POST['id']);
    $status = $_POST['status'];
    
    
if(!empty($id) && !empty($status) ){ 
       
$data_1="UPDATE `book` SET `status`='$status' WHERE `id`='$id' ";  
    
    $done = mysqli_query($connect,$data_1); 
    
    if ($done){
     echo "status changed";
    }
    
    }
    
//$mail->SetFrom('heraldsworldinc@gmail.com','Heralds World Ministries Inc.');
//$mail->AddAddress($main_email,$main_fname." ".$main_oname." ".$main_sname);
//// $mail->AddReplyTo('jngissah@gmail.com','Joseph Ngissah');
//      
//$mail->isHTML(true);
//$mail->Subject='Prayer Request Received';
//$mail->Body='<div>  <p>Shalom '.$main_fname.' </p>       <p> Your Prayer request has been received, Pastor David will be praying for you. Your request will be met by the mighty hand of God.<br> Thank you.    </p>  <br>     <hr>  <br>     <div style="text-align:center;">  <img src="http://www.heraldsworldinc.com/images/hh.png" width="12%" >   <br>        <span style="font-style:italic; font-family:san-sarif; color:#006994">Heralds World Ministries Incorporated</span>  <br>         <span style="font-style:italic; font-family:san-sarif; color:#006994">Madina, Baba Yara Near the Aviation Building</span>   <br>        <span style="font-style:italic; font-family:san-sarif; color:#006994">Accra, Ghana</span> <br>         <span style="font-style:italic; font-family:san-sarif; color:#006994">	+233 244060781</span> ,          <span style="font-style:italic; font-family:san-sarif; color:#006994">	+233 246246105</span> <br>          <span style="font-style:italic; font-family:san-sarif; color:#006994">	<a>www.heraldsworldinc.com</a> </span> <br>      </div>      </div>  <div>';
//      
//if($mail->send()){
//    
//    // echo 'email sent';
//}
}
   
if(isset($_POST['update_acc'])){

//    echo 'add book';
    
    $id = mysqli_real_escape_string($connect,  $_POST['id']);
    $data = $_POST['data'];
    
    
if(!empty($id) && !empty($data) ){ 
    
  echo "added2";
       
$data_1="UPDATE `register` SET `account`='$data' WHERE `id`='$id' ";  
    
    $done = mysqli_query($connect,$data_1); 
    
    if ($done){
     
    }
    
    }
    
//$mail->SetFrom('heraldsworldinc@gmail.com','Heralds World Ministries Inc.');
//$mail->AddAddress($main_email,$main_fname." ".$main_oname." ".$main_sname);
//// $mail->AddReplyTo('jngissah@gmail.com','Joseph Ngissah');
//      
//$mail->isHTML(true);
//$mail->Subject='Prayer Request Received';
//$mail->Body='<div>  <p>Shalom '.$main_fname.' </p>       <p> Your Prayer request has been received, Pastor David will be praying for you. Your request will be met by the mighty hand of God.<br> Thank you.    </p>  <br>     <hr>  <br>     <div style="text-align:center;">  <img src="http://www.heraldsworldinc.com/images/hh.png" width="12%" >   <br>        <span style="font-style:italic; font-family:san-sarif; color:#006994">Heralds World Ministries Incorporated</span>  <br>         <span style="font-style:italic; font-family:san-sarif; color:#006994">Madina, Baba Yara Near the Aviation Building</span>   <br>        <span style="font-style:italic; font-family:san-sarif; color:#006994">Accra, Ghana</span> <br>         <span style="font-style:italic; font-family:san-sarif; color:#006994">	+233 244060781</span> ,          <span style="font-style:italic; font-family:san-sarif; color:#006994">	+233 246246105</span> <br>          <span style="font-style:italic; font-family:san-sarif; color:#006994">	<a>www.heraldsworldinc.com</a> </span> <br>      </div>      </div>  <div>';
//      
//if($mail->send()){
//    
//    // echo 'email sent';
//}
}



?>