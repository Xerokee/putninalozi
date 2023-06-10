<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, Access-Control-Allow-Methods");

include_once 'connection.php';
include 'PutniNalog.php';

$data = json_decode(file_get_contents("php://input"), true);
echo $data;

$sPolaziste = $data['polaziste'];
$sOdrediste = $data["odrediste"];
$sSvrha = $data['svrha'];
$sDatumOdlaska = $data["datum_odlaska"];
$sBrojDana = $data["broj_dana"];

try
{
    $sQuery = "INSERT INTO putninalog (polaziste, odrediste, svrha, datum_odlaska, broj_dana)
  VALUES (?, ?, ?, ?, ?)";
    $oRecord = $oConnection->prepare($sQuery);
    $oRecord->execute([$sPolaziste, $sOdrediste, $sSvrha, $sDatumOdlaska, $sBrojDana]);
} 
catch (PDOException $pe) 
{
    die("Greška: Nije moguće izvršiti $sQuery. " . $pe->getMessage());
}
echo json_encode($data);
