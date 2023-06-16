import axios from "axios";
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PDFDocument, StandardFonts } from 'pdf-lib';
import { saveAs } from 'file-saver';

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
      page.setFontSize(16);

      // Add some text to the page
      page.drawText(`Redni broj: ${nalog.rbr}`, {
        x: 30,
        y: 800
      });

      page.drawText(`Polazište: ${nalog.polaziste}`, {
        x: 30,
        y: 780
      });

      page.drawText(`Svrha: ${nalog.svrha}`, {
        x: 30,
        y: 760
      });

      page.drawText(`Datum odlaska: ${nalog.datum_odlaska}`, {
        x: 30,
        y: 740
      });

      page.drawText(`Broj dana: ${nalog.broj_dana}`, {
        x: 30,
        y: 720
      });

      page.drawText(`Zaposlenici:`, {
        x: 30,
        y: 700
      });

      let zaposlenikY = 680

      nalog.zaposlenici.forEach((zaposlenik) => {
        page.drawText(`${zaposlenik.ime} ${zaposlenik.prezime}`, {
          x: 30,
          y: zaposlenikY
        });

        zaposlenikY -= 20
      })

      page.drawText(`Odobreno: ${nalog.odobreno ? 'Odobreno je' : 'Nije Odobreno'}`, {
        x: 30,
        y: 600
      });

      // Serialize the PDF document to bytes
      const pdfBytes = await pdfDoc.save();

      // Create a Blob from the PDF bytes
      const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });

      // Save the PDF Blob as a file with the name "document.pdf"
      saveAs(pdfBlob, `radni-nalog-${nalog.rbr}.pdf`);
    }

  return (
    <div>
        {nalog &&
         <div>
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
          </div>
        }
    </div>
  );
};

export default PregledPutniNalog;
