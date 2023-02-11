const Records = require('./records.model');
const csv=require('csvtojson')
const upload = async (req, res) => {
    const {file} = req;
    /* Mètodo post para agregar el archivo */
    try {
      /* Convierto el archivo en array */
      const array = await csv().fromFile(file.path)
      /* Limito la carga a 1000 para optimizar los recursos */
      const chunk = 1000;
      /* recorro el array limitandolo a 1000 */
      for (let i =0; i < array.length; i+= chunk){
        const ch = array.slice(i, i + chunk )
        await Records.insertMany(ch,{ordered: false} )
        
      }
      return res.send("archivo cargado")
      
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
