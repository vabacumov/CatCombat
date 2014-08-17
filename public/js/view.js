var View = function() {
  this.newUserDisplay = function(data) {
    $('#authentication').html(data.html);
  },
  this.signInDisplay = function(data) {
    $('#authentication').html(data.html);
    $('#create_account').empty();
  },
  this.failedSignInDisplay = function(data) {
    $('#authentication').html(data.html);
  },
  this.signOutDisplay = function(data) {
    $('#authentication').html(data.login);
    $('#create_account').html(data.account);
  }
}
