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

   // Burger menu 

   const burger = $('.icon-menu')

   let allMobailNavClasses = $('.icon-menu, #navigation, .menu__item, .menu__wrapper');

   burger.on('click', function () {
      allMobailNavClasses.toggleClass('active');
   });

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
      dots: true,
      arrow: true,
      infinite: true,
      speed: 500,
      fade: true,
      cssEase: 'linear',
      adaptiveHeight: true,
      infinite: false,
   });

});

