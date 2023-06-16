# EcoTrack Backend

This is the backend component of EcoTrack, a revolutionary web application that helps individuals reduce their carbon footprint and embrace sustainable practices. The backend is responsible for handling API requests, interacting with the database, and implementing the core logic of the application.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- TiDB Cloud
- Other dependencies (listed in package.json)

## Getting Started

### Prerequisites

- Node.js (v19.7.0)
- MongoDB
- TiDB Cloud account (for database connection)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Project-Eco-Track/Eco-Track-Server/.git
```

2. Navigate to the project directory:
```bash
cd Eco-Track-Server
```

3. Install dependencies:
```bash
npm install
```

### Configuration:

1. Create a .env file in the root of the backend directory.

2. Add the following environment variables to the .env file:
```
# for tiDB.js
TIDB_HOST=your-tidb-host
TIDB_PORT=your-tidb-port
TIDB_USER=your-tidb-username
TIDB_PASSWORD=your-tidb-password
TIDB_DATABASE='test'

# for mongoDB.js
URI='mongodb+srv://<username>:<password>@<mongodb_host>/<database_name>?retryWrites=true&w=majority';

# for server.js
PORT=3000
```

Replace the values with your MongoDB and TiDB Cloud connection details.

### Usage

Start the backend server with the following command:

- while in the root folder (Eco-Track-Server):

```
npm run dev
```

The server will be running at http://localhost:3000

### Contributing

- Read [CONTRIBUTING.md](https://github.com/Project-Eco-Track/Eco-Track-Server/blob/main/CONTRIBUTING.md) before starting to contribute.