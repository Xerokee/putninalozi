<?php
header('Content-type: text/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, Access-Control-Allow-Methods");

include 'connection.php';
include 'PutniNalog.php';
include 'Osoba.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $data = json_decode(file_get_contents("php://input"), true);

  // $rbr = $data['rbr'];
  $sPolaziste = $data['polaziste'];
  $sOdrediste = $data["odrediste"];
  $sSvrha = $data['svrha'];
  $sDatumOdlaska = $data["datum_odlaska"];
  $sBrojDana = $data["broj_dana"];
  $zaposlenici = $data["zaposlenici"];
  $odobreno = $data["odobreno"];

  try
  {
    //   $sQuery = "INSERT INTO putninalog (polaziste, odrediste, svrha, datum_odlaska, broj_dana, odobreno, id)
    // VALUES (?, ?, ?, ?, ?, ?, ?)";
    //   $oRecord = $oConnection->prepare($sQuery);
    //   $result = $oRecord->execute([$sPolaziste, $sOdrediste, $sSvrha, $sDatumOdlaska, $sBrojDana, $odobreno, $rbr]);

      $sQuery = "INSERT INTO putninalog (polaziste, odrediste, svrha, datum_odlaska, broj_dana, odobreno)
      VALUES (?, ?, ?, ?, ?, ?)";
        $oRecord = $oConnection->prepare($sQuery);
        $result = $oRecord->execute([$sPolaziste, $sOdrediste, $sSvrha, $sDatumOdlaska, $sBrojDana, $odobreno]);
  
      if ($result) {
        // Retrieve the ID of the newly inserted row
        $insertedId = $oConnection->lastInsertId();

        $sQuery = "UPDATE putninalog SET id = :id WHERE `r.br.` = :id";
        $stmt = $oConnection->prepare($sQuery);
        $stmt->bindParam(':id', $insertedId);
        $stmt->execute();

        foreach ($zaposlenici as &$zaposlenik) {
          $podaciZaposelnika = explode(" ", $zaposlenik['zaposlenik']);

          $sQuery = "INSERT INTO zaposlenici_nalog (sifraZaposlenika, rbrNaloga, ime, prezime) VALUES (?, ?, ?, ?)";
          $oRecord = $oConnection->prepare($sQuery);
          $result = $oRecord->execute([intval($zaposlenik['id']), $insertedId, $podaciZaposelnika[0], $podaciZaposelnika[1]]);      
        }
      } else {
          // Handle the case where the query failed
          die("Error: Unable to insert data.");
      }
  } 
  catch (PDOException $pe) 
  {
      die("Greška: Nije moguće izvršiti $sQuery. " . $pe->getMessage());
  }

  // echo json_encode($data);

} else if ($_SERVER['REQUEST_METHOD'] === 'GET') {
  $sQuery = "SELECT * FROM osoba";
  $oRecord = $oConnection->query($sQuery);
  $oOsobe = array();

  while ($oRow = $oRecord->fetch(PDO::FETCH_BOTH)) 
  {
      $sifraOsobe = $oRow['sifra'];
      $ime = $oRow['ime'];
      $prezime = $oRow['prezime'];
      $godiste = $oRow['godiste'];

      $oOsobe[$sifraOsobe] = new Osoba ($sifraOsobe, $ime, $prezime, $godiste);
  }

  $sQuery = "SELECT * FROM zaposlenik";
  $oRecord = $oConnection->query($sQuery);
  $data = array();

  while ($oRow = $oRecord->fetch(PDO::FETCH_BOTH)) 
  {
      $sifraZaposlenika = $oRow['sifra'];
      $sifraOsobe = $oRow['sifra_osobe'];

      $data[$sifraZaposlenika] = new Zaposlenik ($oOsobe [$sifraOsobe]-> dohvatiSifru(), $oOsobe [$sifraOsobe]-> dohvatiIme(), $oOsobe [$sifraOsobe]-> dohvatiPrezime(), $oOsobe [$sifraOsobe]-> dohvatiGodiste(), $sifraZaposlenika);
  }

  echo json_encode($data);
}
