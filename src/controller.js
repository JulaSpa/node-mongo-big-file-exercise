const Records = require('./records.model');
const csv=require('csvtojson')
const upload = async (req, res) => {
    const {file} = req;
    /* Mètodo post para agregar el archivo */
    try {
       /* Convierto csv a json */
       await csv().fromFile(file.path)
       /* Recorro el json y lo inserto en la base de datos*/
        .then(e=>Records.insertMany(e)) 
        return res.status(201).json({
            msg: 'Status 201',
          });
      } catch (error) {
        return res.status(500).json({
          msg: 'Status 500: internal server error',
          error: true,
        });
      }
};

const list = async (_, res) => {
    try {
        const data = await Records
            .find({})
            .limit(10)
            .lean();
        
        return res.status(200).json(data);
    } catch (err) {
        return res.status(500).json(err);
    }
};

module.exports = {
    upload,
    list,
};
