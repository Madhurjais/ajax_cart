<?php 
session_start();

$_SESSION['products'] = array(array('id'=>'101','img'=>'football.png','price'=>'150.00','name'=>'foot ball'),
array('id'=>'102','img'=>'tennis.png','price'=>'120.00','name'=>'tennis'),
array('id'=>'103','img'=>'basketball.png','price'=>'90.00','name'=>'Basket ball'),
array('id'=>'104','img'=>'table-tennis.png','price'=>'110.00','name'=>'table tannis'),
array('id'=>'105','img'=>'soccer.png','price'=>'80.00','name'=>'soccar'));

function display(){
    $html = '<div id = "display">';
    foreach($_SESSION['products']  as $key => $val){
          $html .= '<div class = "form"><form action="" method="POST"><input type="hidden" name="listid" value = "'.$val['id'].'" >
          <img src="images/'.$val['img'].'">
          <h3>'.$val['name'].'</h3><span> Price :'.$val['price'].' </span>
          <input type="submit" value="add to cart" name="action" class = "addbtn" data-id = '.$val['id'].'>
          </form></div>';
    }
    $html .= "</div>";
    return $html ;
}
?>