//判断注册能不能被提交，给表单加一个onclick事件返回为ture提交;false不提交;
function mcRegisterJudge(){
  var passinput = $("#passinput").val()
  var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
  if(passinput.length<6){
    mcAlert("密码必须至少有6个字符");
    return false;
  }else if(!reg.test(passinput)){
    mcAlert("密码必须包括数字和字母，长度至少6个字符，最多16个字符");
    return false;
  }else if($("#passinputs").val()!==$("#passinput").val()){
    mcAlert("密码不一致");
    return false;
  }else{
    return true;
  }
}

// 倒计时
function mcCountDowns(){
  $(".cardOne").each(function(){
    var starttime = $(this).find(".lcountDown").text();
    var that = this;
    countTime = setInterval(function() {
      starttime = --starttime < 0 ? 0 : starttime;
      var hour = Math.floor(starttime/60/60%24).toString();
      var minute = Math.floor((starttime-hour*60*60)/60%60).toString();
      var second = Math.floor((starttime-hour*60*60-minute*60)%60).toString();
      if(hour.length === 1){
        hour = "0" + hour
      }
      if(minute.length === 1){
        minute = "0" + minute
      }
      if(second.length === 1){
        second = "0" + second
      }
      $(that).find(".hour").html(hour)
      $(that).find(".minute").text(minute)
      $(that).find(".second").text(second)
    }, 1000);
  });
};

//页面选项卡
function mcCutPage(){
  var nav_lis = $(".home_nav>li")
  nav_lis.click(function(){
    $(this).addClass("active").siblings().removeClass("active");
  })
}

//弹出提示框
function mcAlert(text){
  let html = 
  `<div class="alertContainer" style="z-index:9999;position:fixed;top:0;width:100%;height:100%;background:rgba(0,0,0,0.5)">
    <div class="alertBox" style="width:270px;height:150px;background:#ffffff;position: absolute;top:50%;left:50%;transform:translate3d(-50%,-50%,0);border-radius:5px;">
      <p class="alertText" style="height:73%;display:flex;justify-content: center;align-items: center;color:#333333;font-size:16px;padding:0 15px;text-align: center;line-height:21px;">${text}</p>
      <button class="alertBtn" style="height:27%;width:100%;border:0;background:#ffffff;border-top:1px solid #eeeeee;border-bottom-right-radius: 5px;border-bottom-left-radius: 5px;color:#0050ef;font-size:14px;outline: none;cursor: pointer;">关闭</button>
    </div>
  </div>`;
  $("body").append(html);
  $(".alertBtn").click(function(){
    $(".alertContainer").fadeOut("50",function(){$(".alertContainer").remove()});
  });
}

// 文本复制函数(兼容ios和android)
function mcCopyText(clickBtn){
  function copyText() {
    if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {//区分iPhone设备
      window.getSelection().removeAllRanges();//这段代码必须放在前面否则无效
      var Url2 = document.getElementById("inputText2");//要复制文字的节点
      var range = document.createRange();
      // 选中需要复制的节点
      range.selectNode(Url2);
      // 执行选中元素
      window.getSelection().addRange(range);
      // 执行 copy 操作
      var successful = document.execCommand('copy');
  
      // 移除选中的元素
      window.getSelection().removeAllRanges();
      mcAlert("复制成功");
    } else {
      var Url2 = document.getElementById("inputText1");//要复制文字的节点
      Url2.select(); // 选择对象
      document.execCommand("Copy"); // 执行浏览器复制命令
      mcAlert("复制成功");
    }
  }
  // 这里匹配要点击调用的按钮
  // 在按钮下面加入DOM辅助复制
  /* <input readOnly="true" style="outline: none;border: 0px; color: rgba(0,0,0,0.0);position: absolute;left:-200px; background-color: transparent"
    id="inputText1" value="" />
  <div id="inputText2" style="position: absolute;left:-200px; color: rgba(0,0,0,0);background-color: transparent"></div> */
  clickBtn.click(function(){
    $("#inputText1").val($(this).siblings(".on_mleft").text());
    $("#inputText2").text($(this).siblings(".on_mleft").text());
    copyText();
  })
}

//页面锚点的滚动动画
function mcPageAnchorAnimation(){
  var $root = $('html, body');
  $('a').click(function() {
      $root.animate({
          scrollTop: $( $.attr(this, 'href') ).offset().top
      }, 500);
      return false;
  });
}