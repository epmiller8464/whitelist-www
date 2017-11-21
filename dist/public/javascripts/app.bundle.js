"use strict";

!function (e) {
  function t(r) {
    if (n[r]) return n[r].exports;var a = n[r] = { i: r, l: !1, exports: {} };return e[r].call(a.exports, a, a.exports, t), a.l = !0, a.exports;
  }var n = {};t.m = e, t.c = n, t.d = function (e, n, r) {
    t.o(e, n) || Object.defineProperty(e, n, { configurable: !1, enumerable: !0, get: r });
  }, t.n = function (e) {
    var n = e && e.__esModule ? function () {
      return e.default;
    } : function () {
      return e;
    };return t.d(n, "a", n), n;
  }, t.o = function (e, t) {
    return Object.prototype.hasOwnProperty.call(e, t);
  }, t.p = "", t(t.s = 0);
}([function (e, t, n) {
  "use strict";
  function r() {
    $("#submit").prop("disabled", !0), $("#submit").addClass("hide"), u.token = null, grecaptcha.reset();
  }function a() {
    r(), $(".has-error").removeClass("has-error"), $("input[name=email]").val(""), $("select[name=purchaseAmount]").prop("selectedIndex", 0), $("input[name=cryptoType]:checked").prop("checked", !1);
  }function o(e, t) {
    for (var n = e, r = $("#whitelist-form").serializeArray(), a = !1, o = {}, s = 0; s < r.length; s++) {
      r[s].value ? "g-recaptcha-response" === r[s].name && (a = r[s].value !== n) : ($("#whitelist-form").addClass("has-error"), a = !0), o[r[s].name] = r[s].value;
    }return a ? t(new Error("validation failed")) : t(null, r);
  }var s = n(1),
      i = n(4),
      u = { token: null },
      l = { geoLocate: function geoLocate(e) {
      s.v4().then(function (t) {
        return e(null, t);
      }).catch(function (t) {
        return e(t, null);
      });
    }, validateForm: function validateForm() {
      $(".has-error").removeClass("has-error");var e = $("input[name=email]").val(),
          t = $("select[name=purchaseAmount]").val(),
          n = $("input[name=cryptoType]:checked").val(),
          r = new RegExp(/.+\@.+\..+/),
          a = !0;return e = e && e.length > 0 ? e.trim() : null, n = n && n.length > 0 ? n.trim() : null, e && r.test(e) || ($("input[name=email]").parent(".form-group").addClass("has-error"), a = !1), n || ($("input[name=cryptoType]").parents(".form-group").addClass("has-error"), a = !1), "null" === t && ($("select[name=purchaseAmount]").parent(".form-group").addClass("has-error"), a = !1), a;
    }, submit: function submit() {
      if (!l.validateForm() || !u.token) return r(), !1;try {
        o(u.token, function (e, t) {
          if (e) return u.token = null, r(), !1;$("body").addClass("loading"), $.ajax({ method: "POST", url: "/whitelist", data: t }).done(function (e) {
            var t = { css: "alert-success", targetId: "alert", message: "Congrats you have been added to the Swytch Pre-Sale Whitelist." };e.error && (t.message = "alert-danger", t.message = e.error), i(t);
          }).fail(function (e) {
            console.error("Submission error"), i({ css: "alert-danger", targetId: "alert", message: "Opps, something went wrong and we are working to resolve the issue" });
          }).always(function () {
            $("body").removeClass("loading"), a();
          });
        });
      } catch (e) {
        return console.error("Unhandled Exception"), i({}), !1;
      }return !1;
    }, recaptchaCallback: function recaptchaCallback(e) {
      if (!l.validateForm()) return void r();u.token = e, $("#submit").prop("disabled", !1), $("#submit").removeClass("hide");
    }, Alert: i };window.App = window.App || l, e.exports = l;
}, function (e, t, n) {
  "use strict";
  function r(e, t) {
    return new Promise(function (n, r) {
      var o = function o() {
        return r(new Error("Couldn't find your IP"));
      },
          i = new XMLHttpRequest();i.onerror = o, i.ontimeout = o, i.onload = function () {
        var t = i.responseText.trim();t && a[e](t) || o(), n(t);
      }, i.open("GET", s[e]), i.timeout = t.timeout, i.send();
    });
  }var a = n(2),
      o = { timeout: 5e3 },
      s = { v4: "https://ipv4.icanhazip.com/", v6: "https://ipv6.icanhazip.com/" };e.exports.v4 = function (e) {
    return e = Object.assign({}, o, e), r("v4", e);
  }, e.exports.v6 = function (e) {
    return e = Object.assign({}, o, e), r("v6", e);
  };
}, function (e, t, n) {
  "use strict";
  var r = n(3),
      a = e.exports = function (e) {
    return r({ exact: !0 }).test(e);
  };a.v4 = function (e) {
    return r.v4({ exact: !0 }).test(e);
  }, a.v6 = function (e) {
    return r.v6({ exact: !0 }).test(e);
  };
}, function (e, t, n) {
  "use strict";
  var r = "(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])(?:\\.(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])){3}",
      a = "[0-9a-fA-F]{1,4}",
      o = ("\n(\n(?:" + a + ":){7}(?:" + a + "|:)|                                // 1:2:3:4:5:6:7::  1:2:3:4:5:6:7:8\n(?:" + a + ":){6}(?:" + r + "|:" + a + "|:)|                         // 1:2:3:4:5:6::    1:2:3:4:5:6::8   1:2:3:4:5:6::8  1:2:3:4:5:6::1.2.3.4\n(?:" + a + ":){5}(?::" + r + "|(:" + a + "){1,2}|:)|                 // 1:2:3:4:5::      1:2:3:4:5::7:8   1:2:3:4:5::8    1:2:3:4:5::7:1.2.3.4\n(?:" + a + ":){4}(?:(:" + a + "){0,1}:" + r + "|(:" + a + "){1,3}|:)| // 1:2:3:4::        1:2:3:4::6:7:8   1:2:3:4::8      1:2:3:4::6:7:1.2.3.4\n(?:" + a + ":){3}(?:(:" + a + "){0,2}:" + r + "|(:" + a + "){1,4}|:)| // 1:2:3::          1:2:3::5:6:7:8   1:2:3::8        1:2:3::5:6:7:1.2.3.4\n(?:" + a + ":){2}(?:(:" + a + "){0,3}:" + r + "|(:" + a + "){1,5}|:)| // 1:2::            1:2::4:5:6:7:8   1:2::8          1:2::4:5:6:7:1.2.3.4\n(?:" + a + ":){1}(?:(:" + a + "){0,4}:" + r + "|(:" + a + "){1,6}|:)| // 1::              1::3:4:5:6:7:8   1::8            1::3:4:5:6:7:1.2.3.4\n(?::((?::" + a + "){0,5}:" + r + "|(?::" + a + "){1,7}|:))           // ::2:3:4:5:6:7:8  ::2:3:4:5:6:7:8  ::8             ::1.2.3.4\n)(%[0-9a-zA-Z]{1,})?                                           // %eth0            %1\n").replace(/\s*\/\/.*$/gm, "").replace(/\n/g, "").trim(),
      s = e.exports = function (e) {
    return e && e.exact ? new RegExp("(?:^" + r + "$)|(?:^" + o + "$)") : new RegExp("(?:" + r + ")|(?:" + o + ")", "g");
  };s.v4 = function (e) {
    return e && e.exact ? new RegExp("^" + r + "$") : new RegExp(r, "g");
  }, s.v6 = function (e) {
    return e && e.exact ? new RegExp("^" + o + "$") : new RegExp(o, "g");
  };
}, function (e, t, n) {
  "use strict";
  function r(e) {
    var t = this;t.top = e.top || "200px", t.right = e.right || "100px", t.css = e.css || "alert-success", t.fadeTimeout = e.fadeTimeout || 2e4, t.message = e.message, t.targetId = e.targetId || "alert", t.inject = e.inject || "", t._buildAlert = function () {
      var e = this;return '<div id="' + e.targetId + '" class="alert alert-dismissible fade in ' + e.css + '" role="alert"style="position:fixed;top:' + e.top + ";right:" + e.right + ';z-index:10000;min-width:200px;"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><label>' + e.message + "</label><br/>" + e.inject + "</div>";
    };
  }function a(e) {
    new r(e).alert();
  }r.prototype.alert = function () {
    var e = this,
        t = e._buildAlert();$("body").append(t), setTimeout(function () {
      $("#" + e.targetId).alert("close");
    }, e.fadeTimeout);
  }, e.exports = a;
}]);
//# sourceMappingURL=app.bundle.js.map