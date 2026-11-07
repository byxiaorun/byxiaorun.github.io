const fetch_timeout = 3500;
const fallback_yiyan = "天行健，君子以自强不息。---『周易』";
document.title ="小润搜索主页 - 极简多引擎首页"
const controller = new AbortController();
const signal = controller.signal;

Promise.race([
    fetch('https://v1.hitokoto.cn?c=d&c=h&c=d&c=i&c=j&c=k', { signal }),
    new Promise((_, reject) => {
        setTimeout(() => {
            controller.abort();
            reject(new Error("timeout"));
        }, fetch_timeout);
    })
])
.then(function (res) {
    if (!res.ok) throw new Error("http fail");
    return res.json();
})
.then(function (data) {
    var hitokoto = document.getElementById('yiyan')
    if (hitokoto) {
        hitokoto.innerText = data.hitokoto + "---『"+data.from+ "』";
    }
})
.catch(function (err) {
    console.error(err);
    const hitokoto = document.getElementById('yiyan');
    if (hitokoto) {
        hitokoto.innerText = fallback_yiyan;
    }
});
