<?php

class listaZaposlenika 
{
    protected $zaposlenici;
    
    public function __construct() 
    {
        $this->zaposlenici = [];
    }
    
    public function dodajZaposlenika(Zaposlenik $zaposlenik) 
    {
        $this->zaposlenici[] = $zaposlenik;
    }
    
    public function dohvatiZaposlenike() 
    {
        return $this->zaposlenici;
    }
}

$listaZaposlenika = new listaZaposlenika();
$listaZaposlenika->dodajZaposlenika(new Zaposlenik("Marko", "Markic", 30, "EMP001"));
$listaZaposlenika->dodajZaposlenika(new Zaposlenik("Ivan", "Ivanic", 25, "EMP002"));
$listaZaposlenika->dodajZaposlenika(new Zaposlenik("Karlo","Karlicic", 35, "EMP003"));

?>