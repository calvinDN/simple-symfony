<?php
/**
 * Created by PhpStorm.
 * User: cnichols
 * Date: 2017-05-21
 * Time: 9:15 PM
 */

namespace AppBundle\Controller;

use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\View\View;
use GuzzleHttp\Client;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use FOS\RestBundle\Controller\Annotations as Rest;
use AppBundle\Entity\User;

class AwsUserController extends FOSRestController
{
    /**
     * @Rest\Get("/api/aws/user")
     */
    public function getAction(Request $request)
    {
//        $client = new Client(['base_uri' => 'http://bx0gzozrm0.execute-api.us-east-1.amazonaws.com/v1/']);
//        $response = $client->request('GET', 'user');

        $curl = curl_init();
        curl_setopt($curl, CURLOPT_URL, 'https://bx0gzozrm0.execute-api.us-east-1.amazonaws.com/v1/user');
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        $result = curl_exec($curl);
        curl_close($curl);
        return json_decode($result, true);
    }


}