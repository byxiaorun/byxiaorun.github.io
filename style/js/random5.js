  fetch('https://v1.hitokoto.cn?c=d&c=h&c=d&c=i&c=j&c=k')
    .then(function (res){
      return res.json();
    })
    .then(function (data) {
      var hitokoto = document.getElementById('yiyan');
      document.title ="小润搜索主页 - 极简多引擎首页"
      hitokoto.innerText = data.hitokoto + "---『"+data.from+ "』"; 
    })
    .catch(function (err) {
      console.error(err);
 })