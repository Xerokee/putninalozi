<?php

class Osoba 
{
    protected $ime;
    protected $prezime;
    protected $godiste;
    
    public function __construct($ime, $prezime, $godiste) 
    {
        $this->ime = $ime;
        $this->prezime = $prezime;
        $this->godiste = $godiste;
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
    protected $sifraZaposlenika;
    
    public function __construct($ime, $prezime, $godiste, $sifraZaposlenika) 
    {
        parent::__construct($ime, $prezime, $godiste);
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
