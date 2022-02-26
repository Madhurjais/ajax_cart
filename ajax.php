<?php 
session_start();
if(isset($_POST['add'])){
    $id = $_POST['add'];
    $val = getproduct($id);
    if(isset($_SESSION['array'])){
          if(!productexist($id)){
               $val['quantity'] = 1;
               array_push($_SESSION['array'],$val);
          }   
     
        }
    else{
        // $val['quantity'] = 1;
        $_SESSION['array'] = array($val);
        $_SESSION['array'][0]['quantity'] = 1;
    }
    echo json_encode($_SESSION['array']);

}
function getproduct($id){
    foreach($_SESSION['products'] as $key => $val){
        if($val['id'] == $id){
            return $val ;
        }
    }
}
function productexist($id){
    foreach($_SESSION['array'] as $key => $val){
        if($id == $val['id']){
            $_SESSION['array'][$key]['quantity'] += 1 ;
            return true ;
        }
    }
    return false ;
}
if(isset($_POST['update_cart'])){
    $id = $_POST['update_cart'] ;
    $value = $_POST['value'];
    foreach($_SESSION['array'] as $key => $val){
         if($val['id'] == $id){
            $_SESSION['array'][$key]['quantity'] += $value ;
         }
    }
    echo json_encode($_SESSION['array']);

}
if(isset($_POST['del_product'])){
    $id = $_POST['del_product'] ;
    foreach($_SESSION['array'] as $key => $val){
        if($val['id']==$id){
            array_splice($_SESSION['array'],$key,1);
        }
    }
    echo json_encode($_SESSION['array']);

}
if(isset($_POST['del_cart'])){
    $_SESSION['array'] = [];
    echo json_encode($_SESSION['array']);

}
?>