<?php
namespace Service;

use Persistence\UserRepository;
use Persistence\RankingRepository;

class UserService
{
	public function createUser(array $data)
	{
// 		$data['country'] = isset($data['location']['name']) ?
// 			explode(',', $data['location']['name'])[1] : array();
// 		$userRepo = new UserRepository();
// 		return $userRepo->upsert(
// 			array('id' => $data['id']),
// 			$data,
// 			array("upsert" => true)
// 		);
		$rankingRepo = new RankingRepository();

		return $rankingRepo->getRanking();
	}
}

?>
