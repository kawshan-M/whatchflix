document.addEventListener('DOMContentLoaded', function() {
  // Your JavaScript code here
  const button = document.querySelector('.click-button');
  const text = document.querySelector('.click-text');

  button.addEventListener('click', () => {
    text.style.display = 'block';
  });


  $(".custom-carousel").owlCarousel({
    autoWidth: true,
    loop: true });

    $(document).ready(function () {
    $(".custom-carousel .item").click(function () {
        $(".custom-carousel .item").not($(this)).removeClass("active");
        $(this).toggleClass("active");
    });
    });
    //# sourceURL=pen.js
});

        

