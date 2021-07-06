$(window).on('load', function () {
   $('.preloader').fadeOut().end().delay(400).fadeOut('slow');
});

jQuery(document).ready(function () {

   //----Format Webp---------

   function testWebP(callback) {
      let webP = new Image();
      webP.onload = webP.onerror = function () {
         callback(webP.height == 2);
      };
      webP.src =
         'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
   }
   testWebP(function (support) {
      if (support == true) {
         document.querySelector('body').classList.add('webp');
      }
   });

   // select form 

   let select = function () {
      const telegram = document.querySelector('#telegram');
      const skype = document.querySelector('#skype');
      let selectHeader = document.querySelectorAll('.select__header');
      let selectIrem = document.querySelectorAll('.form__select');

      selectHeader.forEach(item => {
         item.addEventListener('click', function () {
            this.parentElement.classList.toggle('active')
         })
      })

      selectIrem.forEach(item => {
         item.addEventListener('click', selectChoose)
      })


      function selectChoose() {
         let text = this.innerText,
            select = this.closest('.select'),
            currentText = this.closest('.select').querySelector('.form__select-btn')
         currentText.innerText = text;
         select.classList.remove('active');

         if (text === 'Telegram') {
            telegram.classList.add('active'),
               skype.classList.remove('active')
         } else if (text === 'Skype') {
            skype.classList.add('active'),
               telegram.classList.remove('active')
         }
      }
   }

   select();

   //Валидация и отправка формы

   $('[data-submit]').on('click', function (e) {
      e.preventDefault();
      $(this).parent('form').submit();
   })

   $.validator.addMethod(
      "regex",
      function (value, element, regexp) {
         var re = new RegExp(regexp);
         return this.optional(element) || re.test(value);
      },
      "Please check your input."
   );

   // Функция валидации и вывода сообщений
   function valEl(el) {

      el.validate({
         rules: {
            name: {
               required: true
            },
            company: {
               required: true
            },
            name: {
               required: true
            },
            job: {
               required: true
            },
            telegram: {
               required: true
            },
            skype: {
               required: true
            },
            subject: {
               required: true
            },
            email: {
               required: true,
               email: true
            }
         },

         // Начинаем проверку id="" формы
         submitHandler: function (form) {
            $('.preloader').fadeIn();
            var $form = $(form);
            var $formId = $(form).attr('id');
            switch ($formId) {
               // Если у формы id="goToNewPage" - делаем:
               case 'goToNewPage':
                  $.ajax({
                     type: 'POST',
                     url: $form.attr('action'),
                     data: $form.serialize(),
                  })
                     .always(function (response) {
                        //ссылка на страницу "спасибо" - редирект
                        location.href = 'https://wayup.in/lm/landing-page-marathon/success';
                        //отправка целей в Я.Метрику и Google Analytics
                        ga('send', 'event', 'masterklass7', 'register');
                        yaCounter27714603.reachGoal('lm17lead');
                     });
                  break;
               // Если у формы id="popupResult" - делаем:
               case 'popupResult':
                  $.ajax({
                     type: 'POST',
                     url: $form.attr('action'),
                     data: $form.serialize(),
                  })
                     .always(function (response) {
                        setTimeout(function () {
                           $('.preloader').fadeOut();
                           $form.trigger('reset');
                        }, 400);
                        // setTimeout(function () {
                        //    $('#overlay').fadeIn();

                        //    //строки для остлеживания целей в Я.Метрике и Google Analytics
                        // }, 1100);
                        // $('#overlay').on('click', function (e) {
                        //    $(this).fadeOut();
                        // });

                     });
                  break;
            }
            return false;
         }
      })
   }

   // Запускаем механизм валидации форм, если у них есть класс .js-form
   $('.js-form').each(function () {
      valEl($(this));
   });

   // Burger menu 

   const burger = $('.icon-menu')

   let allMobailNavClasses = $('.icon-menu, #navigation, .menu__item, .menu__wrapper');

   burger.on('click', function () {
      allMobailNavClasses.toggleClass('active');
   });

   //----------------------------------

   let animateHidden = $('.animate-hidden');
   animateHidden.waypoint(
      function () {
         animateHidden.addClass('not-in-view');
      },
      { offset: '80%' },
   );

   // ---------------------------------------------------

   $(window).scroll(function () {
      let height = $(window).scrollTop();

      if (height > 124) {
         $('.header').addClass('active');
      } else {
         $('.header').removeClass('active');
      }
   });

   // ------------------- Popaps ---------------

   // Skroll popup-footer

   let scroll = null;

   if ($(window).width() > 767) {
      scroll = 3500;
   } else if ($(window).width() < 767 && $(window).width() > 576) {
      scroll = 5500;
   } else if ($(window).width() < 576) {
      scroll = 7500;
   }

   const footPop = $('#footer-popup');

   $(window).scroll(function () {
      let height = $(window).scrollTop();
      (height > scroll) ? footPop.addClass('active') : footPop.removeClass('active');
   });


   function getCookie(name) {
      let matches = document.cookie.match(new RegExp(
         "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
      ));
      return matches ? decodeURIComponent(matches[1]) : undefined;
   }


   // Находим попап 
   const popup = $('#popup');
   const popup2 = $('#popup2');
   const popup3 = $('#popup3');
   const popupCloses = $('#close-popup');
   const popupCloses2 = $('#close-popup2');
   const popupCloses3 = $('#close-popup3');

   // Создаем для каждого нового попапа переменную с cookie 
   let alertwin = getCookie("alertwin");
   let alertwin2 = getCookie("alertwin2");
   let alertwin3 = getCookie("alertwin3");

   // Функция проверки cookie и удаления попапа с нужной cookie
   function removePopup(cookie, cookieMeaning, pop) {
      if (cookie == `${cookieMeaning}`) {
         pop.remove()
      }
   };

   // Вызываем для каждого нового попапа проверку и удаление
   removePopup(alertwin, 'no', popup);
   removePopup(alertwin2, 'no2', popup2);
   removePopup(alertwin3, 'no3', popup3);

   // По клику на закрытие попапа добавляем cooklie на сутки и удаляем попап
   function hidePopup(closeClass, pop, cookieKey, cookieMeaning) {
      closeClass.click(() => {
         pop.removeClass('active').addClass('closes')

         if (pop.hasClass('closes')) {
            let date = new Date;
            date.setDate(date.getDate() + 1);
            document.cookie = `${cookieKey}=${cookieMeaning}; path=/; expires=` + date.toUTCString();

            let cookie = getCookie(`${cookieKey}`);
            if (cookie == `${cookieMeaning}`) pop.remove()
         }
      })
   }

   // Выводим нужный попап при попытке уйти с сайта
   $(document).mouseleave(function (e) {
      if (e.clientY < 10) {
         popup.addClass('active')

         hidePopup(popupCloses, popup, 'alertwin', 'no')

         if (popup2) {
            if (alertwin == "no") popup2.addClass('active')
            hidePopup(popupCloses2, popup2, 'alertwin2', 'no2')
         }

         if (popup3) {
            if (alertwin2 == "no2") popup3.addClass('active')
            hidePopup(popupCloses3, popup3, 'alertwin3', 'no3')
         }
      }
   });

   $('#steps-slider').slick({
      // dots: true,
      arrow: true,
      infinite: true,
      speed: 500,
      fade: true,
      cssEase: 'linear',
      adaptiveHeight: true,
   });

   const solutionPrev = () => `
      <p class="solution-preview__text">Do you want to increase your influence in other countries?</p>
      <h1 class="solution-preview__title">With Global Lead Solutions it’s easier as it can be!</h1>
      <ul class='solution-preview__text-wrapper'>
         <li class='solution-preview__text solution-preview__text_items'>Dedicated target</li>
         <li class='solution-preview__text solution-preview__text_items'>Motivated consumers</li>
      </ul>
      <a href="#" class="preview__btn btn solution-preview__btn"><span>Create a Free Buyer Account</span></a>
   `

   const prevTitle = $('.solution-preview__body');

   if ($(window).width() < 769) {
      prevTitle.html(solutionPrev())
   }

});

