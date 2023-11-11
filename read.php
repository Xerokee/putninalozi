<?php
header('Content-type: text/json');
header('Content-type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');

include 'connection.php';
include 'PutniNalog.php';
include 'Osoba.php';

if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $data = json_decode(file_get_contents("php://input"), true);

    $rbr = $data['rbr'];
    $odobreno = $data['odobreno'];

    $sQuery = "UPDATE putninalog SET odobreno = :odobreno WHERE `r.br.` = :rbr";
    $stmt = $oConnection->prepare($sQuery);
    $stmt->bindParam(':odobreno', $odobreno);
    $stmt->bindParam(':rbr', $rbr);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        echo json_encode(array('message' => 'Odobrenje uspjesno'));
    } else {
        echo json_encode(array('message' => 'Neuspjesno odobrenje'));
    }
    exit();
} else if($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $rbr = $_GET['rbr'];

    $sQuery = "DELETE FROM zaposlenici_nalog WHERE `rbrNaloga` = :rbr";
    $stmt = $oConnection->prepare($sQuery);
    $stmt->bindParam(':rbr', $rbr);
    $stmt->execute();

    $sQuery = "DELETE FROM putninalog WHERE `r.br.` = :rbr";
    $stmt = $oConnection->prepare($sQuery);
    $stmt->bindParam(':rbr', $rbr);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        echo json_encode(array('message' => 'Uspjesno izbrisano'));
    } else {
        echo json_encode(array('message' => 'Neuspjesno brisanje'));
    }
    exit();
} else if($_SERVER['REQUEST_METHOD'] === 'GET') {
    $sQuery = "SELECT * FROM putninalog";
    $oRecord = $oConnection->query($sQuery);
    $oPutniNalozi = array();
    while ($oRow = $oRecord->fetch(PDO::FETCH_BOTH)) 
    {
        $rbr = $oRow['r.br.'];
        $id = $oRow['id'];
        $polaziste = $oRow['polaziste'];
        $odrediste = $oRow['odrediste'];
        $svrha = $oRow['svrha'];
        $datum_odlaska = $oRow['datum_odlaska'];
        $datum_dolaska = $oRow['datum_dolaska'];
        $broj_dana = $oRow['broj_dana'];
        $odobreno = $oRow['odobreno'];

        $oPutniNalog = new PutniNalog($rbr, $polaziste, $odrediste, $svrha, $datum_odlaska, $datum_dolaska, $broj_dana, $odobreno, $id);
        $oPutniNalozi[$rbr] = $oPutniNalog;
    }

    $sQuery = "SELECT * FROM osoba";
    $oRecord = $oConnection->query($sQuery);
    $oOsobe = array();

    while ($oRow = $oRecord->fetch(PDO::FETCH_BOTH)) 
    {
        $sifraOsobe = $oRow['sifra'];
        $ime = $oRow['ime'];
        $prezime = $oRow['prezime'];
        $godiste = $oRow['godiste'];
        $datumRodjenja = $oRow['datumRodjenja'];

        $oOsobe[$sifraOsobe] = new Osoba ($sifraOsobe, $ime, $prezime, $godiste, $datumRodjenja);
    }

    $sQuery = "SELECT * FROM zaposlenik";
    $oRecord = $oConnection->query($sQuery);
    $oZaposlenici = array();

    while ($oRow = $oRecord->fetch(PDO::FETCH_BOTH)) 
    {
        $sifraZaposlenika = $oRow['sifra'];
        $sifraOsobe = $oRow['sifra_osobe'];

        $oZaposlenici[$sifraZaposlenika] = new Zaposlenik ($oOsobe [$sifraOsobe]-> dohvatiSifru(), $oOsobe [$sifraOsobe]-> dohvatiIme(), $oOsobe [$sifraOsobe]-> dohvatiPrezime(),
        $oOsobe [$sifraOsobe]-> dohvatiGodiste(), $sifraZaposlenika, $oOsobe [$sifraOsobe]-> dohvatiDatumRodjenja());
    }

    $sQuery = "SELECT * FROM zaposlenici_nalog";
    $oRecord = $oConnection->query($sQuery);

    while ($oRow = $oRecord->fetch(PDO::FETCH_BOTH)) 
    {
        $sifraZaposlenika = $oRow['sifraZaposlenika'];
        $rbrNalog = $oRow['rbrNaloga'];

        $oZaposlenici[$sifraZaposlenika]->ime = $oRow['ime'];
        $oZaposlenici[$sifraZaposlenika]->prezime = $oRow['prezime'];

        $oPutniNalozi[$rbrNalog]-> dodajZaposlenika($oZaposlenici [$sifraZaposlenika]); 
    }

    echo json_encode($oPutniNalozi);
}

