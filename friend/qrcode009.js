var friend="https://byxiaorun.com/friend";
var wechat="https://u.wechat.com/MNK4rvbZhXFwcjSoGcHlQUU";
var myQRCode = document.getElementById("friendcode");
var hideQRCode = document.getElementById("hideimage");
var friendimage = new Image();
					switch(id) {
						case "friend":
							var InsertTop = "请使用支付宝，share微博，微信或QQ扫码";
							document.getElementById("Toptext").innerHTML = document.getElementById("Toptext").innerHTML + InsertTop;
                            var qrcode = new QRCode(document.getElementById("friendcode"), {
						    width: "400",
						    height: "400"
					        });
							qrcode.makeCode(friend);
							break;
						case "wechat":
						    var InsertTop = "微信请再扫一次";
							document.getElementById("Toptext").innerHTML = document.getElementById("Toptext").innerHTML + InsertTop;
								
                      var qrcode = new QRCode(hideQRCode, {
						    width: "450",
						    height: "450"
                            });
							qrcode.makeCode(wechat);
							// 获取canvas元素转成 img 
                          friendimage.src = hideQRCode.firstChild.toDataURL("image/png");    
                          myQRCode.appendChild(friendimage); // 放到页面
							break;
						default:
							break
					}
