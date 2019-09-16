const IncomingForm = require('formidable').IncomingForm;
const fs = require('fs');
const gedcom = require('parse-gedcom');

module.exports = function upload(req, res) {
  const form = new IncomingForm();
  let jsonResult;
  form.on('file', (field, file) => {
    const readStream = fs.createReadStream(file.path);
    require('fs').createReadStream(file.path).on('data', function (chunk) {
      const textResult = chunk.toString();
      jsonResult = JSON.stringify(gedcom.parse(textResult), null, 2);
      console.log("returning file");
      return res.send(jsonResult);
		});
  });
  form.parse(req);
};
