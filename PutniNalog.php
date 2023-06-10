<?php

class PutniNalog
{
    public $rbr = "";
	public $polaziste = "";
	public $odrediste = "";
	public $svrha = "";
	public $datum_odlaska = "";
	public $broj_dana = "";
	public $odobreno = "";
	public $zaposlenici_imena;
	protected $zaposlenici;

	public function __construct($rbr, $polaziste, $odrediste, $svrha, $datum_odlaska, $broj_dana, $odobreno)
	{
        $this->rbr = $rbr;
		$this->polaziste = $polaziste;
		$this->odrediste = $odrediste;
		$this->svrha = $svrha;
		$this->datum_odlaska = $datum_odlaska;
		$this->broj_dana = $broj_dana;
		$this->zaposlenici = array();
		$this->zaposlenici_imena = array();
		$this->odobreno = $odobreno;
	}

	public function dodajZaposlenika($zaposlenik)
	{
        $this->zaposlenici[] = $zaposlenik->dohvatisifruZaposlenika();
    	array_push($this->zaposlenici_imena, $zaposlenik->dohvatiIme().' '.$zaposlenik->dohvatiPrezime());
	}
}
?>