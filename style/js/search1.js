let thisSearch = "https://quark.sm.cn/s?q=";
var keyword_var = "{keyword}";
function buildSearchUrl(word) {
  var parts = thisSearch.split(keyword_var);
  return parts.length > 1 ? parts.join(word) : thisSearch + word;
}
/* 图标兜底：图标加载失败显示首字+底色；iconSvg为#icon-xxx不参与配色，iconImg为图片链接或#色值（文字图标底色），无配置按名称生成固定底色，文字自动黑白适配WCAG对比度，iconText可选自定义显示文字 */
var HEX_COLOR = /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;

function escapeHtml(s) {
    return String(s == null ? "" : s)
        .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
function hashString(s) {
    var h = 0, i;
    s = String(s || "");
    for (i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0;
    return h < 0 ? -h : h;
}
function hue2rgb(p, q, t) {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
}
function hslToRgb(h, s, l) {
    var r, g, b, q, p;
    h /= 360; s /= 100; l /= 100;
    if (s === 0) { r = g = b = l; }
    else {
        q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }
    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}
function hexToRgb(hex) {
    var s = hex.slice(1), c;
    if (s.length === 3) {
        c = s.charAt(0); s = c + c + s.charAt(1) + s.charAt(1) + s.charAt(2) + s.charAt(2);
    }
    return [parseInt(s.slice(0, 2), 16), parseInt(s.slice(2, 4), 16), parseInt(s.slice(4, 6), 16)];
}
function rgbToHex(rgb) {
    var out = "#", i, v;
    for (i = 0; i < 3; i++) {
        v = Math.max(0, Math.min(255, rgb[i])).toString(16);
        out += v.length < 2 ? "0" + v : v;
    }
    return out.toUpperCase();
}
function textColorFor(rgb) {
    var i, c, a = [], L;
    for (i = 0; i < 3; i++) {
        c = rgb[i] / 255;
        a[i] = c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    }
    L = 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
    // 与黑字、白字的对比度取大者
    return (L + 0.05) / 0.05 > 1.05 / (L + 0.05) ? "#1A1A1A" : "#FFFFFF";
}
function engineBg(e) {
    var custom = "", rgb, h, hue, sat, light;
    if (e.iconBg && HEX_COLOR.test(e.iconBg)) custom = e.iconBg;
    else if (e.iconImg && HEX_COLOR.test(e.iconImg)) custom = e.iconImg;
    else if (e.iconSvg && HEX_COLOR.test(e.iconSvg)) custom = e.iconSvg;
    if (custom) return { css: custom, rgb: hexToRgb(custom) };
    // 名称+地址做哈希：不同引擎颜色不同，同一引擎每次刷新保持一致
    h = hashString(String(e.name || "") + "|" + String(e.url || ""));
    hue = h % 360;
    sat = 58 + h % 13;
    light = 36 + (h >> 8) % 18;
    rgb = hslToRgb(hue, sat, light);
    return { css: rgbToHex(rgb), rgb: rgb };
}
function iconTextOf(e) {
    var t, first;
    t = e.iconText != null && e.iconText !== "" ? String(e.iconText) : String(e.name || "");
    t = t.replace(/^\s+|\s+$/g, "");
    if (!t) return "?";
    first = t.charAt(0);
    return /[a-z]/i.test(first) ? first.toUpperCase() : first;
}
function buildTextIcon(e) {
    var bg = engineBg(e);
    return '<i class="engine-text-icon" style="background:' + bg.css +
        ';color:' + textColorFor(bg.rgb) + '">' + escapeHtml(iconTextOf(e)) + "</i>";
}
function symbolExists(ref) {
    var id = String(ref || "");
    id = id.charAt(0) === "#" ? id.slice(1) : "";
    return !id || !!document.getElementById(id);
}
function buildEngineIcon(e, forceText) {
    e = e || {};
    if (!forceText) {
        // 图标库 symbol 不存在（CDN 失败 / 导入的 id 写错）时直接走文字图标
        if (e.iconSvg && !HEX_COLOR.test(e.iconSvg) && symbolExists(e.iconSvg))
            return '<svg class="icon"><use xlink:href="' + escapeHtml(e.iconSvg) + '"></use></svg>';
        if (e.iconImg && !HEX_COLOR.test(e.iconImg))
            return '<img src="' + escapeHtml(e.iconImg) + '" alt="">';
    }
    return buildTextIcon(e);
}
// 图片 404 / 图标库 symbol 后来消失时，换成文字图标
function applyIconFallback($icon, e) {
    var tag, id, ref, done = false;
    if (!$icon || !$icon.length) return;
    tag = ($icon[0].tagName || "").toLowerCase();
    function swap() {
        if (done) return;
        done = true;
        $icon.replaceWith(buildTextIcon(e));
    }
    if (tag === "img") {
        $icon.on("error", swap);
        try { if ($icon[0].complete && !$icon[0].naturalWidth) swap(); } catch (err) {}
    } else if (tag === "svg") {
        ref = String(e.iconSvg || "");
        id = ref.charAt(0) === "#" ? ref.slice(1) : "";
        if (id) {
            var check = function () { if (!document.getElementById(id)) swap(); };
            window.setTimeout(check, 0);
            window.setTimeout(check, 1200);
        }
    }
}
function setSearchIcon(e) {
    var $box = $("#search-icon");
    $box.html(buildEngineIcon(e));
    applyIconFallback($box.find("img, svg").first(), e);
}
function populateSearchEngines(o, n) {
    n.forEach(function(n) {
        if (n.hidden)
            $(o).append('<li style="opacity:0;pointer-events:auto;"><span>' + (n.name || "") + "</span></li>");
        else
            $(o).append("<li>" + buildEngineIcon(n) + "<span>" + n.name + "</span></li>")
    }),
    $(o).children("li").each(function (idx) {
        var eng = n[idx];
        if (eng && !eng.hidden) applyIconFallback($(this).find("img, svg").first(), eng);
    }),
    $(o).off("click").on("click", "li", function() {
        var e = $(this).index()
          , e = n[e];
        e && e.url && (thisSearch = e.url,
        setSearchIcon(e),
        $(".search-engine").hide(),
        localStorage.searchEngine = JSON.stringify(e))
    })
}
$(function () {
  function isIE11() {
    return !!window.ActiveXObject || "ActiveXObject" in window;
  }
  var initCfg;
  if (isIE11()) {
    initCfg = {
      name: "夸克",
      iconImg: "https://sm01.alicdn.com/L1/272/1990/favicon/favi.ico",
      url: thisSearch,
    };
  } else {
    initCfg = {
      name: "夸克",
      iconSvg: "#icon-kuake",
      url: thisSearch,
    };
  }
  setSearchIcon(initCfg);

  var e = localStorage.searchEngine;
  if (e) {
    try {
      var n = JSON.parse(e);
      thisSearch = n.url || thisSearch;
      setSearchIcon(n);
    } catch (err) {
      console.log(err);
    }
  }

  var jsonUrl = isIE11()
    ? "./style/js/engines-ie.json"
    : "./style/js/engines.json";
  // 自定义引擎列表：导入的 JSON 存 localStorage，刷新后仍然生效
  var ENGINES_STORE = "customEngines";
  var engineLists = [".search-engine-list", ".search-engine-list2", ".search-engine-list3", ".search-engine-list4", ".search-engine-list5"];
  var engineKeys = ["list1", "list2", "list3", "list4", "list5"];
  var DEFAULT_TABS = ["搜索", "社区", "论坛", "生活", "影视"];
    // 渲染左侧分类名称：最多 5 个，超出忽略；不足用默认名称补齐。
  function renderTabs(res) {
    var custom = (res && Object.prototype.toString.call(res.tabs) === "[object Array]") ? res.tabs : [];
    var lis = $(".search-engine-tab li");
    for (var i = 0; i < lis.length && i < 5; i++) {
      var name = (i < custom.length && custom[i] != null && custom[i] !== "") ? custom[i] : DEFAULT_TABS[i];
      $(lis[i]).text(name);
    }
  }

  function renderEngines(res) {
    if (!res) return;
    for (var i = 0; i < engineLists.length; i++) {
      $(engineLists[i]).empty();
      populateSearchEngines(engineLists[i], res[engineKeys[i]] || []);
    }
    renderTabs(res);
  }

  function loadDefaultEngines() {
    $.getJSON(jsonUrl, function (res) {
      renderEngines(res);
    });
  }

  function loadEngines() {
    var custom = null;
    try {
      custom = JSON.parse(localStorage.getItem(ENGINES_STORE) || "null");
    } catch (err) {}
    if (custom) renderEngines(custom);
    else loadDefaultEngines();
  }

  loadEngines();

  // 导入 JSON：读本地文件 → 校验 → 持久化 → 立即重绘
  $("#import-json-file").on("change", function () {
    var input = this;
    var file = input.files && input.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function () {
      var data;
      try {
        data = JSON.parse(reader.result);
      } catch (err) {
        alert("导入失败：文件不是有效的 JSON");
        return;
      }
      var valid = false;
      if (data && typeof data === "object") {
        for (var i = 0; i < engineKeys.length; i++) {
          if (Object.prototype.toString.call(data[engineKeys[i]]) === "[object Array]") {
            valid = true;
            break;
          }
        }
      }
      if (!valid) {
        alert("导入失败：需要包含 list1~list5 的引擎配置（与 engines.json 相同格式）");
        return;
      }
      try {
        localStorage.setItem(ENGINES_STORE, JSON.stringify(data));
      } catch (err2) {
        alert("导入失败：本地存储不可用或空间不足");
        return;
      }
      renderEngines(data);
      try { input.value = ""; } catch (err3) {}
      alert("导入成功：已保存到本地，刷新后仍然生效");
    };
    reader.onerror = function () {
      alert("导入失败：无法读取文件");
    };
    reader.readAsText(file, "utf-8");
  });

  // 恢复默认：清除自定义配置，重新读取默认 engines.json
  $("#import-json-reset").on("click", function () {
    try { localStorage.removeItem(ENGINES_STORE); } catch (err) {}
    loadDefaultEngines();
    alert("已恢复默认引擎列表");
  });
});

$(function () {
  let e = window.localStorage,
    n = "false" !== e.getItem("stopHot"),
    c = -1,
    o = null;

  function t() {
    ((c = -1), $("#box ul li").removeClass("current"));
  }

  function i() {
    return $("#txt").val().trim();
  }

  function s(e) {
    var wd = e;
    $.ajax({
      type: "GET",
      url: "https://suggestion.baidu.com/su",
      data: {
        wd: e,
      },
      dataType: "jsonp",
      jsonp: "cb",
      success: function (n) {
        if (!i()) {
          $("#box").hide();
          t();
          return;
        }
        if (wd !== i()) return;
        if (($("#box ul").empty(), n.s && n.s.length)) {
          $("#box").show();
          for (let e = 0; e < n.s.length; e++)
            ($("#box ul").append(
              "<li><span>" + (e + 1) + "</span>" + n.s[e] + "</li>"
            ),
              $("#box ul li")
                .eq(e)
                .off("click")
                .on("click", function () {
                  var e = $(this).text().slice(1);
                  ($("#txt").val(e),
                    window.open(buildSearchUrl(e)),
                    $("#box").hide(),
                    t());
                }),
              0 === e
                ? $("#box ul span").eq(e).css({
                    color: "#fff",
                    background: "#f54545",
                  })
                : 1 === e
                  ? $("#box ul span").eq(e).css({
                      color: "#fff",
                      background: "#ff8547",
                    })
                  : 2 === e &&
                    $("#box ul span").eq(e).css({
                      color: "#fff",
                      background: "#ffac38",
                    }));
        } else $("#box").hide();
      },
    });
  }
  ($("#txt").on("input", function () {
    var e = i();
    e
      ? ($("#search-clear").show(), n && s(e))
      : ($("#search-clear").hide(), $("#box").hide(), t());
  }),
    $("#txt").on("keydown", function (e) {
      var n,
        o = e.keyCode || e.which,
        s = $("#box ul li");
      if (13 === o)
        return (
          e.preventDefault(),
          (n = 0 <= c && s.length ? s.eq(c).text().slice(1) : i())
            ? (window.open(buildSearchUrl(n)), $("#box").hide(), t(), !1)
            : void 0
        );
      (38 !== o && 40 !== o) ||
        (e.preventDefault(),
        s.length &&
          ((c = 40 === o ? (c + 1) % s.length : c <= 0 ? s.length - 1 : c - 1),
          s.removeClass("current"),
          s.eq(c).addClass("current")));
    }),
    $("#search-clear").on("click", function () {
      ($("#txt").val(""), $(this).hide(), $("#box").hide(), t());
    }),
    $("#txt").on("focus", function () {
      $(".search-box").css({
        "box-shadow": "0 4px 6px #0000001f",
        border: "1px solid #cecece",
      });
      var e = i();
      e && n && s(e);
    }),
    $("#search-icon, .search-engine")
      .on("mouseenter", function () {
        clearTimeout(o);
        $(".search-engine").show();
      })
      .on("mouseleave", function () {
        o = setTimeout(function () {
          $(".search-engine").hide();
        }, 200);
      }));

  $("#hot-btn")
    .attr("class", "iconfont icon-kaiguanguan-" + (n ? "kai" : "guan"))
    .on("click", function () {
      ((n = !n),
        e.setItem("stopHot", n ? "true" : "false"),
        $(this).attr(
          "class",
          "iconfont icon-kaiguanguan-" + (n ? "kai" : "guan")
        ),
        n && i() && s(i()),
        $("#box").hide());
    });
});