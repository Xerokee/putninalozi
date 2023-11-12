<?php
header('Content-type: text/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, Access-Control-Allow-Methods");

include 'connection.php';
include 'Osoba.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);

    $ime = $data['ime'];
    $prezime = $data["prezime"];
    $godiste = $data['godiste'];
    $datumRodjenja = $data['datumRodjenja'];

    try
    {
        $sQuery = "INSERT INTO osoba (ime, prezime, godiste, datumRodjenja, vrstaZaposlenika, vjezba) VALUES (?, ?, ?, ?)";
        $oRecord = $oConnection->prepare($sQuery);
        $result = $oRecord->execute([$ime, $prezime, $godiste, $datumRodjenja]);

        if($result) {
            // Retrieve the ID of the newly inserted row
            $insertedId = $oConnection->lastInsertId();

            $sQuery = "INSERT INTO zaposlenik (sifra_osobe) VALUES (?)";
            $oRecord = $oConnection->prepare($sQuery);
            $result = $oRecord->execute([$insertedId]);
        }
    } 
    catch (PDOException $pe) 
    {
        die("Greška: Nije moguće izvršiti $sQuery. " . $pe->getMessage());
    }
  
    echo json_encode($data);
} else if($_SERVER['REQUEST_METHOD'] === 'GET') {
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
        $datumRodjenja = $oRow['datumRodjenja'];

        array_push($oOsobe, new Osoba ($sifraOsobe, $ime, $prezime, $godiste, $datumRodjenja));
    }
    
    echo json_encode($oOsobe);
} else if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $data = json_decode(file_get_contents("php://input"), true);

    $sifraOsobe = $data['sifra'];
    $ime = $data['ime'];
    $prezime = $data['prezime'];
    $godiste = $data['godiste'];
    $datumRodjenja = $data['datumRodjenja'];
    $vjezba = $data['vjezba'];

    $sQuery = "UPDATE osoba SET ime = :ime, prezime = :prezime, godiste = :godiste, datumRodjenja = :datumRodjenja WHERE `sifra` = :sifra";
    $stmt = $oConnection->prepare($sQuery);
    $stmt->bindParam(':ime', $ime);
    $stmt->bindParam(':prezime', $prezime);
    $stmt->bindParam(':godiste', $godiste);
    $stmt->bindParam(':datumRodjenja', $datumRodjenja);
    $stmt->bindParam(':sifra', $sifraOsobe);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        echo json_encode(array('message' => 'Ažuriranje uspjesno'));
    } else {
        echo json_encode(array('message' => 'Neuspjesno ažuriranje'));
    }
    exit();
}