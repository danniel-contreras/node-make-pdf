const html_to_pdf = require("html-pdf-node");
const { makeHeader } = require("../utils/utils");

const makePDF = (req, res) => {
  const body = req.body;
  let options = { format: "A4" };
  let file = {
    content: `
    ${makeHeader(body)}
    `,
  };
  try {
    html_to_pdf.generatePdf(file, options).then((pdfBuffer) => {
      return res.send({
        ok: true,
        message: "file created successfully",
        pdf: 'data:application/pdf;base64,' + pdfBuffer.toString("base64"),
      });
    });
  } catch (error) {
    return res.send({ ok: false, message: "failed to created PDF" });
  }
};

module.exports = {
  makePDF,
};
