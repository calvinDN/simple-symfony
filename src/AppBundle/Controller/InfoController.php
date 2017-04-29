<?php

namespace AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

class InfoController extends Controller
{
    /**
     * @Route("/info/number", name="info")
     */
    public function numberAction()
    {
        $number = mt_rand(0, 100);

        return $this->render('info/number.html.twig', array(
            'number' => $number,
        ));
    }
}