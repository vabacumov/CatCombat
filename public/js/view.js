var View = function() {
  this.displayFightButton = function() {
    $button = document.createElement('input');
    $($button).attr({
      id: "choose",
      type: 'submit',
      value: 'Pick Opponent'
    });
    $('#fight_button').html($button);
  },
  this.newUserDisplay = function(data) {
    $('#authentication').html(data.sign_out);
    $('#create').html(data.create_cat);
    // $('#new_cat').html(data.create_cat);
    $('#new_cat').css('display', 'inline-block');
    this.hoverEffect();
  },
  this.failedNewUserDisplay = function(data) {
    $('#name_error').html(data.name);
    $('#email_error').html(data.email);
    $('#password_error').html(data.password);
    $('#phone_error').html(data.phone);
    this.hoverEffect();
  },
  this.signInDisplay = function(data) {
    $('#authentication').html(data.sign_out);
    $('#user_cat').html(data.user_cat);
    $('#create').empty();
    this.displayFightButton();
    this.hoverEffect();
  },
  this.failedSignInDisplay = function(data) {
    $('#authentication').html(data.html);
    this.hoverEffect();
  },
  this.signOutDisplay = function(data) {
    $('#authentication').html(data.login);
    $('#create').html(data.account);
    $('#user_cat').empty();
    // $('#new_cat').empty();
    this.hoverEffect();
  },
  this.chooseAttributesDisplay = function(data) {
    $('#create').html(data.html);
    this.hoverEffect();
  },
  this.failedNewCatDisplay = function(data) {
    $('#nickname_error').html(data.error);
    this.hoverEffect();
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

    this.displayFightButton();
    this.hoverEffect();
  },
  this.failedAttributesDisplay = function(data) {
    $('#create').html(data.user_cat);
    $('#attr_error').html(data.error);
    this.hoverEffect();
  },
  this.opponentDisplay = function(data) {
    $('#opponent').html(data.html);
    $('#opponent_name').html(data.enemy_name);
    $('#opponent_level').html(data.enemy_level);
    if (data.enemy_rank) {
      $('#opponent_rank').html(data.enemy_rank);
    }
    $('#image').attr('src', data.enemy_img);
  },
  this.winnerDisplay = function(data) {
    $('#winner').html(data.fight_winner);
    $('#opponent').empty();
  },
  this.hoverEffect = function() {
    $('form').hover(function() {
      $(this).css('opacity', '1');
    }, function() {
      $(this).css('opacity', '0.6');
    });
  }
}
