## Getting Started
Firstly you need cd into the Frontend directory.

Next, run the development server:

```bash
npm run start
```
Using this command it will run both the front end and the backend by using concurrently. 

Then Open [http://localhost:3000/dashboard](http://localhost:3000/dashboard) with your browser to view the dashboard

## API Endpoints
Line Chart Data: http://localhost:8000/api/line-chart-data/
Bar Chart Data: http://localhost:8000/api/bar-chart-data/
Pie Chart Data: http://localhost:8000/api/pie-chart-data/
Candlestick Data: http://localhost:8000/api/candlestick-data/

## Libraries and Tools
Frontend:

React
Tailwind CSS
Chart.js
react-charjs-2
ApexCharts
react-apexcharts

Backend:

Django
Django REST Framework
Other Tools:

Next.js
npm

## Approach and Though Process

### Frontend
React Components: The frontend is built using React to create a responsive user interface. The CandlestickChart component is created using react-apexcharts for data visualization.

Initially the candlestick chart was going to be made with Chartjs-financial, but due to some compatibility issues I opted it out for apex charts. 

Styling: Tailwind CSS is used for styling to make the display of the dashboard more user friendly.

State Management: The frontend components fetch data from the backend API and update their state accordingly. This approach ensures the charts are updated with the latest data.

### Backend
Django Setup: The backend is built using Django and Django REST Framework to create a scalable API for serving chart data.

Database: The application uses PostgreSQL (or another database of your choice) to store and manage data.

API Endpoints: The backend provides endpoints for fetching data required by the frontend charts.

### Data Flow
Data Fetching: The frontend sends HTTP requests to the backend API endpoints to retrieve data for various charts.