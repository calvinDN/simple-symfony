<?php

namespace AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

class LeaderboardController extends Controller
{
    /**
     * @Route("/leaderboard", name="leaderboard")
     */
    public function numberAction()
    {
        return $this->render('leaderboard/index.html.twig');
    }
}