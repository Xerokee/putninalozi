import axios from "axios";
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PDFDocument, StandardFonts } from 'pdf-lib';
import { saveAs } from 'file-saver';
import NavigationJSX from "../Navigation/Navigation";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import './PregledPutniNalog.css'
import travel_wallpaper from '../../assets/travel_wallpaper.jpeg';


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

    const addMargin = (page) => {
      // Add some text to the page
      page.drawText('________________________________________________________', {
        x: 18,
        y: 830,
      });

      page.drawText('|', {
        x: 15,
        y: 814,
      });

      page.drawText('|', {
        x: 15,
        y: 798,
      });

      page.drawText('|', {
        x: 15,
        y: 782,
      });

      page.drawText('|', {
        x: 15,
        y: 766,
      });

      page.drawText('|', {
        x: 15,
        y: 750,
      });

      page.drawText('|', {
        x: 15,
        y: 734,
      });

      page.drawText('|', {
        x: 15,
        y: 718,
      });

      page.drawText('|', {
        x: 15,
        y: 702,
      });

      page.drawText('|', {
        x: 15,
        y: 686,
      });

      page.drawText('|', {
        x: 15,
        y: 670,
      });

      page.drawText('|', {
        x: 15,
        y: 654,
      });

      page.drawText('|', {
        x: 15,
        y: 638,
      });

      page.drawText('|', {
        x: 15,
        y: 622,
      });

      page.drawText('|', {
        x: 15,
        y: 606,
      });

      page.drawText('|', {
        x: 15,
        y: 590,
      });

      page.drawText('|', {
        x: 15,
        y: 574,
      });

      page.drawText('|', {
        x: 15,
        y: 558,
      });

      page.drawText('|', {
        x: 15,
        y: 542,
      });

      page.drawText('|', {
        x: 15,
        y: 526,
      });

      page.drawText('|', {
        x: 15,
        y: 510,
      });

      page.drawText('|', {
        x: 15,
        y: 494,
      });

      page.drawText('|', {
        x: 15,
        y: 478,
      });

      page.drawText('|', {
        x: 15,
        y: 462,
      });

      page.drawText('|', {
        x: 15,
        y: 446,
      });

      page.drawText('|', {
        x: 15,
        y: 430,
      });

      page.drawText('|', {
        x: 15,
        y: 414,
      });

      page.drawText('|', {
        x: 15,
        y: 398,
      });

      page.drawText('|', {
        x: 15,
        y: 382,
      });

      page.drawText('|', {
        x: 15,
        y: 366,
      });

      page.drawText('|', {
        x: 15,
        y: 350,
      });

      page.drawText('|', {
        x: 15,
        y: 334,
      });

      page.drawText('|', {
        x: 15,
        y: 318,
      });

      page.drawText('|', {
        x: 15,
        y: 302,
      });

      page.drawText('|', {
        x: 15,
        y: 286,
      });

      page.drawText('|', {
        x: 15,
        y: 270,
      });

      page.drawText('|', {
        x: 15,
        y: 254,
      });

      page.drawText('|', {
        x: 15,
        y: 238,
      });

      page.drawText('|', {
        x: 15,
        y: 222,
      });

      page.drawText('|', {
        x: 15,
        y: 206,
      });

      page.drawText('|', {
        x: 15,
        y: 190,
      });

      page.drawText('|', {
        x: 15,
        y: 174,
      });

      page.drawText('|', {
        x: 15,
        y: 158,
      });

      page.drawText('|', {
        x: 15,
        y: 158,
      });

      page.drawText('|', {
        x: 15,
        y: 142,
      });

      page.drawText('|', {
        x: 15,
        y: 126,
      });

      page.drawText('|', {
        x: 15,
        y: 110,
      });

      page.drawText('|', {
        x: 15,
        y: 94,
      });

      page.drawText('|', {
        x: 15,
        y: 78,
      });

      page.drawText('|', {
        x: 15,
        y: 62,
      });

      page.drawText('|', {
        x: 15,
        y: 46,
      });

      page.drawText('|', {
        x: 15,
        y: 30,
      });

      page.drawText('________________________________________________________', {
        x: 18,
        y: 30,
      });

      page.drawText('|', {
        x: 577,
        y: 814,
      });

      page.drawText('|', {
        x: 577,
        y: 798,
      });

      page.drawText('|', {
        x: 577,
        y: 782,
      });

      page.drawText('|', {
        x: 577,
        y: 766,
      });

      page.drawText('|', {
        x: 577,
        y: 750,
      });

      page.drawText('|', {
        x: 577,
        y: 734,
      });

      page.drawText('|', {
        x: 577,
        y: 718,
      });

      page.drawText('|', {
        x: 577,
        y: 702,
      });

      page.drawText('|', {
        x: 577,
        y: 686,
      });

      page.drawText('|', {
        x: 577,
        y: 670,
      });

      page.drawText('|', {
        x: 577,
        y: 654,
      });

      page.drawText('|', {
        x: 577,
        y: 638,
      });

      page.drawText('|', {
        x: 577,
        y: 622,
      });

      page.drawText('|', {
        x: 577,
        y: 606,
      });

      page.drawText('|', {
        x: 577,
        y: 590,
      });

      page.drawText('|', {
        x: 577,
        y: 574,
      });

      page.drawText('|', {
        x: 577,
        y: 558,
      });

      page.drawText('|', {
        x: 577,
        y: 542,
      });

      page.drawText('|', {
        x: 577,
        y: 526,
      });

      page.drawText('|', {
        x: 577,
        y: 510,
      });

      page.drawText('|', {
        x: 577,
        y: 494,
      });

      page.drawText('|', {
        x: 577,
        y: 478,
      });

      page.drawText('|', {
        x: 577,
        y: 462,
      });

      page.drawText('|', {
        x: 577,
        y: 446,
      });

      page.drawText('|', {
        x: 577,
        y: 430,
      });

      page.drawText('|', {
        x: 577,
        y: 414,
      });

      page.drawText('|', {
        x: 577,
        y: 398,
      });

      page.drawText('|', {
        x: 577,
        y: 382,
      });

      page.drawText('|', {
        x: 577,
        y: 366,
      });

      page.drawText('|', {
        x: 577,
        y: 350,
      });

      page.drawText('|', {
        x: 577,
        y: 334,
      });

      page.drawText('|', {
        x: 577,
        y: 318,
      });

      page.drawText('|', {
        x: 577,
        y: 302,
      });

      page.drawText('|', {
        x: 577,
        y: 286,
      });

      page.drawText('|', {
        x: 577,
        y: 270,
      });

      page.drawText('|', {
        x: 577,
        y: 254,
      });

      page.drawText('|', {
        x: 577,
        y: 238,
      });

      page.drawText('|', {
        x: 577,
        y: 222,
      });

      page.drawText('|', {
        x: 577,
        y: 206,
      });

      page.drawText('|', {
        x: 577,
        y: 190,
      });

      page.drawText('|', {
        x: 577,
        y: 174,
      });

      page.drawText('|', {
        x: 577,
        y: 158,
      });

      page.drawText('|', {
        x: 577,
        y: 158,
      });

      page.drawText('|', {
        x: 577,
        y: 142,
      });

      page.drawText('|', {
        x: 577,
        y: 126,
      });

      page.drawText('|', {
        x: 577,
        y: 110,
      });

      page.drawText('|', {
        x: 577,
        y: 94,
      });

      page.drawText('|', {
        x: 577,
        y: 78,
      });

      page.drawText('|', {
        x: 577,
        y: 62,
      });

      page.drawText('|', {
        x: 577,
        y: 46,
      });

      page.drawText('|', {
        x: 577,
        y: 30,
      });
    }

    const onPrint = async () => {
      // Split the date string into an array [year, month, day]
      const dateParts = nalog.datum_odlaska.split("-");

      // Extract the year and day from the array
      const year = dateParts[0];
      const month = dateParts[1];
      const day = dateParts[2];

      // Split the date string into an array [year, month, day]
      const dateParts2 = nalog.datum_dolaska.split("-");

      // Extract the year and day from the array
      const year2 = dateParts2[0];
      const month2 = dateParts2[1];
      const day2 = dateParts2[2];
      
      // Create a new PDF document
      const pdfDoc = await PDFDocument.create();

      // Add a new page to the document
      const page1 = pdfDoc.addPage();
      const page2 = pdfDoc.addPage();

      // Get the standard font
      const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const helveticaBoldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);    

      // Set the font and font size for the text
      [page1, page2].forEach((page) => {
        page.setFont(helveticaFont);
        page.setFontSize(18);
        addMargin(page)
      });

      page1.drawText('_________________', {
        x: 50,
        y: 800,
      });

      const employeeNames = nalog.zaposlenici.map((employee) => `${employee.ime} ${employee.prezime}`).join(', ');

      page1.drawText(employeeNames, {
        x: 50,
        y: 800,
        size: 12
      });

      page1.drawText('(naziv pravne ili fizicke osobe)', {
        x: 54,
        y: 785,
        size: 12.
      });

      page1.drawText(nalog.rbr.toString(), {
        x: 170,
        y: 757,
        size: 12
      });

      page1.drawText('Broj putnog naloga: _____', {
        x: 50,
        y: 757,
        size: 12
      });

      page1.drawText(`${month} mjesecu                       ${day}. ${year}`, {
        x: 317,
        y: 757,
        size: 12
      });

      page1.drawText('U __________________, dana __________ godine.', {
        x: 280,
        y: 757,
        size: 12
      });

      page1.setFont(helveticaBoldFont); // Bold font      
      page1.drawText('PUTNI NALOG', {
        x: 230,
        y: 680,
      });
      page1.setFont(helveticaFont);

      page1.drawText('Kojima se odreduje da _______________________, OIB: ____________________', {
        x: 50,
        y: 600,
        size: 12
      });

      page1.drawText('(ime i prezime osobe koja putuje)', {
        x: 163,
        y: 586,
        size: 12
      });

      page1.drawText(nalog.polaziste, {
        x: 260,
        y: 550,
        size: 12
      });

      page1.drawText('na radnom mjestu: ___________________________________________________', {
        x: 50,
        y: 550,
        size: 12
      });

      page1.drawText(`${day}.${month}.${year}`, {
        x: 260,
        y: 520,
        size: 12
      });

      page1.drawText('službeno otputuje dana: ______________________________________________', {
        x: 50,
        y: 520,
        size: 12
      });

      page1.drawText(nalog.odrediste, {
        x: 260,
        y: 490,
        size: 12
      });

      page1.drawText('na službeno putovanje u: ______________________________________________', {
        x: 50,
        y: 490,
        size: 12
      });

      page1.drawText('(mjesto u koje osoba putuje)', {
        x: 250,
        y: 476,
        size: 12
      });

      page1.drawText(nalog.svrha, {
        x: 260,
        y: 450,
        size: 12
      });

      page1.drawText('sa zadatkom: ________________________________________________________', {
        x: 50,
        y: 450,
        size: 12
      });

      page1.drawText(nalog.broj_dana.toString(), {
        x: 200,
        y: 420,
        size: 12
      });

      page1.drawText('Putovanje može trajati: ________ dana (_________________________________)', {
        x: 50,
        y: 420,
        size: 12
      });

      page1.drawText('(slovima)', {
        x: 350,
        y: 406,
        size: 12
      });

      page1.drawText('Za Prijevoz se moze koristiti: _________________________________________,', {
        x: 50,
        y: 380,
        size: 12
      });

      page1.drawText('marke: ____________________________, registracijskih oznaka: _________________', {
        x: 50,
        y: 350,
        size: 12
      });

      page1.drawText('Za službeno putovanje odobrava se isplata predujma radi podmirenja putnih troškova u iznosu od:', {
        x: 50,
        y: 320,
        size: 12
      });

      page1.drawText('____________________ kuna.', {
        x: 50,
        y: 300,
        size: 12
      });

      page1.drawText(nalog.broj_dana.toString(), {
        x: 115,
        y: 280,
        size: 12
      });

      page1.drawText('U roku ___________ dana od povratka sa službenog putovanja potrebno je izvršiti obracun ovog,', {
        x: 50,
        y: 280, 
        size: 12
      });

      page1.drawText('putovanja te u pisanom obliku predati izvjesce o obavljenom zadatku.', {
        x: 50,
        y: 260,
        size: 12
      });

      page1.drawText('M.P.', {
        x: 300,
        y: 150,
        size: 12
      });

      page1.drawText('______________________', {
        x: 430,
        y: 150,
        size: 10
      });

      page1.drawText('Potpis ovlaštene osobe', {
        x: 430,
        y: 130,
        size: 12
      });

      page2.setFont(helveticaBoldFont); // Bold font      
      page2.drawText('OBRACUN PUTNIH TROŠKOVA', {
        x: 150,
        y: 770,
      });
      page2.setFont(helveticaFont);

      page2.drawText(nalog.odrediste, {
        x: 260,
        y: 720,
        size: 12
      });

      page2.drawText('Za obavljeno službeno putovanje u: ______________________', {
        x: 50,
        y: 720,
        size: 12
      });

      page2.drawText(`${day}.${month}.${year}`, {
        x: 260,
        y: 700,
        size: 12
      });

      page2.drawText('Na putovanje sam krenuo/la dana: ______________________', {
        x: 50,
        y: 700,
        size: 12
      });

      page2.drawText(`${day2}.${month2}.${year2}`, {
        x: 260,
        y: 680,
        size: 12
      });

      page2.drawText('Vratio/la sam se dana: ________________________________', {
        x: 50,
        y: 680,
        size: 12
      });

      const table1StartX = 50;  // The table starts at x = 50
      const table1StartY = page2.getHeight() - 200;  // The table starts at y = page height - 100

      // Draw table1 on page2
      page2.drawLine({
        start: { x: table1StartX, y: table1StartY },
        end: { x: table1StartX + 500, y: table1StartY },
        thickness: 1
      });

      page2.drawLine({
        start: { x: table1StartX, y: table1StartY },
        end: { x: table1StartX, y: table1StartY - 157 },
        thickness: 1
      });

      page2.drawLine({
        start: { x: table1StartX, y: 485 },
        end: { x: table1StartX + 500, y: table1StartY - 157 },
        thickness: 1
      });

      page2.drawLine({
        start: { x: table1StartX + 500, y: table1StartY },
        end: { x: table1StartX + 500, y: table1StartY - 157 },
        thickness: 1
      });

      page2.drawLine({
        start: { x: table1StartX, y: table1StartY - 20 },
        end: { x: table1StartX + 500, y: table1StartY - 20 },
        thickness: 1
      });

      page2.drawLine({
        start: { x: table1StartX, y: table1StartY - 40 },
        end: { x: table1StartX + 500, y: table1StartY - 40 },
        thickness: 1
      });

      page2.drawLine({
        start: { x: table1StartX, y: table1StartY - 60 },
        end: { x: table1StartX + 500, y: table1StartY - 60 },
        thickness: 1
      });

      page2.drawLine({
        start: { x: table1StartX, y: table1StartY - 80 },
        end: { x: table1StartX + 500, y: table1StartY - 80 },
        thickness: 1
      });

      page2.drawLine({
        start: { x: table1StartX, y: table1StartY - 100 },
        end: { x: table1StartX + 500, y: table1StartY - 100 },
        thickness: 1
      });

      page2.drawLine({
        start: { x: table1StartX, y: table1StartY - 120 },
        end: { x: table1StartX + 500, y: table1StartY - 120 },
        thickness: 1
      });

      page2.drawLine({
        start: { x: table1StartX, y: table1StartY - 140 },
        end: { x: table1StartX + 500, y: table1StartY - 140 },
        thickness: 1
      });

      page2.drawLine({
        start: { x: table1StartX + 160, y: table1StartY - 157 },
        end: { x: table1StartX + 160, y: table1StartY - 20 },
        thickness: 1
      });

      page2.drawLine({
        start: { x: table1StartX + 360, y: table1StartY - 157 },
        end: { x: table1StartX + 360, y: table1StartY - 20 },
        thickness: 1
      });

      page2.drawLine({
        start: { x: table1StartX + 80, y: table1StartY - 140 },
        end: { x: table1StartX + 80, y: table1StartY - 60 },
        thickness: 1
      });

      page2.setFont(helveticaBoldFont); // Bold font      
      page2.drawText("1. OBRACUN PRIJEVOZNIH TROŠKOVA", {
        x: table1StartX + 170,
        y: table1StartY - 15,
        size: 9
      });
      page2.setFont(helveticaFont);

      page2.drawText("Pocetno stanje brojila ____________", {
        x: table1StartX + 5,
        y: table1StartY - 35,
        size: 9
      });

      page2.drawText("Završno stanje brojila __________________", {
        x: table1StartX + 170,
        y: table1StartY - 35,
        size: 9
      });

      page2.drawText("RELACIJA", {
        x: table1StartX + 60,
        y: table1StartY - 55,
        size: 9
      });

      page2.drawText("Prijedeni km", {
        x: table1StartX + 240,
        y: table1StartY - 55,
        size: 9
      });

      page2.drawText("Svota za prijevoz", {
        x: table1StartX + 390,
        y: table1StartY - 55,
        size: 9
      });

      page2.drawText("Od", {
        x: table1StartX + 35,
        y: table1StartY - 75,
        size: 9
      });

      page2.drawText("Do", {
        x: table1StartX + 115,
        y: table1StartY - 75,
        size: 9
      });

      page2.setFont(helveticaBoldFont); // Bold font      
      page2.drawText("UKUPNO", {
        x: table1StartX + 60,
        y: table1StartY - 152,
        size: 12
      });
      page2.setFont(helveticaFont);

      // Draw table2 on page2
      const table2StartX = 50;  // The table starts at x = 50
      const table2StartY = page2.getHeight() - 400;  // The table starts at y = page height - 100
      const table2rowHeight = 20;
      const table2colWidth = 250;
      const table2numRows = 9;
      const table2numCols = 2;

      // Draw horizontal lines
      for (let i = 0; i <= table2numRows; i++) {
        const y = table2StartY - i * table2rowHeight;
        page2.drawLine({
          start: { x: table2StartX, y: y },
          end: { x: table2StartX + table2numCols * table2colWidth, y: y },
          thickness: 1
        });
      }

      // Draw vertical lines
      for (let i = 0; i <= table2numCols; i++) {
        const x = table2StartX + i * table2colWidth;

        if (i === 1) {
          page2.drawLine({
            start: { x: x * 1.2, y: table2StartY },
            end: { x: x * 1.2, y: table2StartY - table2numRows * table2rowHeight },
            thickness: 1
          });          
        } else {
          page2.drawLine({
            start: { x: x, y: table2StartY },
            end: { x: x, y: table2StartY - table2numRows * table2rowHeight },
            thickness: 1
          });
        }
      }

      // Add table text
      for (let row = 0; row < table2numRows; row++) {
        for (let col = 0; col < table2numCols; col++) {
          let x = table2StartX + col * table2colWidth + 5;  // Adding a 5-unit padding
          let y = table2StartY - row * table2rowHeight - 15;  // Adjusting for text height within cell
          let cellText = ''

          if (row === 0 && col === 0) {
            x = x + 80
            page2.setFont(helveticaBoldFont); // Bold font
            cellText = '2. OBRACUN OSTALIH TROŠKOVA'
          } else if (row === 0 && col === 1) {
            x = x + 140
            cellText = 'SVOTA'
          } else if (row === 5 && col === 0) {
            x = x + 80
            cellText = 'UKUPNO OSTALI TROŠKOVI'
          } else if (row === 6 && col === 0) {
            x = x + 30
            page2.setFont(helveticaBoldFont);
            cellText = '3. UKUPNO NASTALI TROŠKOVI NA SLUŽBENOM PUTU'
          } else if (row === 7 && col === 0) {
            x = x + 70
            cellText = '4. Umanjenje za isplaceni predujam'
          } else if (row === 8 && col === 0) {
            x = x + 90
            cellText = '5. Za isplatu-vracanje svote'
          }

          page2.drawText(cellText, {
            x: x,
            y: y,
            size: 9
          });
          page2.setFont(helveticaFont);
        }
      }

      page2.setFont(helveticaBoldFont); // Bold font
      page2.drawText("6. IZVJEŠCE SA SLUŽBENOG PUTA", {
        x: 50,
        y: 230,
        size: 12
      });
      page2.setFont(helveticaFont);

      page2.drawText("____________________________________________________________________", {
        x: 50,
        y: 200,
        size: 9
      });

      page2.drawText("Potvrdujem da je službeno putovanje prema ovom nalogu obavljeno te da se isplata moze obaviti.", {
        x: 50,
        y: 170,
        size: 9
      });

      page2.drawText(`${month} mjesecu                                             ${day}`, {
        x: 80,
        y: 150, 
        size: 10
      });

      page2.drawText("U __________________, dana ____________________________.", {
        x: 50,
        y: 150,
        size: 10
      });

      page2.drawText("___________________", {
        x: 50,
        y: 100,
        size: 10
      });

      page2.drawText("Podnositelj obracuna", {
        x: 60,
        y: 80,
        size: 9
      });

      page2.drawText("___________________", {
        x: 240,
        y: 100,
        size: 10
      });

      page2.drawText("Pregledao likvidator", {
        x: 250,
        y: 80,
        size: 9
      });

      page2.drawText("___________________", {
        x: 440,
        y: 100,
        size: 10
      });

      page2.drawText("Nalogodavac isplate", {
        x: 450,
        y: 80,
        size: 9
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
        <div className="warrant-container">
          <Card className="warrant-card">
            <Card.Header className="mt-2"><strong>Putni nalog {nalog.rbr}</strong></Card.Header>
            <Card.Img 
              variant="top" 
              src={travel_wallpaper} 
              className="warrant-img"
            />
            <Card.Body>
              <Card.Subtitle className="mb-2 text-bold">
                {nalog.polaziste} - {nalog.odrediste}
              </Card.Subtitle>
              <Card.Text><strong>Svrha:</strong> {nalog.svrha}</Card.Text>
              <Card.Text><strong>Datum odlaska:</strong> {nalog.datum_odlaska}</Card.Text>
              <Card.Text><strong>Datum dolaska:</strong> {nalog.datum_dolaska}</Card.Text>
              <Card.Text><strong>Broj dana:</strong> {nalog.broj_dana}</Card.Text>
              <Card.Text><strong>Odobreno:</strong> {nalog.odobreno ? 'Da' : 'Ne'}</Card.Text>
              
              <ListGroup variant="flush">
                <ListGroup.Item><strong>Zaposlenici:</strong></ListGroup.Item>
                {nalog.zaposlenici.map((employee, i) => (
                  <ListGroup.Item key={i}>{employee.ime} {employee.prezime}</ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
            <Button className="mt-2" variant="primary" onClick={onPrint}>Ispis</Button>
          </Card>
        </div>
      </>
      }
      </>
    )
};

export default PregledPutniNalog;
