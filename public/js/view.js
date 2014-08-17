var View = function() {
  this.newUserDisplay = function(data) {
    $('#authentication').html(data.html);
    $('#create_account').empty();
  },
  this.failedNewUserDisplay = function(data) {
    $('#name_error').html(data.name);
    $('#email_error').html(data.email);
    $('#password_error').html(data.password);
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
