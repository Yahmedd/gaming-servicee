(function($) {
  "use strict"; // Start of use strict

  // Toggle the side navigation
  $("#sidebarToggle, #sidebarToggleTop").on('click', function(e) {
    $("body").toggleClass("sidebar-toggled");
    $(".sidebar").toggleClass("toggled");
    if ($(".sidebar").hasClass("toggled")) {
      $('.sidebar .collapse').collapse('hide');
    };
  });

  // Close any open menu accordions when window is resized below 768px
  $(window).resize(function() {
    if ($(window).width() < 768) {
      $('.sidebar .collapse').collapse('hide');
    };
    
    // Toggle the side navigation when window is resized below 480px
    if ($(window).width() < 480 && !$(".sidebar").hasClass("toggled")) {
      $("body").addClass("sidebar-toggled");
      $(".sidebar").addClass("toggled");
      $('.sidebar .collapse').collapse('hide');
    };
  });

  // Prevent the content wrapper from scrolling when the fixed side navigation hovered over
  $('body.fixed-nav .sidebar').on('mousewheel DOMMouseScroll wheel', function(e) {
    if ($(window).width() > 768) {
      var e0 = e.originalEvent,
        delta = e0.wheelDelta || -e0.detail;
      this.scrollTop += (delta < 0 ? 1 : -1) * 30;
      e.preventDefault();
    }
  });

  // Scroll to top button appear
  $(document).on('scroll', function() {
    var scrollDistance = $(this).scrollTop();
    if (scrollDistance > 100) {
      $('.scroll-to-top').fadeIn();
    } else {
      $('.scroll-to-top').fadeOut();
    }
  });

  // Smooth scrolling using jQuery easing
  $(document).on('click', 'a.scroll-to-top', function(e) {
    var $anchor = $(this);
    $('html, body').stop().animate({
      scrollTop: ($($anchor.attr('href')).offset().top)
    }, 1000, 'easeInOutExpo');
    e.preventDefault();
  });

})(jQuery); // End of use strict
// Tri des événements par date
document.getElementById('sortByDateBtn').addEventListener('click', function() {
  var sortIcon = document.querySelector('#sortByDateBtn i');
  var sortOrder = document.getElementById('sortOrderSelect').value;
  
  // Changer l'icône en fonction de l'ordre de tri sélectionné
  if (sortOrder === 'asc') {
    sortIcon.classList.remove('fa-sort-down');
    sortIcon.classList.add('fa-sort-up');
  } else {
    sortIcon.classList.remove('fa-sort-up');
    sortIcon.classList.add('fa-sort-down');
  }
  
  // Exécuter la fonction de tri en fonction de l'ordre sélectionné
  // Vous pouvez ajouter votre logique de tri ici
});

// Récupérer les événements à trier
var events = document.querySelectorAll('.event');

// Convertir les événements en tableau pour pouvoir les trier
var eventsArray = Array.from(events);

// Fonction de tri par date croissante
eventsArray.sort(function(a, b) {
  var dateA = new Date(a.dataset.date);
  var dateB = new Date(b.dataset.date);
  return dateA - dateB;
});

// Mettre à jour l'affichage des événements dans le DOM
var container = document.getElementById('eventsContainer');
container.innerHTML = '';
eventsArray.forEach(function(event) {
  container.appendChild(event);
});
const sortDescBtn = document.getElementById('sortDescBtn');

sortDescBtn.addEventListener('click', function () {
    const rows = Array.from(eventsTable.getElementsByTagName('tr'));

    // Supprimer la première ligne (en-têtes)
    rows.shift();

    rows.sort((rowA, rowB) => {
        const priceA = parseFloat(rowA.cells[4].textContent); // Index de la colonne de prix
        const priceB = parseFloat(rowB.cells[4].textContent);

        return priceB - priceA; // Tri décroissant
    });

    // Vider le tableau
    while (eventsTable.rows.length > 1) {
        eventsTable.deleteRow(1);
    }

    // Réinsérer les lignes triées
    rows.forEach(row => {
        eventsTable.appendChild(row);
    });
});
