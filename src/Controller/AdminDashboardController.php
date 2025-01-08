<?php

namespace App\Controller;

use App\Repository\GameRepository;
use App\Repository\ReservationRepository;
use App\Repository\ServiceRepository;
use App\Repository\CategorieRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class AdminDashboardController extends AbstractController
{
    #[Route('/admin', name: 'admin_dashboard')]
    public function index(GameRepository $gameRepository, ReservationRepository $reservationRepository, ServiceRepository $serviceRepository ,CategorieRepository $categorieRepository, EntityManagerInterface $entityManager)
    {
        // Get the stats for games
        $gamesStats = $this->getGamesStats($gameRepository);

        // Get the stats for reservations
        $reservationsStats = $this->getReservationsStats($reservationRepository);

        // Get the stats for services
        $servicesStats = $this->getServicesStats($serviceRepository);

        // Get the stats for categories
        $categoriesStats = $this->getCategoriesStats($categorieRepository); // Fetch category stats

        return $this->render('admin_dashboard/index.html.twig', [
            'games_stats' => $gamesStats,
            'reservations_stats' => $reservationsStats,
            'services_stats' => $servicesStats,
            'categories_stats' => $categoriesStats,
        ]);
    }

    // Fetch statistics for games (e.g., count of games by category)
    private function getGamesStats(GameRepository $gameRepository)
    {
        // Count the number of games in each category
        $query = $gameRepository->createQueryBuilder('g')
            ->select('g.category, COUNT(g.id) as count')
            ->groupBy('g.category')
            ->getQuery();

        $results = $query->getResult();

        $labels = [];
        $data = [];
        foreach ($results as $result) {
            $labels[] = $result['category'];
            $data[] = $result['count'];
        }

        return ['labels' => $labels, 'data' => $data];
    }

    // Fetch statistics for reservations (e.g., total reservations by week or month)
    private function getReservationsStats(ReservationRepository $reservationRepository)
    {
        // Query to get all reservations with their dates
        $query = $reservationRepository->createQueryBuilder('r')
            ->select('COUNT(r.id) as count, r.reservationDate')
            ->groupBy('r.reservationDate')
            ->getQuery();

        $results = $query->getResult();

        // Initialize an array to store the monthly counts
        $monthCounts = [];

        // Process the results to extract the month and count
        foreach ($results as $result) {
            // Extract the month from the reservation date
            $month = $result['reservationDate']->format('m');  // Format the date to get the month

            // Initialize the month count if it doesn't exist yet
            if (!isset($monthCounts[$month])) {
                $monthCounts[$month] = 0;
            }

            // Increment the count for the corresponding month
            $monthCounts[$month] += $result['count'];
        }

        // Prepare the labels and data for the chart
        $labels = [];
        $data = [];
        foreach ($monthCounts as $month => $count) {
            $labels[] = 'Month ' . $month;
            $data[] = $count;
        }

        return ['labels' => $labels, 'data' => $data];
    }


    // Fetch statistics for services (e.g., number of reservations per service)
    private function getServicesStats(ServiceRepository $serviceRepository)
    {
        // Count reservations for each service
        $query = $serviceRepository->createQueryBuilder('s')
            ->select('s.name, COUNT(r.id) as count')
            ->leftJoin('s.reservations', 'r')
            ->groupBy('s.id')
            ->getQuery();

        $results = $query->getResult();

        $labels = [];
        $data = [];
        foreach ($results as $result) {
            $labels[] = $result['name'];
            $data[] = $result['count'];
        }

        return ['labels' => $labels, 'data' => $data];
    }
    // Add this method to your AdminDashboardController
    private function getCategoriesStats(CategorieRepository $categorieRepository)
    {
        // Count the number of categories
        $query = $categorieRepository->createQueryBuilder('c')
            ->select('c.name, COUNT(c.id) as count')
            ->groupBy('c.id')
            ->getQuery();

        $results = $query->getResult();

        $labels = [];
        $data = [];
        foreach ($results as $result) {
            $labels[] = $result['name'];
            $data[] = $result['count'];
        }

        return ['labels' => $labels, 'data' => $data];
    }

    #[Route('/admin/services', name: 'admin_service_index')]
    public function services(): Response
    {
        // Logic to fetch services would go here
        return $this->render('admin_dashboard/services/index.html.twig', [
            // Pass any necessary data to the view
        ]);
    }
    #[Route('/admin/reservations', name: 'admin_reservation_index')]
    public function reservations(): Response
    {
        // Logic to fetch reservations would go here
        return $this->render('admin_dashboard/reservations/index.html.twig', [
            // Pass any necessary data to the view
        ]);
    }
    #[Route('/admin/categories', name: 'admin_categories')]
    public function categories(CategorieRepository $categorieRepository): Response
    {
        return $this->render('admin_dashboard/categorie/index.html.twig', [
            'categories' => $categorieRepository->findAll(),
        ]);
    }
}
