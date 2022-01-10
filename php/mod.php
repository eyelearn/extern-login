<?php

require_once './vendor/autoload.php';

use Firebase\JWT\JWT;

/**
 * In eine Class damit isoliert.
 */
class eyelearn {
  function __construct() {
    $this->PARTNER_ID = 42;
    // $key = 
    // echo $key;
    $this->PRIVATE_KEY = file_get_contents('private_unencrypted.pem');
  } 

  function genJWT($payload, string $type) {
    $now = time();

    // Wird von eyeLearn festgelegt
    $payload['iss'] = $this->PARTNER_ID;

    // Weitere Daten
    $payload['sub'] = $type;
    $payload['exp'] = $now + 600;
    $payload['iat'] = $now - 10;
    $payload['aud'] = 'eyesee.eyelearn.at';

    return JWT::encode($payload, $this->PRIVATE_KEY, 'RS512');
  }

  function handleURL($targetURL, $jwt) {
    if(strlen(parse_url($targetURL, PHP_URL_QUERY)) > 1) {
      return $targetURL ."&externaltoken=" . $jwt;
    }
    return $targetURL ."?externaltoken=" . $jwt;
  }

  public function register(
    string $nutzer_id,
    $extraData,
    string $targetURL = "https://eyesee.eyelearn.at/"
  ) {
    $extraData['nutzer_id'] = $nutzer_id;
    return $this->handleURL($targetURL, $this->genJWT($extraData, 'register'));
  }
  
  public function login(
    string $nutzer_id,
    string $targetURL = "https://eyesee.eyelearn.at/"
  ) {
    return $this->handleURL($targetURL, $this->genJWT(["nutzer_id" => $nutzer_id], 'login'));
  }
}
