var View = function() {
  this.animateLetters = (function($) {
    $.fn.writeText = function(content) {
      var contentArray = content.split(""),
      current = 0,
      elem = this;
      setInterval(function() {
        if(current < contentArray.length) {
          elem.text(elem.text() + contentArray[current++]);
        }
      }, 200);
    };
  })(jQuery),

  this.animateTitle = function() {
    $('h1').writeText("Cat Combat");
    $('h1').animate({
      backgroundColor: "green",
      fontSize: "4em",
      marginLeft: "auto",
      letterSpacing: "0.2em",
      textAlign: 'right'
    }, 2000)
  },

  this.displayChooseOpponentButton = function() {
    $button = document.createElement('input');
    $($button).attr({
      class: "button",
      id: 'choose',
      type: 'submit',
      value: 'Pick Opponent'
    });
    $('#choose_enemy').html($button);
  },
  this.newUserDisplay = function(data) {
    $('#authentication').html(data.sign_out);
    $('#create').html(data.create_cat);
    // $('#new_cat').html(data.create_cat);
    $('#new_cat').css('display', 'inline-block');
  },
  this.failedNewUserDisplay = function(data) {
    $('#name_error').html(data.name);
    $('#email_error').html(data.email);
    $('#password_error').html(data.password);
    $('#phone_error').html(data.phone);
  },
  this.signInDisplay = function(data) {
    $('#authentication').html(data.sign_out);
    $('#user_cat').html(data.user_cat);
    $('#create').empty();
    this.showUserCat();
    this.displayChooseOpponentButton();
  },
  this.failedSignInDisplay = function(data) {
    $('#authentication').html(data.html);
  },
  this.signOutDisplay = function(data) {
    $('#authentication').html(data.login);
    $('#create').html(data.account);
    $('#user_cat').css('visibility', 'hidden');
    this.hideOpponentDiv();
    $('#choose_enemy').empty();
    $('#winner').empty();
  },
  this.chooseAttributesDisplay = function(data) {
    $('#create').html(data.html);
    $('#points').html("You have " + data.points + " points to spend")
  },
  this.failedNewCatDisplay = function(data) {
    $('#nickname_error').html(data.error);
  },
  this.userCatDisplay = function(data) {
    $('#create').empty();

    $('#user_cat').html(data.cat);
    $('#strength').html(data.strength);
    $('#agility').html(data.agility);
    $('#intelligence').html(data.intelligence);
    $('#cuteness').html(data.cuteness);
    $('#xp').html(data.xp);
    $('#level').html(data.level);
    $('#rank').html(data.rank);
  },
  this.failedAttributesDisplay = function(data) {
    $('#create').html(data.user_cat);
    $('#attr_error').html(data.error);
    $('#points').html("You have" + data.points + " points to spend")
  },
  this.opponentDisplay = function(data) {
    $('#opponent').css('z-index', 1);
    $('#opponent').html(data.html);
    $('#opponent_name').html(data.enemy_name);
    $('#opponent_level').html(data.enemy_level);
    if (data.enemy_rank) {
      $('#opponent_rank').html(data.enemy_rank);
    }
    $('#enemy_cat').attr('src', data.enemy_img);
    this.showOpponentDiv();
    $('#winner').find('p').empty();
  },
  this.winnerDisplay = function(data) {
    $('#xp').html(data.xp);
    $('#level').html(data.level);
    $('#rank').html(data.rank);
    $('#winner').find('p').html(data.winner);
    // $('#winner').find('p').css();
    // $('#winner').animate({
    //   backgroundColor: "red",
    //   fontSize: "2em" }, 1000
    //   );
    this.hideOpponentDiv();
  },
  this.hoverEffect = function() {
    $('form').hover(function() {
      $(this).css('opacity', '1');
    }, function() {
      $(this).css('opacity', '0.6');
    });
  },
  this.hoverEffectOff = function() {
    $('form').off();
  },
  this.imageFightEffect = function() {
    $('#user_cat').animate({
      left: "+=27%"
    }, 3000, function() {
      $(this).animate({
          left: "-=27%"
        }, 2000)
    });
    $('#opponent').animate({
      right: "+=27%"
    }, 3000, function() {
      $(this).animate({
        right: "-=27%"
      }, 2000)
    });
    // $('winner').animate({
    //   backgroundColor: 'red'
    // }, 3000, function() {
    //   $(this).css('background-color', '')
    // }
    // );
    $('body > *').not('.styled_div').animate({
      opacity: 0.4
    }, 5000, function() {
      $(this).animate({
        opacity: 1
      })
    })
  },
  // this.zoomWinner = function(winner) {
  //   $(winner).css('color', 'red');
  // },
  this.hideOpponentDiv = function() {
    $('#opponent').css('visibility', 'hidden');
  },
  this.showOpponentDiv = function() {
    $('#opponent').css('visibility', 'visible');
  },
  this.hideUserCat = function() {
    $('#user_cat').css('visibility', 'hidden');
  },
  this.showUserCat = function() {
    $('#user_cat').css('visibility', 'visible');
  }
}
