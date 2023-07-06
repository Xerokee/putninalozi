<?php

class Osoba 
{
    public $sifra;
    public $ime;
    public $prezime;
    public $godiste;
    
    public function __construct($sifra, $ime, $prezime, $godiste) 
    {
        $this->sifra = $sifra;
        $this->ime = $ime;
        $this->prezime = $prezime;
        $this->godiste = $godiste;
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
}

class Zaposlenik extends Osoba 
{
    public $sifraZaposlenika;
    
    public function __construct($sifra, $ime, $prezime, $godiste, $sifraZaposlenika) 
    {
        parent::__construct($sifra, $ime, $prezime, $godiste);
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
