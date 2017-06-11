<?php

namespace AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

class CognitoController extends Controller
{
    /**
     * @Route("/cognito/confirm", name="cognito-confirm")
     */
    public function confirm()
    {
        return $this->render('cognito/confirm.html.twig');
    }

    /**
     * @Route("/cognito/signin", name="cognito-signin")
     */
    public function signin()
    {
        return $this->render('cognito/signin.html.twig');
    }

    /**
     * @Route("/cognito/signup", name="cognito-signup")
     */
    public function signup()
    {
        return $this->render('cognito/signup.html.twig');
    }
}