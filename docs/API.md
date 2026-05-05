# API Documentation

## Base URL
```
https://api.aqi-prediction.com/v1
```

## Authentication
Currently, no authentication is required for public endpoints.

## Rate Limiting
- **Standard**: 100 requests per minute
- **Burst**: 10 requests per second

## Endpoints

### Get Current AQI
```http
GET /aqi/current?city={city_name}
```

**Parameters:**
- `city` (required): City name (e.g., "Delhi", "Mumbai")

**Response:**
```json
{
  "city": "Delhi",
  "timestamp": "2025-01-15T10:30:00Z",
  "aqi": 156,
  "pm25": 89.2,
  "pm10": 134.5,
  "no2": 45.3,
  "so2": 12.8,
  "o3": 78.4,
  "recommendation": "Unhealthy - Avoid outdoor activities",
  "coordinates": {
    "lat": 28.6139,
    "lng": 77.2090
  }
}
```

### Get Forecast
```http
GET /aqi/forecast?city={city_name}&days={1-7}
```

**Parameters:**
- `city` (required): City name
- `days` (optional): Number of days to forecast (default: 3, max: 7)

**Response:**
```json
{
  "city": "Delhi",
  "forecast": [
    {
      "date": "2025-01-16",
      "aqi": 145,
      "confidence": 0.92
    },
    {
      "date": "2025-01-17",
      "aqi": 138,
      "confidence": 0.89
    }
  ]
}
```

### Get Historical Data
```http
GET /aqi/historical?city={city_name}&start={date}&end={date}
```

**Parameters:**
- `city` (required): City name
- `start` (required): Start date (YYYY-MM-DD)
- `end` (required): End date (YYYY-MM-DD)

**Response:**
```json
{
  "city": "Delhi",
  "data": [
    {
      "date": "2025-01-01",
      "aqi": 156,
      "pm25": 89.2,
      "pm10": 134.5
    }
  ]
}
```

### Get Cities List
```http
GET /cities
```

**Response:**
```json
{
  "cities": [
    {
      "name": "Delhi",
      "state": "Delhi",
      "coordinates": {
        "lat": 28.6139,
        "lng": 77.2090
      }
    }
  ]
}
```

### Get Health Recommendations
```http
GET /recommendations?aqi={aqi_value}
```

**Parameters:**
- `aqi` (required): AQI value

**Response:**
```json
{
  "aqi": 156,
  "category": "Unhealthy",
  "recommendations": [
    "Avoid outdoor activities",
    "Keep windows closed",
    "Use air purifiers"
  ]
}
```

## Error Handling

### Error Response Format
```json
{
  "error": {
    "code": 400,
    "message": "Invalid city name",
    "details": "City 'InvalidCity' not found"
  }
}
```

### Error Codes
- `400`: Bad Request
- `404`: Not Found
- `429`: Rate Limit Exceeded
- `500`: Internal Server Error

## SDK Examples

### Python
```python
import requests

response = requests.get('https://api.aqi-prediction.com/v1/aqi/current?city=Delhi')
data = response.json()
print(f"Current AQI: {data['aqi']}")
```

### JavaScript
```javascript
const response = await fetch('https://api.aqi-prediction.com/v1/aqi/current?city=Delhi');
const data = await response.json();
console.log(`Current AQI: ${data.aqi}`);
```

### cURL
```bash
curl "https://api.aqi-prediction.com/v1/aqi/current?city=Delhi"
```

## WebSocket API

### Real-time Updates
Connect to: `wss://api.aqi-prediction.com/v1/realtime`

### Message Format
```json
{
  "type": "aqi_update",
  "city": "Delhi",
  "aqi": 156,
  "timestamp": "2025-01-15T10:30:00Z"
}
```

## Rate Limits

| Plan | Requests/minute | WebSocket connections |
|------|-----------------|----------------------|
| Free | 100 | 1 |
| Pro | 1000 | 10 |
| Enterprise | 10000 | 100 |

## Support
For API support, contact: api-support@aqi-prediction.com
