import React from "react";
import Html2Pdf from 'html2pdf.js';

export default function App() {
  return (
    <div>
      <h1>Html2Pdf</h1>
      <button onClick={generate}>Generate PDF!</button>
    </div>
  );

  function generate() {

    let htmlStr = `<h2>HTML Edit&ouml;r Kullanımı</h2>
    <ul>
    <li>Metni <strong>istediğiniz </strong><em>gibi</em> <span style="background-color: #f1c40f;">formatlayabilirsiniz.</span></li>
    <li><a href="https://google.com/" target="_blank" rel="noopener">Link </a>verebilirsiniz.</li>
    <li>Tablo ekleyip d&uuml;zenleyebilirsiniz.</li>
    <li>Resim ekleyebilir, boyutlarını değiştirebilirsiniz.</li>
    <li><img src="data:image/png;base64,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" style="width: 254px;" class="fr-fic fr-dib"></li>
    </ul>
    <table style="border-collapse: collapse; width: 59.6567%; height: 44px;" border="1">
    <tbody>
    <tr style="height: 22px;">
    <td style="width: 33.3333%; height: 22px;">Kolon-1</td>
    <td style="width: 33.3333%; height: 22px;">Kolon-2</td>
    <td style="width: 33.3333%;">Kolon-3</td>
    </tr>
    <tr style="height: 22px;">
    <td style="width: 33.3333%; height: 22px;">1</td>
    <td style="width: 33.3333%; height: 22px;">2</td>
    <td style="width: 33.3333%; height: 22px;">3</td>
    </tr>
    <tr>
    <td style="width: 33.3333%;">a</td>
    <td style="width: 33.3333%;">b</td>
    <td style="width: 33.3333%;">c</td>
    </tr>
    </tbody>
    </table>`;

    downloadPdf('myfile.pdf', htmlStr);

  }

  function downloadPdf(fileName, htmlContent) {
    var options = {
      margin: 10,
      filename: fileName,
      image: { type: 'jpeg', quality: 0.95 },
      enableLinks: true,
      html2canvas: { scale: 2, logging: true, dpi: 192, letterRendering: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    var exporter = new Html2Pdf(htmlContent, options);
  };


  function componentWillMount() {
    const script = document.createElement("script");
    script.src = "https://raw.githack.com/eKoopmans/html2pdf/master/dist/html2pdf.bundle.js";
    script.async = true;
    document.body.appendChild(script);
  }
}

