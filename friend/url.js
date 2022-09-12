if(/AlipayClient/.test(window.navigator.userAgent)) {
				location.href = 'https://qr.alipay.com/a6x06021yxc7vsvahifz16d';
			} else if(/MicroMessenger/.test(window.navigator.userAgent)) {
				id = "wechat"
			} else if(/QQ/.test(window.navigator.userAgent)) {
				location.href = 'https://jq.qq.com/?_wv=1027&k=5URMprg';
			} else if(/Weibo/.test(window.navigator.userAgent)) {
				location.href = 'https://m.weibo.cn/u/5115731690';
			} else {
				id = "friend"
			}