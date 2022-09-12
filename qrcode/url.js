if(/AlipayClient/.test(window.navigator.userAgent)) {
				location.href = 'https://qr.alipay.com/tsx06614hcohpjl6qra3c22';
			} else if(/MicroMessenger/.test(window.navigator.userAgent)) {
				id = "wechat"
			}  else {
				id = "friend"
			}