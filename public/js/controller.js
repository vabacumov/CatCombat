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
        $('#sign_out').on('click', signOut);
      } else {
        view.failedSignInDisplay(response);
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
      $('#sign_in').on('submit', signIn);
      $('#sign_up').on('submit', createAccount);
    }).fail(function() {
      console.log('failed');
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
      if (response.success) {
        view.newUserDisplay(response);
        $('#sign_out').on('click', signOut);
        $('#create_cat').on('submit', createNewCat);
      }
      else {
        view.failedNewUserDisplay(response);
      }
    }).fail(function() {
      console.log('failed');
    })
  }

  var createNewCat = function(event) {
    event.preventDefault();
    $.ajax({
      url: '/cats/new',
      type: "POST",
      data: $(this).serialize()
    }).done(function(response) {
      console.log('success');
      if (response.success) {
        view.chooseAttributesDisplay(response);
        $('#cat_attributes').on('submit', chooseAttributes);
      } else {
        view.failedNewCatDisplay(response);
        $('#create_cat').on('submit', createNewCat);
      }
    }).fail(function() {
      console.log('failed');
    })
  }

  var chooseAttributes = function(event) {
    event.preventDefault();
    $.ajax({
      url: '/cats/new/attributes',
      type: "POST",
      data: $(this).serialize()
    }).done(function(response) {
      console.log('success');
      if (response.success) {
        view.userCatDisplay(response);
      } else {
        view.failedAttributesDisplay(response);
        $('#cat_attributes').on('submit', chooseAttributes);
      }
    }).fail(function() {
      console.log('failed');
    })
  }

  var sessionStatus = function() {
  // Checks whether any user is signed in and assigns corresponding event listener
    if ($('#sign_in').length > 0) {
      $('#sign_in').on('submit', signIn); // Event listener for sign IN button
    } else {
      $('#sign_out').on('click', signOut) // Event listener for sign OUT button
    }

    if ($('#create').children().length > 0) {
      $('#sign_up').on('submit', createAccount) // Event listener for create account button
    }
  }
  sessionStatus();
  view.hoverEffect();
  // Event listeners for hovering
  // var hoverEffect = function() {
  //   $('form').hover(function() {
  //     $(this).css('opacity', '1');
  //   }, function() {
  //     $(this).css('opacity', '0.6');
  //   });
  // }
  //   $('#authentication').hover(function() {
  //   $(this).css('opacity', '1');
  // }, function() {
  //   $(this).css('opacity', '0.6');
  // });
});
