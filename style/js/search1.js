let thisSearch = "https://quark.sm.cn/s?q=";
var keyword_var = "{keyword}";
function buildSearchUrl(word) {
  var parts = thisSearch.split(keyword_var);
  return parts.length > 1 ? parts.join(word) : thisSearch + word;
}
function setSearchIcon(e) {
    let n = "";
    e.iconSvg ? n = '<svg class="icon"><use xlink:href="' + e.iconSvg + '"></use></svg>' : e.iconImg && (n = '<img src="' + e.iconImg + '">'),
    $("#search-icon").html(n)
}
function populateSearchEngines(o, n) {
    n.forEach(function(n) {
        if (n.hidden)
            $(o).append('<li style="opacity:0;pointer-events:auto;"><span>' + (n.name || "") + "</span></li>");
        else {
            let e = "";
            n.iconSvg ? e = '<svg class="icon"><use xlink:href="' + n.iconSvg + '"></use></svg>' : n.iconImg && (e = '<img src="' + n.iconImg + '">'),
            $(o).append("<li>" + e + "<span>" + n.name + "</span></li>")
        }
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
      iconImg: "https://sm01.alicdn.com/L1/272/1990/favicon/favi.ico",
      url: thisSearch,
    };
  } else {
    initCfg = {
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
  $.getJSON(jsonUrl, function (res) {
    if (res) {
      populateSearchEngines(".search-engine-list", res.list1 || []);
      populateSearchEngines(".search-engine-list2", res.list2 || []);
      populateSearchEngines(".search-engine-list3", res.list3 || []);
      populateSearchEngines(".search-engine-list4", res.list4 || []);
      populateSearchEngines(".search-engine-list5", res.list5 || []);
    }
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