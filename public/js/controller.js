$(document).ready(function() {
  var view = new View; //Creates new instance of View

  var signIn = function(event) {
    event.preventDefault();
    $.ajax({
      url: '/sessions/new',
      type: "GET",
      data: $(this).serialize()
    }).done(function(response) {
      console.log('success');
      if (response.success) {
        view.signInDisplay(response);
        // $('#authentication').html(response.html);
        // $('#create_account').empty();
        $('#sign_out').on('click', signOut);
      } else {
        view.failedSignInDisplay(response);
        // $('#authentication').html(response.html);
        $('#sign_in').on('submit', signIn);
      }
    }).fail(function() {
      console.log('failed');
    })
  }

  var signOut = function(event) {
    event.preventDefault();
    $.ajax({
      url: '/sessions/delete',
      type: "GET"
    }).done(function(response) {
      console.log('success');
      view.signOutDisplay(response);
      // $('#authentication').html(response.sign_in);
      // $('#create_account').html(response.create_account);
      $('#sign_in').on('submit', signIn);
      $('#sign_up').on('submit', createAccount);
    }).fail(function() {
      console.log('failed')
    })
  }

  var createAccount = function(event) {
    event.preventDefault();
    $.ajax({
      url: '/user/new',
      type: "POST",
      data: $(this).serialize()
    }).done(function(response) {
      console.log('success');
      // $('#authentication').html(response.html);
      // $('#create_account').empty();
      if (response.success) {
        view.newUserDisplay(response);
        $('#sign_out').on('click', signOut);
        $('#create_account').empty();
      }
      else {
        view.newUserDisplay(response);
        $('#sign_in').on('submit', signIn);
      }
    }).fail(function() {
      console.log('failed')
    })
  }

  var sessionStatus = function() {
  // Checks whether any user is signed in and assigns corresponding event listener
    if ($('#sign_in').length > 0) {
      $('#sign_in').on('submit', signIn); // Event listener for sign IN button
    } else {
      $('#sign_out').on('click', signOut) // Event listener for sign OUT button
    }

    if ($('#create_account').children().length > 0) {
      $('#sign_up').on('submit', createAccount) // Event listener for create account button
    }
  }
  sessionStatus();
});