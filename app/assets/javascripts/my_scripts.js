$(document).on("page:load ready", function main(){
    $('#hat-search').autocomplete({
      serviceUrl: '/tags',
      paramName: 'term',
      deferRequestBy: 200,
      dataType: 'JSON',
      transformResult: function(data){
        console.info(data);
        var result = data.map(function(p){
          return {value: p.name, data: p.id};
        });
        return {suggestions: result};
      },
      onSelect: function(s){
        Turbolinks.visit('/explore?tag_name=' + s.value);
      }
    }).on('keydown', function(e){
      var ENTER = 13;
      if( e.keyCode == ENTER ) {
        e.preventDefault();
        Turbolinks.visit('/explore?tag_name=' + e.target.value);
      }
    });

    $('#user_city_id').selectize({
      placeholder: "Укажите город",
      options: window.cities,
      load: function(query, callback) {
        console.info('selectize', query, callback);
        if (query.length == 0) return callback();
        $.ajax({
          url: '/ajax/get_cities?term=' + encodeURIComponent(query),
          type: 'GET',
          error: function() {
            callback();
          },
          success: function(data) {
            var result = data.map(function(e){return {value: e.id, text: e.name}});
            console.info(result);
            callback(result);
          }
        });
      }
    })

    var selector = document.getElementById("user_phone");

    var im = new Inputmask("+7(999)-999-9999");
    if (selector) im.mask(selector);

    $('#hhhh').click(function(){
      alert('sf');
    });

    var width_wrap_elements = $('.wrap-element-profile-followers').width();
    var half_width = (490 - width_wrap_elements)/2;
    $('.wrap-element-profile-followers').css('margin-left', half_width-2).css('margin-right', half_width-2);

    //users form end

    $('textarea').autoResize({
      limit:300,
      extraSpace:35,
      animate:true
    });
    /*$('textarea.description-add-material').autoResize({
      limit:600,
      extraSpace:30,
      animate:true
    });*/

    /*$(".element-of-squares-menu").mouseover(function(){
      $(this).children('.title-element-of-squares-menu').css('opacity', '1');
    });
    $(".element-of-squares-menu").mouseout(function(){
      $(this).children('.title-element-of-squares-menu').css('opacity', '0.5');
    });*/

    /*$('.right-functional').css('margin-left', '80%');
    $('.textarea-form-control-comment').css('height', '30px');

    $(".choice-class").select2({
      placeholder: "Класс"
    });
    $(".choice-theme-material").select2({
      maximumSelectionLength: 1,
      placeholder: "Предмет"
    });*/

    $(window).scroll(function(){
        if($(this).scrollTop() >= 64){
          $('.hat-categories').addClass('fixed-hat-categories');
          $('.search').addClass('hidden');
        }
        if($(this).scrollTop() < 64){
          $('.hat-categories').removeClass('fixed-hat-categories');
          $('.search').removeClass('hidden');
        }

        if($(this).scrollTop() >= 1100)
          $('.road-block-wrapper').addClass('road-block-wrapper-transform');
        else
          $('.road-block-wrapper').removeClass('road-block-wrapper-transform');
        

        if($(this).scrollTop() >= 444){
          $('.wrap-feed-citizen-list').addClass('fixed-feed-citizen-list');
        }else{
          $('.wrap-feed-citizen-list').removeClass('fixed-feed-citizen-list');
        }
    });

    var min_num_back = 1;
    var max_num_back = 4;
    var rand_maxmin_back = (Math.floor(Math.random() * (max_num_back - min_num_back + 1)) + min_num_back);

    if(rand_maxmin_back == 1 || rand_maxmin_back == 2) // белый цвет
      $('.join-to-us-under-hat .main-text').css('color', 'white'); 

    $('.join-to-us-under-hat').css('background-size', 'cover');
    $('.join-to-us-under-hat .profile-link'+rand_maxmin_back).css('display', 'inline-block');

    $('.join-to-us-under-hat').css('background-image', 'url(/images/reg_background_trenly'+rand_maxmin_back+'.png)')

    $(".choice-theme-material").next().children().children().addClass('my-setting-select2-selection');

    $(".type-profiles").click(function(){
      the_id = $(this).attr('id');

      if (the_id == 'all-students'){
        $('#each-students').css('display', 'block');
        $('#each-teachers').css('display', 'none');
      }
      else{
        $('#each-students').css('display', 'none');
        $('#each-teachers').css('display', 'block');
      }
    });


  $.emojiarea.path = '/';
  $.emojiarea.icons = {
      ':smiley:'         : 'smile1.png',
      ':blush:'          : 'smile2.png',
      ':wink:'           : 'smile4.png',
      ':yum:'            : 'smile9.png',
      ':relieved:'       : 'smile8.png',
      ':laughing:'       : 'smile7.png',
      ':sunglasses:'     : 'smile5.png',
      ':grin:'           : 'smile6.png',
      ':thumbsup:'       : 'thumbsup.png',
      ':clap:'           : 'applause.png',

  };

  $('.dont-hide').click(function(){
    $('.main-categories').addClass('dont-hide-menu');
  });
  $(document).click( function(event){
    if($(event.target).closest(".main-categories").length) return;
    $(".main-categories").removeClass("dont-hide-menu");
    event.stopPropagation();
  });


  $('#settigns-profile').tooltip();
  $('.btn').tooltip();
  $('.notices-hat-menu-icon').tooltip();
  $('.main-hat-menu-icon').tooltip();

  $(".type-of-community").click(function(){
    $(".type-of-community").removeClass('active-type-of-community');
    $(this).addClass('active-type-of-community');
  });

  $("#close-notice").click(function(){
    $(this).parent().fadeOut();
  });

  $('#publish-item').popover();

  $('#classroom_name').change(function(){
    val = $(this).val();
    if(val){
      $('#btn-create-class').removeAttr('disabled');
    }
    else{
      $('#btn-create-class').attr('disabled', 'disabled');
    }
  });

  $('#community_name').change(function(){
    val = $(this).val();
    if(val){
      $('#btn-create-community').removeAttr('disabled');
    }
    else{
      $('#btn-create-community').attr('disabled', 'disabled');
    }
  });

  $('#join-to-community').click(function(){
    $(this).css('display', 'none');
    $(this).parent().prepend('<span>Вы с нами!</span>');
  });

  $('#join-to-class').click(function(){
    $(this).css('display', 'none');
    $(this).parent().prepend('<span>Вы с нами!</span>');
  });

  $(".useful-material_post").hover(
      function(){
        $(this).children('.wrap-autor-material').children().fadeIn(400);
      },
      function(){
        $(this).children('.wrap-autor-material').children().fadeOut(400);
  });

  $(".btn-follow").mouseover(function(){
      $(this).removeClass('btn-follow-on').removeClass('btn-primary').addClass('btn-st-red');
      $(this).html('Отмена');
  });
  $(".btn-follow").mouseout(function(){
      $(this).addClass('btn-follow-on').addClass('btn-primary').removeClass('btn-st-red');
      $(this).html('Читаю');
  });



  //открыть КАК ЭТО РАБОТАЕТ
  $('.start-how-does-it-work').click(function(){
    $('#hat-studpad').css('z-index', '900');
    window.location = '#';
    $('.dark-background-for-how-does-it-work, .description-hdiw').css('display', 'block');
    $('.wrap-mike').css('z-index', '2000');
    $('.description-hdiw').css('z-index', '1050');
    $('.its-all-hdiw').css('display', 'none');
  });

  //закрыть КАК ЭТО РАБОТАЕТ
  $('.close-how-does-it-work, .its-all-hdiw').click(function(){
    $('#hat-studpad').css('z-index', '1001');

    $('.dark-background-for-how-does-it-work, .description-hdiw').css('display', 'none');
    $('.wrap-mike, .post-container, #profile_user, .first-left-block, .follow-offer, .title-background, .new-post-buttons').css('z-index', '999');

    var newAttrData = 'publications';
    $('.next-episode-how-does-it-work').data('episode', newAttrData).attr('data-episode', newAttrData);
    $('.next-episode-how-does-it-work').css('display', 'inline');

    var description = "Знакомьтесь, это Михал Палыч. Веселее, дружелюбнее и щедрее летчика мы еще не видели! Он будет с вами делиться историями, ссылками, музыкой и даже видеороликами.";
    $('.description-hdiw').addClass('description-hdiw-mike-speach').removeClass('description-hdiw-publications').removeClass('description-hdiw-me').removeClass('description-hdiw-last-publicators').removeClass('description-hdiw-recommend-people').removeClass('description-hdiw-panel-publications').html(description);
  });

  //сменить эпизод КАК ЭТО РАБОТАЕТ
  $('.next-episode-how-does-it-work').click(function(){
    var nextStation = $(this).data('episode');

    if(nextStation == 'publications'){
      var description = "Здесь Вы можете увидеть все публикации коллег Вашей специализации. Вы можете оставить комментарий или же просто сказать спасибо, ведь публиковали именно для Вас! Если Вы хотите получать больше публикаций, для этого читайте больше людей!";
      $('.wrap-mike').css('z-index', '999');
      $('.post-container').css('z-index', '2000').css('position', 'relative');
      $('.description-hdiw').removeClass('description-hdiw-mike-speach').addClass('description-hdiw-' + nextStation).html(description);

      var newAttrData = 'me';
      $(this).data('episode', newAttrData).attr('data-episode', newAttrData);
    }

    if(nextStation == 'me'){
      var description = "Здесь все просто! Это ссылка на Ваш микроблог.";
      $('.post-container').css('z-index', '999').css('position', 'static');
      $('#profile_user').css('z-index', '2000').css('position', 'relative');
      $('.description-hdiw').removeClass('description-hdiw-publications').addClass('description-hdiw-' + nextStation).html(description);

      var newAttrData = 'last-publicators';
      $(this).data('episode', newAttrData).attr('data-episode', newAttrData);
    }

    if(nextStation == 'last-publicators'){
      var description = "Те, кто разместил публикации сегодня, попадают сюда. Хотите, чтобы Вас заметили? Публикуйте чаще.";
      $('#profile_user').css('z-index', '999').css('position', 'static');
      $('.first-left-block').css('z-index', '2000').css('position', 'relative');
      $('.description-hdiw').removeClass('description-hdiw-me').addClass('description-hdiw-' + nextStation).html(description);

      var newAttrData = 'recommend-people';
      $(this).data('episode', newAttrData).attr('data-episode', newAttrData);
    }

    if(nextStation == 'recommend-people'){
      var description = "После регистрации Вам доступны публикации только тех, кто имеет одинаковую с Вами специализацию . Если Вы хотите получать больше интересных публикаций , то выбирайте и читайте тех, кто Вам интересен. Тогда Вы будете видеть всё, что они опубликовали у себя в микроблоге.";
      $('.first-left-block').css('z-index', '999');
      $('.follow-offer').css('z-index', '2000').css('position', 'relative');
      $('.description-hdiw').removeClass('description-hdiw-last-publicators').addClass('description-hdiw-' + nextStation).html(description);

      var newAttrData = 'panel-publications';
      $(this).data('episode', newAttrData).attr('data-episode', newAttrData);
    }

    if(nextStation == 'panel-publications'){
      var description = "А теперь настало время что-нибудь опубликовать! Это очень просто. Кликните на один из видов публикации и создайте её! Вы можете публиковать все, что угодно, ведь это Ваш микроблог.";
      $('.follow-offer').css('z-index', '999').css('position', 'static');
      $('.title-background, .new-post-buttons').css('z-index', '1000').css('position', 'relative');
      $('.description-hdiw').removeClass('description-hdiw-recommend-people').addClass('description-hdiw-' + nextStation).html(description);
      $(this).css('display', 'none');
      $('.its-all-hdiw').css('display', 'inline');
    }
  });

});


