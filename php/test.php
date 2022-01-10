<?php
require_once './vendor/autoload.php';

include './mod.php';

$c = new eyelearn();

echo $c->login('abc');
echo "\n";
echo $c->register('abc', [
  "vorname" => "Max",
  "nachname" => "Mustermann",
  "strasse" => "Musterweg 42",
  "plz" => "00000",
  "ort" => "Beispielhausen",
  "land" => "Österreich"
]);
