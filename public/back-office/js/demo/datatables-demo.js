// Call the dataTables jQuery plugin
$(document).ready(function() {
  $('#dataTable').DataTable();
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

