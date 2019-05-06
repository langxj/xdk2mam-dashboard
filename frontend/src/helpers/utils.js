import generateRandomData from '../helpers/randomData.js'
import axios from 'axios'

export function getLast(number) {
  return new Promise(async (res, rej) => {
    try {
      const respDB = await axios.get(`http://localhost:8081/api/getLast/${number}`)
      const data = respDB.data

      res({ data })
    } catch (e) {
      rej(e)
    }
  })
}

export function putRandomData() {
  const randomData = generateRandomData()
  return new Promise(async (res, rej) => {
    try {
      const respDB = await axios.post('http://localhost:8081/api/putData/', randomData)
      const data = respDB.data

      res({ data })
    } catch (e) {
      rej(e)
    }
  })
}

export function formatDataForCharts(data) {
  let formattedData = [
    {
      sensorName: 'Weather',
      series: [
        {
          seriesName: 'Pressure',
          data: [],
        },
        {
          seriesName: 'Temperature',
          data: [],
        },
        {
          seriesName: 'Humidity',
          data: [],
        },
      ],
    },
    {
      sensorName: 'Accelerometer',
      series: [
        {
          seriesName: 'AccelerometerX',
          data: [],
        },
        {
          seriesName: 'AccelerometerY',
          data: [],
        },
        {
          seriesName: 'AccelerometerZ',
          data: [],
        },
      ],
    },
    {
      sensorName: 'Gyroscope',
      series: [
        {
          seriesName: 'GyroscopeX',
          data: [],
        },
        {
          seriesName: 'GyroscopeY',
          data: [],
        },
        {
          seriesName: 'GyroscopeZ',
          data: [],
        },
      ],
    },
    {
      sensorName: 'Inertial',
      series: [
        {
          seriesName: 'InertialX',
          data: [],
        },
        {
          seriesName: 'InertialY',
          data: [],
        },
        {
          seriesName: 'InertialZ',
          data: [],
        },
      ],
    },
    {
      sensorName: 'Light',
      series: [
        {
          seriesName: 'Millilux',
          data: [],
        },
      ],
    },
    {
      sensorName: 'Magnetometer',
      series: [
        {
          seriesName: 'MagnetometerX',
          data: [],
        },
        {
          seriesName: 'MagnetometerY',
          data: [],
        },
        {
          seriesName: 'MagnetometerZ',
          data: [],
        },
      ],
    },
  ]

  data.map((item, index) => {
    item.xdk2mam.map((sensor, j) => {
      if (j === 0 || j === 4) {
        // Weather or Ambient Light sensors
        sensor.data.map((datum, i) => {
          let dataEntry = {
            x: 0,
            y: 0,
          }
          dataEntry.x = parseInt(item.timestamp)
          dataEntry.y = parseInt(datum.value)
          formattedData[j].series[i].data.push(dataEntry)
        })
      } else {
        // Rest of the available sensors
        sensor.data.map((datum, i) => {
          let dataEntry = {
            x: 0,
            y: 0,
          }

          dataEntry.x = parseInt(item.timestamp)
          dataEntry.y = parseInt(datum.value)
          formattedData[j].series[i].data.push(dataEntry)
        })
      }
    })
  })

  return formattedData
}

export function formatDataForTable(data) {
  let formattedData = []

  data.map(item => {
    let itemData = []
    item.xdk2mam.map(sensor => {
      sensor.data.map((item, index) => {
        itemData.push(item.value)
      })
    })
    formattedData.push(itemData)
  })

  return formattedData
}
