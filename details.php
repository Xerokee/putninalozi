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

    $rbr = $oRow['r.br.'];
    $polaziste = $oRow['polaziste'];
    $odrediste = $oRow['odrediste'];
    $svrha = $oRow['svrha'];
    $datum_odlaska = $oRow['datum_odlaska'];
    $broj_dana = $oRow['broj_dana'];
    $odobreno = $oRow['odobreno'];

    $oPutniNalog = new PutniNalog($rbr, $polaziste, $odrediste, $svrha, $datum_odlaska, $broj_dana, $odobreno);

    $sQuery = "SELECT * FROM zaposlenici_nalog WHERE `rbrNaloga` = :rbr"; // SQL with parameters
    $oRecord = $oConnection->prepare($sQuery); 
    $oRecord->bindParam(":rbr", $rbr);
    $oRecord->execute();

    $oZaposlenici = array();

    while ($oRow = $oRecord->fetch(PDO::FETCH_BOTH)) 
    {
        $sifraZaposlenika = $oRow['sifraZaposlenika'];
        array_push($oZaposlenici, intval($sifraZaposlenika));
    }

    $ids = implode(",", $oZaposlenici); // Convert the array to a comma-separated string

    $sQuery = "SELECT * FROM zaposlenik WHERE `sifra` IN (:ids)"; // SQL with parameters
    $oRecord = $oConnection->prepare($sQuery); 
    $oRecord->bindParam(":ids", $ids);
    $oRecord->execute();

    $sifreOsoba = array();

    while ($oRow = $oRecord->fetch(PDO::FETCH_BOTH)) 
    {
        $sifraOsobe = $oRow['sifra_osobe'];
        array_push($sifreOsoba, $sifraOsobe);
    }

    $ids = implode(",", $sifreOsoba); // Convert the array to a comma-separated string

    $sQuery = "SELECT * FROM osoba WHERE `sifra` IN (:ids)"; // SQL with parameters
    $oRecord = $oConnection->prepare($sQuery); 
    $oRecord->bindParam(":ids", $ids);
    $oRecord->execute();

    $oOsobe = array();

    while ($oRow = $oRecord->fetch(PDO::FETCH_BOTH)) 
    {
        $sifraOsobe = $oRow['sifra'];
        $ime = $oRow['ime'];
        $prezime = $oRow['prezime'];
        $godiste = $oRow['godiste'];

        array_push($oOsobe, new Osoba ($ime, $prezime, $godiste));
    }

    $oPutniNalog->zaposlenici = $oOsobe;

    echo json_encode($oPutniNalog);
}