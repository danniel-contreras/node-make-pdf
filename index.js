// const { makeHeader } = require("./utils/utils");
const { router } = require("./routes");
const cors = require("cors");

var express = require("express");
var app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://10.0.5.3",
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(router);
app.listen(3001, () => {
  console.log("app is running in port 3001");
});

// respond with "hello world" when a GET request is made to the homepage

// let options = { format: "A4" };
// // Example of options with args //
// // let options = { format: 'A4', args: ['--no-sandbox', '--disable-setuid-sandbox'] };

// let file = {
//   content: `

// <style>
// .title{
//     font-size:16px;
//     color:red;
// }
// .table-header{
//     display:flex;
//     flex-direction:row;
//     width:100%;
// }
// .w-15-p{
//     width:90px:
// }

// .w-40-p{
//     width:200px;
// }

// </style>
// ${makeHeader({ numCotizacion: 123456 })}
// <h1 class='title'>Welcome to html-pdf-node</h1>
// <img src="https://sv.facela.com/img/logo.58f6fc0d.png" >
// <div class='table-header'>
// <p class="w-40-p">Descripcion</p>
// <p class="w-15-p">Cant.</p>
// <p class="w-15-p">Prec. Unit</p>
// <p class="w-15-p">Descuento</p>
// <p class="w-15-p">Total</p>
// </div>

// `,
// };
// // or //
// //let file = { url: "https://example.com" };
// html_to_pdf.generatePdf(file, options).then((pdfBuffer) => {
//   console.log("PDF Buffer:-", pdfBuffer.toString("base64"));
// });
