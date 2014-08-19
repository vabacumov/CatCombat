$(document).ready(function() {
  var view = new View; //Creates new instance of View
  var eventListeners = function() {
  $('#sign_up').on('submit', createAccount);
  $('#sign_in').on('submit', signIn);
  $('#sign_out').on('click', signOut);
  $('#create_cat').on('submit', createNewCat);
  $('#cat_attributes').on('submit', chooseAttributes);
  $('#choose').on('submit', chooseOpponent);
  }

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
        eventListeners();
      } else {
        view.failedSignInDisplay(response);
        eventListeners();
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
      eventListeners();
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
        eventListeners();
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
        eventListeners();
      } else {
        view.failedNewCatDisplay(response);
        eventListeners();
      }
    }).fail(function() {
      console.log('failed');
    })
  }

  var chooseAttributes = function(event) {
    event.preventDefault();
    $.ajax({
      url: '/cats/new/attributes',
      type: "PUT",
      data: $(this).serialize()
    }).done(function(response) {
      console.log('success');
      if (response.success) {
        view.userCatDisplay(response);
      } else {
        view.failedAttributesDisplay(response);
        eventListeners();
      }
    }).fail(function() {
      console.log('failed');
    })
  }

  var chooseOpponent = function(event) {
    event.preventDefault();
    $.ajax({
      url: '/cats/opponent',
      type: "GET"
    }).done(function(response) {
      console.log('success');
      view.opponentDisplay(response);
    }).fail(function() {
      console.log('failed');
    })
  }

  var hoverEffect = function() {
    $('form').hover(function() {
      $(this).css('opacity', '1');
    }, function() {
      $(this).css('opacity', '0.6');
    });
    $('#authentication').hover(function() {
    $(this).css('opacity', '1');
    }, function() {
    $(this).css('opacity', '0.6');
    });
  }
  eventListeners();
  view.hoverEffect();
});
