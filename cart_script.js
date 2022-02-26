$(document).ready(function () {
  $("body").on("click", ".addbtn", function (e) {
    e.preventDefault();
    var id = $(this).data("id");
    // console.log($id);
    $.ajax({
      method: "POST",
      url: "ajax.php",
      data: { add: id },
      datatype: "JSON",
    }).done(function (data) {
      // console.log(data);
      d = $.parseJSON(data);
      display_cart(d);
    });
  });
});

$(document).ready(function () {
  $("body").on("click", ".update", function (e) {
    e.preventDefault();
    var id = $(this).data("sub_id");
    $.ajax({
      method: "POST",
      url: "ajax.php",
      data: { update_cart: id, value: $("#" + id).val() },
      datatype: "JSON",
    }).done(function (data) {
      // console.log(data);
      d = $.parseJSON(data);
      display_cart(d);
    });
  });
});

$(document).ready(function () {
  $("body").on("click", "#remove", function (e) {
    e.preventDefault();
    var id = $(this).data("del_id");
    $.ajax({
      method: "POST",
      url: "ajax.php",
      data: { del_product: id },
      datatype: "JSON",
    }).done(function (data) {
      // console.log(data);
      d = $.parseJSON(data);
      display_cart(d);
    });
  });
});
$(document).ready(function () {
  $("body").on("click", "#del_cart", function (e) {
    e.preventDefault();
    $.ajax({
      method: "POST",
      url: "ajax.php",
      data: { del_cart: "delete" },
      datatype: "JSON",
    }).done(function (data) {
      // console.log(data);
      d = $.parseJSON(data);
      display_cart(d);
    });
  });
});
function display() {
  $html = '<div id = "display">';
  for (var i = 0; i < $_SESSION["products"].length; i++) {
    $html +=
      '<div class = "form"><form action="" method="POST"><input type="hidden" name="listid" value = "' +
      $val["id"] +
      '" >\
          <img src="images/' +
      $val["img"] +
      '">\
          <h3>' +
      $val["name"] +
      "</h3><span> Price :" +
      $val["price"] +
      ' </span>\
          <input type="submit" value="add" name="action" id = "addbtn" data-id = ' +
      $val["id"] +
      ">\
          </form></div>";
  }
  $html += "</div>";
  return $html;
}
function display_cart(arr) {
  var cart = `
             <table><input type = "button" value = "X" class = "close" id = "del_cart" style = "margin-left : 50px ; padding : 10px; background-color : red ;">
             <tr><th>ID</th><th>NAME</th><th>PRICE</th>
             <th>quantity</th><th>update</th><th>total price</th></tr>`;
  var total = 0;
  for (var i = 0; i < arr.length; i++) {
    cart += `<tr><td>${arr[i].id}</td>
        <td>${arr[i].name}</td>
        <td>${arr[i].price}</td>
        <td>${arr[i].quantity}</td>
        <td><input type = "number" class = "quant" id = "${
          arr[i].id
        }"><input type = "button" class = "update" data-sub_id = "${
      arr[i].id
    }" data-textid = ${arr[i].id}
     value = "update"></td>
        <td>${arr[i].price * arr[i].quantity}</td>
        <td><a href = "#" id = "remove" data-del_id = "${
          arr[i].id
        }">remove</a></td></tr>`;
    total += arr[i].price * arr[i].quantity;
  }
  cart += `<tr><td colspan = "6">total amount = ${total}</td></tr></table>`;
  $(".table").html(cart);
}
