# EcoTrack Backend

This is the backend component of EcoTrack, a revolutionary web application that helps individuals reduce their carbon footprint and embrace sustainable practices. The backend is responsible for handling API requests, interacting with the database, and implementing the core logic of the application.

## Technologies Used

- Node.js
- Express.js
- TiDB Cloud
- Other dependencies (listed in package.json)

## Getting Started

### Prerequisites

- Node.js (v19.7.0)
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

# for server.js
PORT=3001
```

Replace the values with your MongoDB and TiDB Cloud connection details.

## Add Data App Keys
[Read Docs](https://docs.pingcap.com/tidbcloud/data-service-get-started)
```
TIDB_PUBLIC_KEY_R = Public Key with read access
TIDB_PRIVATE_KEY_R = Private Key with read acess

TIDB_PUBLIC_KEY_RW = Public Key with Read/Write access
TIDB_PRIVATE_KEY_RW = Private Key with Read/Write acess
```

### Usage

Start the backend server with the following command:

- while in the root folder (Eco-Track-Server):

```
npm run dev
```

The server will be running at http://localhost:3001

### Contributing

- Read [CONTRIBUTING.md](https://github.com/Project-Eco-Track/Eco-Track-Server/blob/main/CONTRIBUTING.md) before starting to contribute.
