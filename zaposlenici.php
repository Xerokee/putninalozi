<?php
header('Content-type: text/json');
header('Content-type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');

include 'connection.php';
include 'Osoba.php';

if($_SERVER['REQUEST_METHOD'] === 'GET') {
    $sQuery = "SELECT * FROM zaposlenik"; // SQL with parameters
    $oRecord = $oConnection->prepare($sQuery); 
    $oRecord->execute();

    $sifreOsoba = array();

    while ($oRow = $oRecord->fetch(PDO::FETCH_BOTH)) 
    {
        $sifraOsobe = $oRow['sifra_osobe'];
        array_push($sifreOsoba, $sifraOsobe);
    }

    $ids = implode(",", $sifreOsoba); // Convert the array to a comma-separated string
    $ids = array_map('intval', explode(',', $ids));
    $placeholders = implode(',', array_fill(0, count($ids), '?'));

    $sQuery = "SELECT * FROM osoba WHERE sifra IN ($placeholders)"; // SQL with parameters
    $oRecord = $oConnection->prepare($sQuery); 

    foreach ($ids as $index => $id) {
        $oRecord->bindValue($index + 1, $id, PDO::PARAM_INT);
    }

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
    
    echo json_encode($oOsobe);
}