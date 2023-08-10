(function() {
  "use strict";

  /**
   * Animation on scroll (AOS)
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
    
  });

})()

$(document).click(function(e) {
  openFullscreen();
});

/**
   * Step 1
*/
$('.rdMenu').on('change',function(){
  menu = $(this).val();
  // console.log(menu);
  $('.step1').addClass('d-none');
  $('.step1').removeClass('d-grid');

  $('.step2').addClass('d-flex');
  $('.step2').removeClass('d-none');

  $('.back').addClass('d-flex');
  $('.back').removeClass('d-none');
});

/**
   * Step 2
*/
$('.rdSurvey').on('change', function(){
  let url = window.location.origin;
  let link = url+"/"+menu;
  rate = $(this).val();
  var post = {
    "layanan" : menu,
    "survey" : rate
  }
  $.ajax({
    type:"POST",
    url: link,
    data: post,
    dataType: 'JSON',
    success:function(data) {
      // let msg = data.message;
      // let stat = data.status;
      Swal.fire({
        icon: 'success',
        title: 'Berhasil !',
        html: 'Terima kasih atas masukannya',
        timer: 3000,
        showConfirmButton: false
      });
      setTimeout(() => {
        toStart();
      }, 3000);
    },
    error:function(data){
      Swal.fire({
        icon: 'error',
        title: 'Gagal !',
        html: 'Masukan Anda Gagal di Proses',
        timer: 3000,
        showConfirmButton: false
      });
      setTimeout(() => {
        toStart();
      }, 3000);
    }
  });
});

/**
  * Back To Start
*/
function toStart() {

  $('.step1').addClass('d-grid');
  $('.step1').removeClass('d-none');
  $('.rdMenu').prop('checked', false);

  $('.step2').addClass('d-none');
  $('.step2').removeClass('d-flex');
  $('.rdSurvey').prop('checked', false);

  $('.back').addClass('d-none');
  $('.back').removeClass('d-flex');
  
}

/**
   * Back
*/
$('.back').on('click',function(){

  $('.step1').addClass('d-grid');
  $('.step1').removeClass('d-none');

  $('.step2').addClass('d-none');
  $('.step2').removeClass('d-flex');

  $('.back').addClass('d-none');
  $('.back').removeClass('d-flex');
});

/**
  * Full Screen
*/
var elem = document.documentElement;

function openFullscreen() {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }
}
