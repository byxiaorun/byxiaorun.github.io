var friend = "https://byxiaorun.com/friend";
var wechat = "https://u.wechat.com/MNK4rvbZhXFwcjSoGcHlQUU";
var myQRCode = document.getElementById("friendcode");
var hideQRCode = document.getElementById("hideimage");
var friendimage = new Image();

// 创建二维码的通用函数
function createQRCode(container, text, width, height) {
    var qrcode = new QRCode(container, { width: width, height: height });
    qrcode.makeCode(text);
}

function updateTopText(text) {
    document.getElementById("Toptext").innerHTML += text;
}

switch (id) {
    case "friend":
        updateTopText("请使用支付宝，share微博，微信或QQ扫码");
        createQRCode(myQRCode, friend, 300, 300);
        break;
    case "wechat":
        updateTopText("微信请再扫一次");
        createQRCode(hideQRCode, wechat, 350, 350);
        
        // 获取canvas元素转成img并插入
        friendimage.src = hideQRCode.firstChild.toDataURL("image/png");
        myQRCode.appendChild(friendimage);
        break;
    default:
        break;
}