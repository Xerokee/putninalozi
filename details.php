<?php
header('Content-type: text/json');
header('Content-type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');

include 'connection.php';
include 'PutniNalog.php';
include 'Osoba.php';

if($_SERVER['REQUEST_METHOD'] === 'GET') {
    $rbr = $_GET['rbr'];

    $sQuery = "SELECT * FROM putninalog WHERE `r.br.` = :rbr"; // SQL with parameters
    $stmt = $oConnection->prepare($sQuery); 
    $stmt->bindParam(":rbr", $rbr);
    $stmt->execute();
    $oRow = $stmt->fetch(PDO::FETCH_BOTH); // get the mysqli result

    $id = $oRow['id'];
    $rbr = $oRow['r.br.'];
    $polaziste = $oRow['polaziste'];
    $odrediste = $oRow['odrediste'];
    $svrha = $oRow['svrha'];
    $datum_odlaska = $oRow['datum_odlaska'];
    $broj_dana = $oRow['broj_dana'];
    $odobreno = $oRow['odobreno'];

    $oPutniNalog = new PutniNalog($rbr, $polaziste, $odrediste, $svrha, $datum_odlaska, $broj_dana, $odobreno, $id);

    $sQuery = "SELECT * FROM zaposlenici_nalog WHERE `rbrNaloga` = :rbr"; // SQL with parameters
    $oRecord = $oConnection->prepare($sQuery); 
    $oRecord->bindParam(":rbr", $rbr);
    $oRecord->execute();

    $oZaposlenici = array();

    while ($oRow = $oRecord->fetch(PDO::FETCH_BOTH)) 
    {
        $sifraZaposlenika = $oRow['sifraZaposlenika'];
        $ime = $oRow['ime'];
        $prezime = $oRow['prezime'];

        array_push($oZaposlenici, (object) ['ime' => $ime, 'prezime' => $prezime]);
    }

    $oPutniNalog->zaposlenici = $oZaposlenici;

    echo json_encode($oPutniNalog);
}