//(function() {
  var user;
  try {
    user = JSON.parse(sessionStorage.getItem('user'));
  } catch (e) {
    user = false;
  }
  String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
  }
  function setModule(e) {
    if (e && e.preventDefault) e.preventDefault();
    var module_name = location.hash.slice(1);
    module_name = typeof module_script[module_name] == 'function' ? module_name : 'home';
    $('nav a').removeClass('active');
    $('nav a[href="#' + module_name + '"]').addClass('active');
    $('main > .mdl-grid').empty();
    $('.mdl-layout-title').text(module_name.capitalize())
    module_script[module_name](typeof e == 'function' ? e : undefined);
    if (module_name == 'home') {
      history.replaceState('', document.title, window.location.pathname);
    }
  }
  function escapeHTML(text) {
    return $('<div/>').text(text).html();
  }
  var module_script = {
    home: function() {
      swal.close();
    },
    learn: function() {
      swal({
        title: 'Under Construction',
        type: 'info'
      }, function() {
        location.hash = 'home'
      });
    },
    quiz: function() {
      swal({
        title: 'Under Construction',
        type: 'info'
      }, function() {
        location.hash = 'home'
      });
    },
    about: function() {
      swal({
        title: 'Under Construction',
        type: 'info'
      }, function() {
        location.hash = 'home'
      });
    }
  };
  var init = function() {
    $('#main-email').text(user.email);
    $('#main-avatar').attr('src', 'https://www.gravatar.com/avatar/' +
      CryptoJS.MD5(user.email.trim().toLowerCase()) + '?s=128&d=mm');
    $('#header-menu-dd li').click(function(e) {
      switch($(e.target).data('link')) {
        case 'contact':
          swal('Under Construction', '', 'info');
          break;
        case 'legal':
          swal('Under Construction', '', 'info');
          break;
      }
    });
    $('nav a').click(function(e) {
      e.preventDefault();
      if ($(e.target).hasClass('active')) return false;
      var module_name = $(e.target).data('link');
      location.hash = module_name;
      $('.mdl-layout__drawer, .mdl-layout__obfuscator').removeClass('is-visible');
    });
    setModule();
  }
  $(document).ready(function() {
    if (!user || typeof user !== 'object' || !user.email) {
      swal({
        title: 'Please enter your email.',
        text: 'Note: User account is stored locally in this demo.',
        animation: 'slide-from-top',
        inputPlaceholder: "Email",
        type: 'input',
        closeOnConfirm: false
      }, function(input) {
        if (input === false) return false;
        if (input === '') {
          swal.showInputError('Please enter your email address!');
        } else if (!(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(input)) {
          swal.showInputError('Please enter a valid email address!');
        } else {
          var hash = CryptoJS.MD5(input.trim().toLowerCase());
          if (localStorage.getItem('user_' + hash)) {
            sessionStorage.setItem('user', localStorage.getItem('user_' + hash));
          } else {
            user = {
              email: input
            };
            sessionStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('user_' + hash, sessionStorage.getItem('user'));
          }
          swal.close();
          init();
        }
      });
      return;
    }
    init();
  });
  window.onhashchange = setModule;
//})();
