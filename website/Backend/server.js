require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const csv = require('csv-parser');
const { PythonShell } = require('python-shell');

const app = express();
app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

const aqiSchema = new mongoose.Schema({
  State: String,
  Station: String,
  Latitude: Number,
  Longitude: Number,
  Pincode: Number,
  'From Date': Date,
  'To Date': Date,
  PM2_5: Number,
  PM10: Number,
  NO: Number,
  NO2: Number,
  NOx: Number,
  NH3: Number,
  SO2: Number,
  CO: Number,
  Ozone: Number,
  Benzene: Number,
  Toluene: Number,
  'Eth-Benzene': Number,
  'MP-Xylene': Number,
  'O-Xylene': Number,
  RH: Number,
  WS: Number,
  WD: Number,
  SR: Number,
  BP: Number,
  VWS: Number,
  AOD: Number,
  RH_MERRA: Number,
  WS_MERRA: Number,
  T_MERRA: Number,
  Year: Number,
  Month: Number,
  Day: Number,
  Weekday: Number,
});
const AQI = mongoose.model('AQI', aqiSchema);

const pincodeSchema = new mongoose.Schema({
  Pincode: Number,
  PostOffice: String,
  State: String,
});
const Pincode = mongoose.model('Pincode', pincodeSchema);

const upload = multer({ dest: 'uploads/' });

const seedData = async () => {
  if ((await AQI.countDocuments()) === 0) {
    fs.createReadStream('uploads/final_ml_dataset.csv')
      .pipe(csv())
      .on('data', (data) => AQI.create({
        ...data,
        'From Date': new Date(data['From Date']),
        'To Date': new Date(data['To Date']),
        Pincode: Number(data.Pincode),
        Latitude: Number(data.Latitude),
        Longitude: Number(data.Longitude),
      }))
      .on('end', () => console.log('✅ Seeded AQI data'));
  }
  if ((await Pincode.countDocuments()) === 0) {
    fs.createReadStream('uploads/States_pincode.csv')
      .pipe(csv())
      .on('data', (data) => Pincode.create(data))
      .on('end', () => console.log('✅ Seeded Pincode data'));
  }
};
seedData();

app.get('/api/aqi/all', async (req, res) => {
  try {
    const data = await AQI.find().lean();
    res.json(data);
  } catch (err) {
    console.error('AQI fetch error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/aqi/:pincode', async (req, res) => {
  try {
    const data = await AQI.findOne({ Pincode: Number(req.params.pincode) }).lean();
    res.json(data || { error: 'No data found' });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/pincode/:pincode', async (req, res) => {
  try {
    const data = await Pincode.findOne({ Pincode: Number(req.params.pincode) }).lean();
    res.json(data || { error: 'Pincode not found' });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/upload', upload.single('file'), (req, res) => {
  const results = [];
  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on('data', (data) => results.push({
      ...data,
      'From Date': new Date(data['From Date']),
      'To Date': new Date(data['To Date']),
      Pincode: Number(data.Pincode),
      Latitude: Number(data.Latitude),
      Longitude: Number(data.Longitude),
    }))
    .on('end', async () => {
      try {
        await AQI.insertMany(results);
        fs.unlinkSync(req.file.path);
        res.json({ message: 'Data uploaded and saved!' });
      } catch (err) {
        res.status(500).json({ error: 'Upload failed' });
      }
    });
});

app.get('/api/predict/:pincode', async (req, res) => {
  try {
    const pincode = req.params.pincode;
    const aqiData = await AQI.findOne({ Pincode: Number(pincode) }).lean();
    if (!aqiData) return res.json({ error: 'No data for pincode' });

    const options = {
      scriptPath: __dirname,
      args: [JSON.stringify({ AOD: aqiData.AOD, RH: aqiData.RH, WS: aqiData.WS, T_MERRA: aqiData.T_MERRA })],
    };

    PythonShell.run('predict.py', options, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(JSON.parse(results[0]));
    });
  } catch (err) {
    res.status(500).json({ error: 'Prediction failed' });
  }
});

app.listen(process.env.PORT || 5000, () => console.log(`✅ Backend running on port ${process.env.PORT || 5000}`));