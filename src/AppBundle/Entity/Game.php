<?php
/**
 * Created by PhpStorm.
 * User: cnichols
 * Date: 2017-05-08
 * Time: 9:59 PM
 */

namespace AppBundle\Entity;


use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table(name="game")
 */
class Game
{
    /**
     * @ORM\Column(type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @ORM\Column(type="date")
     */
    private $date;

    /**
     * @ORM\Column(type="integer", nullable=false)
     * @ORM\OneToOne(targetEntity="User")
     */
    private $winnerId;

    /**
     * @ORM\Column(type="integer", nullable=false)
     * @ORM\OneToOne(targetEntity="User")
     */
    private $loserId;

    /**
     * @ORM\Column(type="integer", nullable=false, options={"default" : 0})
     */
    private $playerOneScore;

    /**
     * @ORM\Column(type="integer", nullable=false, options={"default" : 0})
     */
    private $playerTwoScore;

    /**
     * @ORM\Column(type="integer", nullable=false, options={"default" : 0})
     */
    private $playerOneOriginalElo;

    /**
     * @ORM\Column(type="integer", nullable=false, options={"default" : 0})
     */
    private $playerTwoOriginalElo;

    /**
     * @ORM\Column(type="integer", nullable=false, options={"default" : 0})
     */
    private $playerOneUpdatedElo;

    /**
     * @ORM\Column(type="integer", nullable=false, options={"default" : 0})
     */
    private $playerTwoUpdatedElo;
}