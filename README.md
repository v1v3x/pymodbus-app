# Modbus Connector Portal

A modern web application for managing and monitoring Modbus devices, built with React, TypeScript, and Electron.

## Features

- Connection Management: Create and manage Modbus TCP/RTU connections
- Real-time Monitoring: View live data from Modbus registers
- Data Logging: Record and analyze Modbus data over time
- Theme Support: Light and dark mode with system preference detection
- Cross-platform: Runs on Windows, macOS, and Linux

## Prerequisites

- Node.js 16.x or later
- Python 3.8 or later
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/modbus-connector-portal.git
cd modbus-connector-portal
```

2. Install Python dependencies:
```bash
pip install -r requirements.txt
```

3. Install Node.js dependencies:
```bash
cd modbus-connector-portal-main
npm install
```

## Development

Start the development server:
```bash
npm run dev
```

## Building

### For macOS:
```bash
./build_macos.sh
```

### For all platforms:
  ```bash
npm run build
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with React, TypeScript, and Vite
- Uses Tailwind CSS for styling
- Electron for desktop application support
- PyModbus for Modbus communication
