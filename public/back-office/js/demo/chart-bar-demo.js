// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

function number_format(number, decimals, dec_point, thousands_sep) {
  // *     example: number_format(1234.56, 2, ',', ' ');
  // *     return: '1 234,56'
  number = (number + '').replace(',', '').replace(' ', '');
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    s = '',
    toFixedFix = function(n, prec) {
      var k = Math.pow(10, prec);
      return '' + Math.round(n * k) / k;
    };
  // Fix for IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
}

// Bar Chart Example
var ctx = document.getElementById("myBarChart");
var myBarChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [{
      label: "Revenue",
      backgroundColor: "#4e73df",
      hoverBackgroundColor: "#2e59d9",
      borderColor: "#4e73df",
      data: [4215, 5312, 6251, 7841, 9821, 14984],
    }],
  },
  options: {
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 10,
        right: 25,
        top: 25,
        bottom: 0
      }
    },
    scales: {
      xAxes: [{
        time: {
          unit: 'month'
        },
        gridLines: {
          display: false,
          drawBorder: false
        },
        ticks: {
          maxTicksLimit: 6
        },
        maxBarThickness: 25,
      }],
      yAxes: [{
        ticks: {
          min: 0,
          max: 15000,
          maxTicksLimit: 5,
          padding: 10,
          // Include a dollar sign in the ticks
          callback: function(value, index, values) {
            return '$' + number_format(value);
          }
        },
        gridLines: {
          color: "rgb(234, 236, 244)",
          zeroLineColor: "rgb(234, 236, 244)",
          drawBorder: false,
          borderDash: [2],
          zeroLineBorderDash: [2]
        }
      }],
    },
    legend: {
      display: false
    },
    tooltips: {
      titleMarginBottom: 10,
      titleFontColor: '#6e707e',
      titleFontSize: 14,
      backgroundColor: "rgb(255,255,255)",
      bodyFontColor: "#858796",
      borderColor: '#dddfeb',
      borderWidth: 1,
      xPadding: 15,
      yPadding: 15,
      displayColors: false,
      caretPadding: 10,
      callbacks: {
        label: function(tooltipItem, chart) {
          var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
          return datasetLabel + ': $' + number_format(tooltipItem.yLabel);
        }
      }
    },
  }
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

