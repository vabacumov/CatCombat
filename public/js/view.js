var View = function() {
  this.newUserDisplay = function(data) {
    $('#authentication').html(data.sign_out);
    $('#create_account').empty();
    $('#new_cat').html(data.create_cat);
  },
  this.failedNewUserDisplay = function(data) {
    $('#name_error').html(data.name);
    $('#email_error').html(data.email);
    $('#password_error').html(data.password);
    $('#phone_error').html(data.phone);
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
  },
  this.chooseAttributesDisplay = function(data) {
    $('#new_cat').html(data.html);
  },
  this.failedNewCatDisplay = function(data) {
    $('#nickname_error').html(data.error);
  }
}
