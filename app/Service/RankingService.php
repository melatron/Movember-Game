<?php
namespace Service;

use Persistence\RankingRepository;

class RankingService
{
	public function getRanking()
	{
		$rankingRepo = new RankingRepository();

		return $rankingRepo->getRanking();
	}
}

?>
