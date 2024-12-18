// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

// Pie Chart Example
var ctx = document.getElementById("myPieChart");
var myPieChart = new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: ["Direct", "Referral", "Social"],
    datasets: [{
      data: [55, 30, 15],
      backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc'],
      hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf'],
      hoverBorderColor: "rgba(234, 236, 244, 1)",
    }],
  },
  options: {
    maintainAspectRatio: false,
    tooltips: {
      backgroundColor: "rgb(255,255,255)",
      bodyFontColor: "#858796",
      borderColor: '#dddfeb',
      borderWidth: 1,
      xPadding: 15,
      yPadding: 15,
      displayColors: false,
      caretPadding: 10,
    },
    legend: {
      display: false
    },
    cutoutPercentage: 80,
  },
});
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
s
