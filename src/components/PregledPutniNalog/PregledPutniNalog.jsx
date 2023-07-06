import axios from "axios";
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PDFDocument, StandardFonts } from 'pdf-lib';
import { saveAs } from 'file-saver';
import NavigationJSX from "../Navigation/Navigation";

const PregledPutniNalog = () => {
    const { id } = useParams()
    const [nalog, setNalog] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:8012/VUV%20Putni%20Nalozi/putninalozi/details.php?rbr=${id}`)
        .then((res) => {
          setNalog(res.data)
        })
        .catch((error) => {
          console.log(error);
        });
    }, [id])

    const onPrint = async () => {
      // Create a new PDF document
      const pdfDoc = await PDFDocument.create();

      // Add a new page to the document
      const page = pdfDoc.addPage();

      // Get the standard font
      const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

      // Set the font and font size for the text
      page.setFont(helveticaFont);
      page.setFontSize(30);

      // Add some text to the page
      let redniBrojX = 220
      let redniBrojY = 600
      page.drawText(`Redni broj: ${nalog.rbr}`, {
        x: redniBrojX,
        y: redniBrojY,
      });

      let polazisteX = 180
      let polazisteY = 560
      page.drawText(`Polazište: ${nalog.polaziste}`, {
        x: polazisteX,
        y: polazisteY,
      });

      let odredisteX = 180
      let odredisteY = 520
      page.drawText(`Odredište: ${nalog.odrediste}`, {
        x: odredisteX,
        y: odredisteY,
      });

      let svrhaX = 70
      let svrhaY = 480
      page.drawText(`Svrha: ${nalog.svrha}`, {
        x: svrhaX,
        y: svrhaY,
      });

      let datumOdlaskaX = 120
      let datumOdlaskaY = 440
      page.drawText(`Datum odlaska: ${nalog.datum_odlaska}`, {
        x: datumOdlaskaX,
        y: datumOdlaskaY,
      });

      let brojDanaX = 230
      let brojDanaY = 400
      page.drawText(`Broj dana: ${nalog.broj_dana}`, {
        x: brojDanaX,
        y: brojDanaY,
      });

      let zaposleniciX = 230
      let zaposleniciY = 360
      page.drawText(`Zaposlenici:`, {
        x: zaposleniciX,
        y: zaposleniciY,
      });

      let zaposlenikX = 230
      let zaposlenikY = 320
      nalog.zaposlenici.forEach((zaposlenik) => {
        page.drawText(`${zaposlenik.ime} ${zaposlenik.prezime}`, {
          x: zaposlenikX,
          y: zaposlenikY,
        });

        zaposlenikY -= 40
      })

      let odobrenoX = 140
      let odobrenoY = 200
      page.drawText(`Odobreno: ${nalog.odobreno ? 'Odobreno je' : 'Nije Odobreno'}`, {
        x: odobrenoX,
        y: odobrenoY,
      });

      // Serialize the PDF document to bytes
      const pdfBytes = await pdfDoc.save();

      // Create a Blob from the PDF bytes
      const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });

      // Save the PDF Blob as a file with the name "document.pdf"
      saveAs(pdfBlob, `putni-nalog-${nalog.rbr}.pdf`);
    }

  return (
    <>
        <NavigationJSX/>
        {nalog &&
         <>
            <h1>Redni Broj: {nalog.rbr}</h1>
            <h1>Polazište: {nalog.polaziste}</h1>
            <h1>Odredište: {nalog.odrediste}</h1>
            <h1>Svrha: {nalog.svrha}</h1>
            <h1>Datum odlaska: {nalog.datum_odlaska}</h1>
            <h1>Broj dana: {nalog.broj_dana}</h1>
            <h1>Zaposlenici:</h1> {nalog.zaposlenici.map((zaposlenik, i) => {
              return <h1 key={i}>{zaposlenik.ime} {zaposlenik.prezime}</h1>
            })}
            <h1>Odobreno: {nalog.odobreno ? 'Odobreno je' : 'Nije Odobreno'}</h1>
            <button onClick={onPrint}>Print</button>
          </>
        }
    </>
  );
};

export default PregledPutniNalog;
