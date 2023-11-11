<?php

class Osoba 
{
    public $sifra;
    public $ime;
    public $prezime;
    public $godiste;
    public $datumRodjenja;
    
    public function __construct($sifra, $ime, $prezime, $godiste, $datumRodjenja) 
    {
        $this->sifra = $sifra;
        $this->ime = $ime;
        $this->prezime = $prezime;
        $this->godiste = $godiste;
        $this->datumRodjenja = $datumRodjenja;
    }

    public function dohvatiSifru() 
    {
        return $this->sifra;
    }

    public function dohvatiIme() 
    {
        return $this->ime;
    }

    public function dohvatiPrezime() 
    {
        return $this->prezime;
    }
    
    public function dohvatiGodiste() 
    {
        return $this->godiste;
    }

    public function dohvatiDatumRodjenja() 
    {
        return $this->datumRodjenja;
    }
}

class Zaposlenik extends Osoba 
{
    public $sifraZaposlenika;
    
    public function __construct($sifra, $ime, $prezime, $godiste, $sifraZaposlenika, $datumRodjenja) 
    {
        parent::__construct($sifra, $ime, $prezime, $godiste, $datumRodjenja);
        $this->sifraZaposlenika = $sifraZaposlenika;
    }
    
    public function dohvatisifruZaposlenika() 
    {
        return $this->sifraZaposlenika;
    }

    function pronadiZaposlenikaPoSifri($zaposlenici, $sifra) 
    {
		foreach ($zaposlenici as $zaposlenik) 
        {
			if ($zaposlenik->dohvatisifruZaposlenika() === $sifra) 
            {
				return $zaposlenik;
			}
		}
		return null; // Zaposlenik nije pronaden
	}
}
