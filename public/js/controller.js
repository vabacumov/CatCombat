$(document).ready(function() {
  var view = new View; //Creates new instance of View
  view.hideOpponentDiv();
  view.animateTitle();
  if ($('#create').trim == undefined) {
    view.showUserCat();
  }

  var eventListeners = function() {
    $('#sign_up').on('submit', createAccount);
    $('#sign_in').on('submit', signIn);
    $('#sign_out').on('click', signOut);
    $('#create_cat').on('submit', createNewCat);
    $('#cat_attributes').on('submit', chooseAttributes);
    $('#choose').on('click', chooseOpponent);
    $('#fight').on('click', view.imageFightEffect);
    $('#fight').on('click', fightOpponent);
    view.hoverEffect();
  }

  var removeEventListeners = function() {
    $('#sign_up').off();
    $('#sign_in').off();
    $('#sign_out').off();
    $('#create_cat').off();
    $('#cat_attributes').off();
    $('#choose').off();
    $('#fight').off();
    view.hoverEffectOff();
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
        removeEventListeners();
        eventListeners();
      } else {
        view.failedSignInDisplay(response);
        removeEventListeners();
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
      removeEventListeners();
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
        removeEventListeners();
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
        removeEventListeners();
        eventListeners();
      } else {
        view.failedNewCatDisplay(response);
        removeEventListeners();
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
        view.displayChooseOpponentButton();
        removeEventListeners();
        eventListeners();
      } else {
        view.failedAttributesDisplay(response);
        removeEventListeners();
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
      removeEventListeners();
      eventListeners();
    }).fail(function() {
      console.log('failed');
    })
  }

  var fightOpponent = function(event) {
    event.preventDefault();
    $.ajax({
      url: '/fight',
      type: "PUT"
    }).done(function(response) {
      console.log('success');
      if (response.level_up) {
        view.hideUserCat();
        view.chooseAttributesDisplay(response);
      } else {
        view.winnerDisplay(response);
        // if (response.zoom == "left") {
        //   view.zoomWinner("#nickname");
        // } else if (response.zoom == "right") {
        //   view.zoomWinner("#opponent_name");
        // }
      }
      removeEventListeners();
      eventListeners();
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
});
