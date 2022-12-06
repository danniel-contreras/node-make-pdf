const numberWithCommas = (x) => {
  let number = Number(x).toFixed(2);
  var parts = number.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return Number(number) % 1 === 0 ? parts.join(".") + ".00" : parts.join(".");
};

const makeStyle = () => {
  return `
    <style>
    html { -webkit-print-color-adjust: exact; }
    .info{
        font-family:Arial, Helvetica, sans-serif;font-size:12px;
        line-height: 0.1;
        text-align:right;
    }
    .info-c{
        font-family:Arial, Helvetica, sans-serif;font-size:12px;
        line-height: 0.1;
    }
    .info-left{
        font-family:Arial, Helvetica, sans-serif;font-size:12px;
        line-height: 0.1;
        text-align:left;
    }
    .table-50{
        width:52px;
        font-size:8px;
        border:1px solid #0C85C6;
        color:white;
        background:#0C85C6;
        padding:5px 15px
    }
    .text-bottom{
        font-family:Arial, Helvetica, sans-serif;
        width:150px;
        font-size:12px
        line-height: 0.1;
    }
    .text-bottom-2{
        font-family:Arial, Helvetica, sans-serif;
        margin-left:125px;
        text-align:right;
        font-size:12px
        line-height: 0.1;
    }
    .info-bottom{
        display:flex;
        margin-top:-50px
        line-height: 0.1;
    }
    .info-table-bottom{
        font-family:Arial, Helvetica, sans-serif;
        font-size:12px;
        line-height: 1;
    }
    </style>
    `;
};

const makeFooter = (info) => {
  return `
  <div class="grid grid-cols-2 gap-9">
    <div>
    <p class="text-xs">
            <strong>Validez oferta:</strong> 
            <span>${info?.quantion?.offer_validity}</span>
        </p>
        <p class="text-xs">
            <strong>Condición de pago:</strong> 
            <span>${info?.quantion?.paycondition}</span>
        </p>
        <p class="text-xs">
            <strong>Tiempo de entrega:</strong> 
            <span>${info?.quantion?.delivery_time}</span>
        </p>
    </div>
    <div class="ml-32">
    <div class="flex">
        <p class="w-40 text-xs">SUMA:</p>
        <p class="text-right text-xs">${
          info?.quantion.currency_type === "Dolar" ? "$" : "₡"
        } ${numberWithCommas(info?.quantion?.subtotal)}</p>
    </div>
    <div class="flex">
        <p class="w-40 text-xs">DESCUENTO:</p>
        <p class="text-right text-xs">
        ${info?.quantion.currency_type === "Dolar" ? "$" : "₡"} ${
    info?.discount
  }
        </p>
    </div>
    <div class="flex">
        <p class="w-40 text-xs">SUMA IVA 1%:</p>
        <p class="text-right text-end text-xs">${
          info?.quantion.currency_type === "Dolar" ? "$" : "₡"
        } ${info?.iva1}</p>
    </div>
    <div class="flex">
        <p class="w-40 text-xs">SUMA IVA 13%:</p>
        <p class="text-right text-end text-xs">
        ${info?.quantion.currency_type === "Dolar" ? "$" : "₡"} ${info?.iva13}
        </p>
    </div>
    <div class="flex">
        <p class="w-40 text-xs">TOTAL:</p>
        <p class="text-right text-end text-xs">
        ${
          info?.quantion.currency_type === "Dolar" ? "$" : "₡"
        } ${numberWithCommas(info?.quantion?.total)}
        </p>
    </div>
    </div>
  </div>
  `;
};

const makeBody = (info) => {
  let result = `
    <div class="mt-8 w-full">
    <div class="flex mt-8 rounded">
    <table class="w-full text-sm border-[none]">
        <thead>
            <tr style="background-color:#0388b3">
            <th class="w-[250px] text-[12px] font-bold text-white py-2">Descripción</th>
            <th class="w-[100px] max-w-[100px] text-[12px] font-bold text-white py-2"></th>
            <th class="w-[100px] max-w-[100px] text-[12px] font-bold text-white py-2">Cant.</th>
            <th class="w-[100px] max-w-[100px] text-[12px] font-bold text-white py-2">Precio Unit.</th>
            <th class="w-[100px] max-w-[100px] text-[12px] font-bold text-white py-2">Descuento</th>
            <th class="w-[100px] max-w-[100px] text-[12px] font-bold text-white py-2">Ventas Totales</th>
            </tr>
        </thead>
        <tbody> `;

  info?.details.forEach((article) => {
    result += `
            <tr>
           <td class="border border-r-0 p-3">
           <p class="text-[11px]">${article.no} - ${article.itemName}</p>
           <p class="text-[11px]"><strong>Cabys:</strong> <span>${
             article.cabys !== 0 ? article.cabys : "No disponible"
           }</span></p>
           <p class="text-[11px]">
           <strong>Cod. Barras:</strong> <span>${
             article.barcode !== 0 ? article.barcode : "No disponible"
           }</span>
            </p>
           </td>
           <td class="border border-l-0 p-3">
           <img style="width:45px;margin-left:5px" src="${article.image}">
           </td>
           <td class="border p-3 text-right">
           <p class="text-[11px]">${article.quantity}</p>
           </td>
           <td class="border p-3 text-right">
           <p class="text-[11px]">${
             info?.quantion.currency_type === "Dolar" ? "$" : "₡"
           }${article.price}</p>
           </td>
           <td class="border p-3 text-right">
           <p class="text-[11px]">${article.discount}%</p>
           </td>
           <td class="border p-3 text-right"><p class="text-[11px]">${
             info?.quantion.currency_type === "Dolar" ? "$" : "₡"
           } ${article.total}</p></td>
            </tr>
            `;
  });

  result += `</tbody>
    </table>
    </div>
    </div>
    `;
  return result;
};

const makeHeader = (info) => {
  return `
  <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="p-8">
${makeStyle()}
    <div class="grid grid-cols-2 gap-9">
        <img width="100px" src="https://plexus.webapps-facela.com/cmod/assets/images/logo_gfacela.jpeg">
        <p style="font-size:18px;font-family:Arial, Helvetica, sans-serif;text-align:right;"><strong>Cotización Comercial C-${
          info?.numCotizacion
        }</strong>
        </p>
    </div>
    <div class="grid grid-cols-2 gap-9 mt-6">
    <div>
        <p class="text-xs">
            <strong>Fecha:</strong> 
            <span>${info?.quantion?.date}</span>
        </p>
        <p class="text-xs">
            <strong>Código cliente:</strong> 
            <span>${info?.quantion?.clientCode}</span>
        </p>
        <p class="text-xs">
            <strong>Cliente:</strong> 
            <span>${info?.quantion?.clientName}</span>
        </p>
        <p class="text-xs">
            <strong>Vendedor:</strong> 
            <span>${info?.quantion?.seller}</span>
        </p>
    </div>
    <div>
    <p class="text-xs text-right">
        <strong>Cédula Jurídica:</strong> 
        <span>3-101-644974</span>
    </p>
    <p class="text-xs text-right">
        <strong>Direccion:</strong> 
        <span>Heredia, Barreal, 200 mts Oeste de Cenada, en Bodegas Latam #5</span>
    </p>
    <p class="text-xs text-right">
        <strong>Tel:</strong> 
        <span>(+506) 2239-1853</span>
    </p>
</div>
</div>
${makeBody(info)}

${makeFooter(info)}
</body>
</html>
    
    `;
};

module.exports = {
  makeFooter,
  makeHeader,
};
