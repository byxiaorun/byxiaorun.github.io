let thisSearch = "https://quark.sm.cn/s?q=";
function setSearchIcon(e) {
    let n = "";
    e.iconSvg ? n = '<svg class="icon"><use xlink:href="' + e.iconSvg + '"></use></svg>' : e.iconImg && (n = '<img src="' + e.iconImg + '">'),
    $("#search-icon").html(n)
}
function getHotkeyword(e) {
    $.ajax({
        type: "GET",
        url: "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su",
        data: {
            wd: e
        },
        dataType: "jsonp",
        jsonp: "cb",
        success: function(e) {
            $("#box ul").empty(),
            e.s && e.s.length ? ($("#box").show(),
            e.s.forEach( (e, n) => {
                $("#box ul").append("<li><span>" + (n + 1) + "</span>" + e + "</li>")
            }
            ),
            $("#box ul li").off("click").on("click", function() {
                var e = $(this).text().slice(1);
                $("#txt").val(e),
                window.open(thisSearch + e),
                $("#box").hide()
            }),
            $("#box ul span").each(function(e) {
                0 === e ? $(this).css({
                    color: "#fff",
                    background: "#f54545"
                }) : 1 === e ? $(this).css({
                    color: "#fff",
                    background: "#ff8547"
                }) : 2 === e && $(this).css({
                    color: "#fff",
                    background: "#ffac38"
                })
            })) : $("#box").hide()
        }
    })
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
$(function() {
    setSearchIcon({
        iconSvg: "#icon-kuake",
        url: thisSearch
    });
    var e = localStorage.searchEngine;
    if (e)
        try {
            var n = JSON.parse(e);
            thisSearch = n.url || thisSearch,
            setSearchIcon(n)
        } catch (e) {
            console.log(e)
        }
    $.getJSON("./style/js/engines.json", function(e) {
        e && (populateSearchEngines(".search-engine-list", e.list1 || []),
        populateSearchEngines(".search-engine-list2", e.list2 || []),
        populateSearchEngines(".search-engine-list3", e.list3 || []),
        populateSearchEngines(".search-engine-list4", e.list4 || []),
        populateSearchEngines(".search-engine-list5", e.list5 || []))
    })
}),
$(function() {
    let e = window.localStorage
      , n = "false" !== e.getItem("stopHot")
      , c = -1
      , o = null;
    function t() {
        c = -1,
        $("#box ul li").removeClass("current")
    }
    function i() {
        return $("#txt").val().trim()
    }
    function s(e) {
        $.ajax({
            type: "GET",
            url: "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su",
            data: {
                wd: e
            },
            dataType: "jsonp",
            jsonp: "cb",
            success: function(n) {
                if ($("#box ul").empty(),
                n.s && n.s.length) {
                    $("#box").show();
                    for (let e = 0; e < n.s.length; e++)
                        $("#box ul").append("<li><span>" + (e + 1) + "</span>" + n.s[e] + "</li>"),
                        $("#box ul li").eq(e).off("click").on("click", function() {
                            var e = $(this).text().slice(1);
                            $("#txt").val(e),
                            window.open(thisSearch + e),
                            $("#box").hide(),
                            t()
                        }),
                        0 === e ? $("#box ul span").eq(e).css({
                            color: "#fff",
                            background: "#f54545"
                        }) : 1 === e ? $("#box ul span").eq(e).css({
                            color: "#fff",
                            background: "#ff8547"
                        }) : 2 === e && $("#box ul span").eq(e).css({
                            color: "#fff",
                            background: "#ffac38"
                        })
                } else
                    $("#box").hide()
            }
        })
    }
    $("#txt").on("input", function() {
        var e = i();
        e ? ($("#search-clear").show(),
        n && s(e)) : ($("#search-clear").hide(),
        $("#box").hide(),
        t())
    }),
    $("#txt").on("keydown", function(e) {
        var n, o = e.keyCode || e.which, s = $("#box ul li");
        if (13 === o)
            return e.preventDefault(),
            (n = 0 <= c && s.length ? s.eq(c).text().slice(1) : i()) ? (window.open(thisSearch + n),
            $("#box").hide(),
            t(),
            !1) : void 0;
        38 !== o && 40 !== o || (e.preventDefault(),
        s.length && (c = 40 === o ? (c + 1) % s.length : c <= 0 ? s.length - 1 : c - 1,
        s.removeClass("current"),
        s.eq(c).addClass("current")))
    }),
    $("#search-clear").on("click", function() {
        $("#txt").val(""),
        $(this).hide(),
        $("#box").hide(),
        t()
    }),
    $("#txt").on("focus", function() {
        $(".search-box").css({
            "box-shadow": "0 4px 6px #0000001f",
            border: "1px solid #cecece"
        });
        var e = i();
        e && n && s(e)
    }),
    $("#search-icon, .search-engine").on("mouseenter", function() {
        clearTimeout(o),
        $(".search-engine").show()
    }).on("mouseleave", function() {
        o = setTimeout( () => {
            $(".search-engine").hide()
        }
        , 200)
    }),
    $("#hot-btn").attr("class", "iconfont icon-kaiguanguan-" + (n ? "kai" : "guan")).on("click", function() {
        n = !n,
        e.setItem("stopHot", n ? "true" : "false"),
        $(this).attr("class", "iconfont icon-kaiguanguan-" + (n ? "kai" : "guan")),
        n && i() && s(i()),
        $("#box").hide()
    })
});