// 1.先把数据通过json转化为字符串存储到localstorage
// 2.通过json把localstorage的数据转化为对象，就可以用h5来获取
// 3.访问localstroge中的数据的时候需要先把数据转化为js对象，然后获取到数组，对数组进行读取


$(document).ready(function () {
  initialize();
  //数据的初始化
  function initialize() {
    let allobj = localStorage.getItem("items");
    if (allobj != null) {          //如果localstroge中存在数据
      let objnum = JSON.parse(allobj).things;
      // 把数据转化为js对象
      for (let i = 0; i < objnum.length; i++) {
        let itemname = objnum[i].itemname;
        let nowprice = objnum[i].nowprice;
        let preprice = objnum[i].preprice;
        let itemfile = objnum[i].inputfile;
        $("#dj_good_ul").append('<li><a href="#" class="good-link"> <img  width="280" height="268"> <div class="good-info" > <p class="gppd-name">' + itemname + '</p> <br> <div class="good-pri"> <span class="jd-money">' + nowprice + '</span> <span class="old-pri">￥' + preprice + '</span> </div> </div> </a>  <button type="button" class="delect  btn-danger">删除</button>  </li>');
        let img = $(".good-link").children("img")[i];
        img.src = "images/" + itemfile;
      }
    }
  }


  //当点击增加宝贝的提交后
  $(".btn-primary-add").click(function () {
    // 获取input中的数据
    let itemname = $("#itemname").val();
    let nowprice = $("#nowprice").val();
    let preprice = $("#preprice").val();
    let kind = $(".form-control").val();
    let files = document.getElementById("inputfile1").files;
    if (files.length == 0) {
      alert("请插入图片")
    } else {
      let itemfile = files[0].name;   //获取input标签中的图片路径的名字
      // 判断input中数据是否为空
      if (itemname == "" || nowprice == "" || preprice == "") {
        alert("信息栏不可以为空！");
      } else {
        //r如果输入框不为空，就增加信息
        // 增加的数据对象
        let obj = { "itemname": itemname, "nowprice": nowprice, "preprice": preprice, "inputfile": itemfile, "kind": kind };
        // 获取数据库中的信息
        let objarr = localStorage.getItem("items");
        //  如果数据不为空，把原来的数据转化为对象，把新的obj加进去
        if (objarr != null) {
          let old = localStorage.getItem("items");   //获得旧的所有数据
          let d = JSON.parse(old);                   //把它们转化为对象
          d.things.push(obj);                        //在这里面加入新的obj
          localStorage.setItem("items", JSON.stringify(d)); //以字符串形式存入localstorage

        } else {      //如果数据库中为空
          let arr = {     //新建一个对象数组
            things: []
          }
          arr.things.push(obj);     //加入要添加的内容obj
          localStorage.setItem("items", JSON.stringify(arr));
        }
        //在ul中加入一个li
        $("#dj_good_ul").append('<li><a href="#" class="good-link"> <img  width="280" height="268"> <div class="good-info" > <p class="gppd-name">' + itemname + '</p> <br> <div class="good-pri"> <span class="jd-money">' + nowprice + '</span> <span class="old-pri">￥' + preprice + '</span> </div> </div> </a>   <button type="button" class="delect  btn-danger">删除</button>  </li>');
        // 获取要添加图片的img标签
        let img = $(".good-link").children("img").last();
        img.src = "images/" + itemfile;
        // 给img增加属性
        img.attr('src', img.src);
        // 清空input
        $("input").val("");
        //隐藏模态框
        $('#myModal1').modal('hide');
      }
    }
  });


  // 删除宝贝
  /**
   * 点击删除按钮，获取点击的是哪一个按钮
   * 执行getA函数
   */
  $("#dj_good_ul").delegate(".delect", "click", function () {
    let number = $(".delect").index(this);
    getA(number);
  })
  /**
   * 移除当前的删除按钮所对应的父元素
   * 然后将localstroge中所对应的数据删除
   */
  function getA(number) {
    let d = document.getElementsByClassName("delect");
    let li = d[number].parentNode;
    li.remove();
    let bbname = li.childNodes[0].childNodes[3].childNodes[1].innerHTML;
    let arrobj1 = JSON.parse(localStorage.getItem("items"));
    let arrthings = arrobj1.things;
    for (let j = 0; j < arrthings.length; j++) {
      if (bbname == arrthings[j].itemname) {
        arrthings.splice(j, 1);
        localStorage.setItem("items", JSON.stringify(arrobj1));
      }
    }
  }


  //修改宝贝
  $(".btn-group").delegate(".btn-change", "click", function () {
    $(".btn-search").click(function () {
      let allobj = localStorage.getItem("items");
      let objnum = JSON.parse(allobj).things;
      let searchname = $("#search_itemname").val();
      for (let i = 0; i < objnum.length; i++) {
        let localname = objnum[i].itemname;
        if (localname == searchname) {
          $(".shopname").val(localname);
          $(".changenprice").val(objnum[i].nowprice)
          $(".changepprice").val(objnum[i].preprice)
          $(".btn-primary-change").click(function () {
            if (itemname == "" || nowprice == "" || preprice == "") {
              alert("信息栏不能为空！")
            } else {

              let itemname = $(".shopname").val();
              let arrobj1 = JSON.parse(localStorage.getItem("items"));
              let arrthings = arrobj1.things;
            
              let nowprice = $(".changenprice").val();
              let preprice = $(".changepprice").val();
              let files = document.getElementById("inputfile").files;
              let itemfile = files[0].name;
              let kind = $(".form-control").val();
              for (let j = 0; j < arrthings.length; j++) {
                if (itemname == arrthings[j].itemname) {
                  alert("此宝贝已存在！");
                
                }
              }
              let obj = { "itemname": itemname, "nowprice": nowprice, "preprice": preprice, "inputfile": itemfile, "kind": kind };
              let old = localStorage.getItem("items");   //获得旧的所有数据
              let d = JSON.parse(old);                   //把它们转化为对象
              d.things.push(obj);                        //在这里面加入新的obj
              localStorage.setItem("items", JSON.stringify(d)); //以字符串形式存入localstorage

              delectLi(searchname);
              // 获取要添加图片的img标签
              let img = $(".good-link").children("img").last();
              img.src = "images/" + itemfile;
              // 给img增加属性
              img.attr('src', img.src);
              initialize();

              // 清空input
              $("input").val("");
              //隐藏模态框
              $('#myModal2').modal('hide');
            }

          })

        }
      }
    })
  });
  // 获得修改前的宝贝的li并把它删除
  function delectLi(itemname) {
    let length = $(".gppd-name").length;
    for (let i = 0; i < length; i++) {
      let n=document.getElementsByClassName("gppd-name")[i];
      let name1 =n.innerHTML;
      console.log(name1);
      if (itemname == name1) {
        let li = n.parentNode.parentNode.parentNode;
        li.remove();
        let arrobj1 = JSON.parse(localStorage.getItem("items"));
        let arrthings = arrobj1.things;
        for (let j = 0; j < arrthings.length; j++) {
          if (name1 == arrthings[j].itemname) {
            console.log(li)
            arrthings.splice(j, 1);
            localStorage.setItem("items", JSON.stringify(arrobj1));
          }
        }
        return
      }
    }
  }


  // 查询宝贝
  $(".all").click(function () {
    $("#option2").css("color","black");
    $("#option1").css("color","black");
    $(".all").css("color","blue");
    $("li").remove();
    initialize();
  })
  $("#option1").click(function () {
    $("#option2").css("color","black");
    $(".all").css("color","black");
    $("#option1").css("color","blue");
    let allobj = localStorage.getItem("items");
    let objnum = JSON.parse(allobj).things;
    $("li").remove();
    for (let i = 0; i < objnum.length; i++) {
      let kind = objnum[i].kind;
      if (kind == "数码3C") {
        console.log(kind)
        let itemname = objnum[i].itemname;
        let nowprice = objnum[i].nowprice;
        let preprice = objnum[i].preprice;
        let itemfile = objnum[i].inputfile;
        $("#dj_good_ul").append('<li><a href="#" class="good-link"> <img  width="280" height="268"> <div class="good-info" > <p class="gppd-name">' + itemname + '</p> <br> <div class="good-pri"> <span class="jd-money">' + nowprice + '</span> <span class="old-pri">￥' + preprice + '</span> </div> </div> </a>  <button type="button" class="delect  btn-danger">删除</button>  </li>');
        let img = $(".good-link").children("img")[i];
        img.src = "images/" + itemfile;

      }
    }
  })
  $("#option2").click(function () {
    $("#option1").css("color","black");
    $(".all").css("color","black");
    $("#option2").css("color","blue");

    let allobj = localStorage.getItem("items");
    let objnum = JSON.parse(allobj).things;
    for (let i = 0; i < objnum.length; i++) {
      let kind = objnum[i].kind;
      $("li").remove();
      if (kind == "服饰配饰") {
        let itemname = objnum[i].itemname;
        let nowprice = objnum[i].nowprice;
        let preprice = objnum[i].preprice;
        let itemfile = objnum[i].inputfile;
        $("#dj_good_ul").append('<li><a href="#" class="good-link"> <img  width="280" height="268"> <div class="good-info" > <p class="gppd-name">' + itemname + '</p> <br> <div class="good-pri"> <span class="jd-money">' + nowprice + '</span> <span class="old-pri">￥' + preprice + '</span> </div> </div> </a>  <button type="button" class="delect  btn-danger">删除</button>  </li>');
        let img = $(".good-link").children("img")[i - 1];
        img.src = "images/" + itemfile;

      }
    }
  })


});