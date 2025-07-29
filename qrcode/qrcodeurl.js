var friend = "https://byxiaorun.com/qrcode";
var wechat = "https://payapp.weixin.qq.com/qr/AQE6DUEcUlWkOyHVkNs_eAzD?t=AQAC#wechat_pay";
var myQRCode = document.getElementById("friendcode");
var hideQRCode = document.getElementById("hideimage");
var friendimage = new Image();

// 创建二维码的通用函数
function createQRCode(container, text) {
    var qrcode = new QRCode(container, { width: 300, height: 300 });
    qrcode.makeCode(text);
}

switch (id) {
    case "friend":
        document.getElementById("Toptext").innerHTML += "请使用支付宝，微信或QQ扫码";
        createQRCode(myQRCode, friend); // 创建friend二维码
        break;
    case "wechat":
        document.getElementById("Toptext").innerHTML += "微信请再扫一次";
        createQRCode(hideQRCode, wechat); // 创建wechat二维码

        // 获取canvas元素转成img
        friendimage.src = hideQRCode.firstChild.toDataURL("image/png");
        myQRCode.appendChild(friendimage); // 将图片添加到页面
        break;
    default:
        break;
}