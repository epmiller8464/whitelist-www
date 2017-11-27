'use strict';

function VanishingAlert(options) {
  var self = this;
  self.top = options.top || '200px';
  self.right = options.right || '100px';
  self.css = options.css || 'alert-success';
  self.fadeTimeout = options.fadeTimeout || 20000;
  self.message = options.message;
  self.targetId = options.targetId || 'alert';
  self.inject = options.inject || '';
  self._buildAlert = function () {
    var self = this;
    var alert = '<div id="' + self.targetId + '" class="alert alert-dismissible fade in ' + self.css + '" role="alert">' +
    // 'style="position:fixed;top:' + self.top + ';right:' + self.right + ';z-index:10000;min-width:200px;">' +
    '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' + '<span aria-hidden="true">&times;</span>' + '</button>' + '<label>' + self.message + '</label><br/>' + self.inject + '</div>';
    return alert;
  };
}

VanishingAlert.prototype.alert = function () {
  var self = this;
  var alert = self._buildAlert();
  $(self.targetId).append(alert);
  $(self.targetId).removeClass('invisible');
  setTimeout(function () {
    $('#' + self.targetId).alert('close');
    $(self.targetId).addClass('invisible');
  }, self.fadeTimeout);
};

function va(options) {
  var v = new VanishingAlert(options);
  v.alert();
}

module.exports = va;
//# sourceMappingURL=vanishingAlert.js.map