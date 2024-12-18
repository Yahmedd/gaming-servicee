<?php

namespace App\Form;

use App\Entity\Service;
use App\Entity\Game;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Doctrine\ORM\EntityManagerInterface;  // Add this import

class ServiceType extends AbstractType
{
    private EntityManagerInterface $entityManager;  // Declare the entity manager

    // Inject EntityManagerInterface through the constructor
    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('name')
            ->add('description')
            ->add('price')
            ->add('available')
            ->add('createdAt', null, [
                'widget' => 'single_text',
            ])
            ->add('game', ChoiceType::class, [
                'choices' => $this->getGamesChoices(),  // Get games choices
                'choice_label' => function (?Game $game) {
                    return $game ? $game->getTitle() : ''; // Show the title of the game
                },
                'placeholder' => 'Select a game',  // Placeholder for the game field
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Service::class,
        ]);
    }

    // Helper method to fetch all games for the choice field
    private function getGamesChoices(): array
    {
        $games = $this->entityManager->getRepository(Game::class)->findAll();  // Use injected entity manager
        $choices = [];
        foreach ($games as $game) {
            $choices[$game->getTitle()] = $game; // Key: title, Value: game object
        }
        return $choices;
    }
}
