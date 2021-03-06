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
  function setUpLessonPage(array) {
    var dom = $('<div class="pick-card mdl-cell mdl-cell--2-col mdl-cell--4-col-phone mdl-card mdl-shadow--2dp"><div class="mdl-card__title"><h2 class="mdl-card__title-text">Pick A Lesson</h2></div><div class="lesson-selector"><div class="left"></div><div class="right"></div></div></div><div class="display-card mdl-cell mdl-cell--10-col mdl-cell--8-col-tablet mdl-card mdl-shadow--2dp"><div class="mdl-card__title"><h2 class="mdl-card__title-text">Demo</h2></div><iframe id="display" src="leapmotion.html"></iframe><div class="demo-container mdl-card__supporting-text">Pick a lesson in the left to begin.</div></div>'),
      mid = parseInt(array.length / 2),
      left = array.slice(0, mid),
      right = array.slice(mid),
      leftDiv = dom.find('.left'),
      rightDiv = dom.find('.right');
    for (var ele in left) {
      leftDiv.append($('<button class="mdl-button mdl-js-button mdl-js-ripple-effect">' + left[ele] + '</button>'))
    }
    for (var ele in right) {
      rightDiv.append($('<button class="mdl-button mdl-js-button mdl-js-ripple-effect">' + right[ele] + '</button>'))
    }
    dom.find('.lesson-selector .mdl-button').click(function(e) {
      dom.find('.lesson-selector button').removeClass('active');
      $(e.target).closest('button').addClass('active');
      var lessonName = $(e.target).closest('button').text();
      var demo = $('<img></img>').attr('alt', 'Demo: ' + lessonName)
        .attr('src', 'assets/demos/' + lessonName + '.jpg');
      dom.find('.demo-container').empty();
      demo.on('error', function() {
        demo = $('<video></video>').attr('src', 'assets/demos/' + lessonName + '.mp4')
          .attr('type', 'video/mp4').prop('autoplay', true);
        dom.find('.demo-container').append(demo);
      });
      demo.on('load', function() {
        dom.find('.demo-container').append(demo);
      });
    });
    $('.mdl-grid').empty();
    $('.mdl-grid').append(dom);
    componentHandler.upgradeElements($('.mdl-grid .mdl-button').toArray());
  }
  function createPersonAboutCard(name, options) {
    var obj = $('<div class="person-card category-card mdl-cell mdl-cell--6-col mdl-cell--8-col-tablet mdl-card mdl-shadow--2dp"><div class="mdl-card__title mdl-card--expand"><h2 class="mdl-card__title-text">' + escapeHTML(name) + '</h2></div><div class="mdl-card__supporting-text">' + escapeHTML(options.intro ? options.intro: 'Pleae fill in the intro.') + '</div><div class="mdl-card__actions mdl-card--border"><button class="github-btn mdl-button mdl-js-button mdl-button--icon"><span class="icon-github"></span></button><button class="linkedin-btn mdl-button mdl-js-button mdl-button--icon"><span class="icon-linkedin"></span></button></div></div>');
    if (options.github) {
      obj.find('.github-btn').click(function() {
        window.open('https://github.com/' + options.github);
      });
    } else {
      obj.find('.github-btn').hide();
    }
    if (options.linkedin) {
      obj.find('.linkedin-btn').click(function() {
        window.open('https://www.linkedin.com/in/' + options.linkedin);
      });
    } else {
      obj.find('.linkedin-btn').hide();
    }
    if (options.background) {
      obj.find('.mdl-card__title').css('background-image', 'url(' +  options.background + ')');
    }
    return obj;
  }
  function saveUserConfig() {
    if (!user.email) return false;
    var hash = CryptoJS.MD5(user.email.trim().toLowerCase());
    sessionStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('user_' + hash, sessionStorage.getItem('user'));
  }
  var module_script = {
    home: function() {
      var mainDom = $('<div class="category-card mdl-cell mdl-cell--12-col mdl-card mdl-shadow--2dp mdl-grid"></div>'),
        overallProgDom = $('<div class="mdl-cell mdl-cell--8-col mdl-cell--6-col-desktop"><div class="circle"><strong></strong><br/><span>Overall Progress</span></div></div>'),
        alphabetProgDom = $('<div class="mdl-cell mdl-cell--8-col mdl-cell--6-col-desktop"><div class="circle"><strong></strong><br/><span>Alphabet Progress</span></div></div>'),
        numbersProgDom = $('<div class="mdl-cell mdl-cell--8-col mdl-cell--6-col-desktop"><div class="circle"><strong></strong><br/><span>Numbers Progress</span></div></div>'),
        quizGradeDom = $('<div class="mdl-cell mdl-cell--8-col mdl-cell--6-col-desktop"><div class="circle"><strong></strong><br/><span>Average Grade</span></div></div>');
      overallProgDom.find('.circle').circleProgress({
        value: 0.75,
        size: 200,
        fill: {
          gradient: ["red", "orange"]
        }
      }).on('circle-animation-progress', function(event, progress, stepValue) {
        $(this).find('strong').html(parseInt(100 * progress * stepValue) + '<i>%</i>');
      });
      alphabetProgDom.find('.circle').circleProgress({
        value: 0.55,
        size: 200,
        fill: {
          gradient: ["red"]
        }
      }).on('circle-animation-progress', function(event, progress, stepValue) {
        $(this).find('strong').html(parseInt(100 * progress * stepValue) + '<i>%</i>');
      });
      numbersProgDom.find('.circle').circleProgress({
        value: 0.9,
        size: 200,
        fill: {
          gradient: ["orange"]
        }
      }).on('circle-animation-progress', function(event, progress, stepValue) {
        $(this).find('strong').html(parseInt(100 * progress * stepValue) + '<i>%</i>');
      });
      quizGradeDom.find('.circle').circleProgress({
        value: 0.85,
        size: 200,
        fill: {
          gradient: ["green"]
        }
      }).on('circle-animation-progress', function(event, progress, stepValue) {
        $(this).find('strong').html(parseInt(100 * progress * stepValue) + '<i>%</i>');
      });
      mainDom.append(overallProgDom).append(alphabetProgDom).append(numbersProgDom).append(quizGradeDom);
      $('.mdl-grid').append(mainDom);
    },
    learn: function() {
      var learnDom = $('<div class="category-card mdl-cell mdl-cell--6-col mdl-cell--8-col-tablet mdl-card mdl-shadow--2dp"> <div class="mdl-card__title" style="background-image:url(assets/images/alphabet.jpg)"> <h2 class="mdl-card__title-text">Alphabet</h2> </div> <div class="mdl-card__supporting-text"> Start practicing your ABCs! </div> <div class="mdl-card__actions mdl-card--border"> <a id="alphabet-btn" class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect"> Let\'s Do It! </a> </div> <div class="mdl-card__menu"> <button data-category="alphabet" class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect"> <i class="material-icons">favorite_border</i> </button> </div> </div> <div class="category-card mdl-cell mdl-cell--6-col mdl-cell--8-col-tablet mdl-card mdl-shadow--2dp"> <div class="mdl-card__title" style="background-image:url(assets/images/numbers.jpg)"> <h2 class="mdl-card__title-text">Numbers</h2> </div> <div class="mdl-card__supporting-text"> Learn to count in ASL! </div> <div class="mdl-card__actions mdl-card--border"> <a id="numbers-btn" class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" id="num-btn"> Let\'s Do It! </a> </div> <div class="mdl-card__menu"><button data-category="numbers" class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect"> <i class="material-icons">favorite_border</i> </button> </div> </div>');
      learnDom.find('#alphabet-btn').click(function() {
        $('header .mdl-layout-title').html('Learn <i class="material-icons">chevron_right</i> Alphabet');
        setUpLessonPage(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q',
          'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']);
      });
      learnDom.find('#numbers-btn').click(function() {
        $('header .mdl-layout-title').html('Learn <i class="material-icons">chevron_right</i> Numbers');
        setUpLessonPage(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']);
      });
      if (typeof user.favorites == 'object') {
        $.each(user.favorites, function(key, value) {
          if (value === true) {
            learnDom.find('.mdl-button[data-category="' + key + '"]').find('.material-icons').text('favorite');
          }
        });
      }
      learnDom.find('.mdl-card__menu .mdl-button').click(function(e) {
        var flag = false,
          btn = $(e.target).closest('button');
        if (btn.find('i').text() == 'favorite_border') {
          btn.find('i').text('favorite');
          flag = true;
        } else {
          btn.find('i').text('favorite_border');
        }
        if (!user.favorites) {
          user.favorites = {};
        } else {
          user.favorites[btn.data('category')] = flag;
        }
        saveUserConfig();
      });
      componentHandler.upgradeElements($('.mdl-grid .mdl-button').toArray());
      $('.mdl-grid').append(learnDom);
    },
    quiz: function() {
      var quizDom = $('<div class="mdl-cell mdl-cell--12-col mdl-card mdl-shadow--2dp mdl-grid"></div>'),
      questions = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q',
        'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
      function randomProblem() {
        quizDom.empty();
        var problem = questions[parseInt(Math.random() * questions.length)];
        var contentDom = $('<div class="mdl-card__supporting-text"><iframe id="display" class="hint" src="leapmotion.html"></iframe><h3>Try to do the sign for "' + problem + '"</h3><div class="buttons"><button class="try-another-btn mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--raised mdl-button--accent">Try Another One</button><button class="hint-btn mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--raised mdl-button--colored">Show Answer</button></div><div class="hint-container"></div></div>');
        componentHandler.upgradeElements(contentDom.find('.mdl-button').toArray());
        contentDom.find('.try-another-btn').click(function() {
          randomProblem();
        });
        contentDom.find('.hint-btn').click(function(e) {
          e.target.parentNode.remove(e.target);
          var demo = $('<img></img>').attr('alt', 'Demo: ' + problem)
            .attr('src', 'assets/demos/' + problem + '.jpg');
          contentDom.find('.demo-container').empty();
          demo.on('error', function() {
            demo = $('<video></video>').attr('src', 'assets/demos/' + problem + '.mp4')
              .attr('type', 'video/mp4').prop('autoplay', true);
            contentDom.find('.hint-container').append(demo);
          });
          demo.on('load', function() {
            contentDom.find('.hint-container').append(demo);
          });
        });
        quizDom.append(contentDom);
      }
      randomProblem();
      $('.mdl-grid').append(quizDom);
    },
    about: function() {
      var Richard = createPersonAboutCard('Richard Fulop', {
        intro: 'Freshman at the University of the Burgh. I was there when Pittsburgh was only a fort. But I was older than I am today, back then.',
        background: 'assets/images/Richard.jpg' ,
        github: 'richiebful',
        linkedin: 'richard-fulop-573301a1',
      });
      $('.mdl-grid').append(Richard);
      var Tianke = createPersonAboutCard('Tianke Li', {
        intro: "Freshman at University of Pittsburgh. I designed the data analysis sysmtem and helped with collecting data. Besides, I did lots of research work.",
        background: 'assets/images/TK.jpg',
        github: 'tkl96',
        linkedin: 'tianke-li-423a4b112',
      });
      $('.mdl-grid').append(Tianke);
      var Joe = createPersonAboutCard('Joseph Rogers', {
        intro: 'Sophomore at the University of Pittsburgh. I helped with data collection and analysis and assisted with both front-end programming and back-end consulting.',
        background: 'assets/images/Joe.jpg',
        github: 'JosephDRogers23',
        linkedin: 'joseph-rogers-6b327a103',
      });
      //$('<div class="people category-card mdl-cell mdl-cell--6-col mdl-cell--8-col-tablet mdl-card mdl-shadow--2dp"><div class="mdl-card__title mdl-card--expand"><h2 class="mdl-card__title-text">Joseph Rogers</h2></div><div class="mdl-card__supporting-text"> Fill this in Joe.</div><div class="mdl-card__actions mdl-card--border"> <button class="mdl-button mdl-js-button mdl-button--icon"> <a href="https://github.com/JosephDRogers23" target="_blank" ><span class="icon-github"></span></a> </button><button class="mdl-button mdl-js-button mdl-button--icon"> <a href="https://www.linkedin.com/in/joseph-rogers-6b327a103" target="_blank" ><span class="icon-linkedin"></span> </button></div></div>');
      $('.mdl-grid').append(Joe);
      var Alex = createPersonAboutCard('Alexander Rowden', {
        intro: 'Sophomore. Along with being the resident hand model of the project, I jumped between helping with the structure of the front end and the data collection of the back end.',
        background: 'assets/images/Alex.jpg',
        github: 'Alex-Rowden',
        linkedin: 'alexander-rowden-60262bb1',
      });
      $('.mdl-grid').append(Alex);
      var Zac = createPersonAboutCard('Zac Yu', {
        intro: 'Freshman at Pitt, I designed the web interface and took charge of front-end development of this project. Besides, I also helped other members with debugging JavaScript.',
        background: 'assets/images/Zac.jpg',
        github: 'zacyu',
        linkedin: 'zacyu',
      });
      //$('<div class="people category-card mdl-cell mdl-cell--6-col mdl-cell--8-col-tablet mdl-card mdl-shadow--2dp"><div class="mdl-card__title mdl-card--expand"><h2 class="mdl-card__title-text">Zac Yu</h2></div><div class="mdl-card__supporting-text"> Fill this in Zac.</div><div class="mdl-card__actions mdl-card--border"> <button class="mdl-button mdl-js-button mdl-button--icon"><a href="https://github.com/zacyu" target="_blank" > <span class="icon-github"></a></span> </button><button class="mdl-button mdl-js-button mdl-button--icon"> <span class="icon-linkedin"></span> </button></div></div>');
      $('.mdl-grid').append(Zac);
    }
  };
  var init = function() {
    $('header .mdl-layout-title').on('click', function() {
      setModule();
    });
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
            user = JSON.parse(localStorage.getItem('user_' + hash));
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
