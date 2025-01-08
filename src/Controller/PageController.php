<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class PageController extends AbstractController
{
    #[Route('/', name: 'app_homepage', methods: ['GET'])]
    public function index(): Response
    {
        return $this->render('page/index.html.twig');
    }

    #[Route('/contact', name: 'app_contact', methods: ['GET'])]
    public function contact(): Response
    {
        return $this->render('page/contact.html.twig');
    }

    #[Route('/product-details', name: 'app_product_details', methods: ['GET'])]
    public function productDetails(): Response
    {
        return $this->render('page/product-details.html.twig');
    }

    #[Route('/shop', name: 'app_shop', methods: ['GET'])]
    public function shop(): Response
    {
        return $this->render('page/shop.html.twig');
    }
}
