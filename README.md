# ⚔️ War Economic Impact — Full Stack REST API

> *"Wars not only destroy lives — they collapse economies, inflate currencies, push millions into poverty, and leave scars on nations for generations. This dataset tells that story with data."*

---

## 📌 Project Overview

This project is a production-ready **Full Stack RESTful API** built around the **War Economic Impact Dataset** — a structured collection of data capturing the economic consequences of major armed conflicts worldwide.

The dataset covers critical economic indicators such as **GDP change, inflation rates, poverty levels, black market activity, unemployment, currency devaluation, reconstruction costs, and cost of war** across historical and ongoing global conflicts.

The backend is built following strict **MVC (Model-View-Controller) Architecture** with clean folder structure, proper validation, JWT authentication, rate limiting, and pagination.

---

## 👤 Developer Info

| Field | Details |
|---|---|
| **Name** | Prince Nayakpara |
| **GitHub Username** | princenayakpara |
| **Repository** | war_economic_impact_dataset_nayakpara_prince |
| **Organization** | CodingGita |

---

## 🧰 Tech Stack

| Layer | Technology |
|---|---|
| **Runtime** | Node.js v18+ |
| **Framework** | Express.js |
| **Database** | MongoDB |
| **ODM** | Mongoose |
| **Authentication** | JWT (JSON Web Tokens) |
| **Validation** | Custom Middleware + express-validator |
| **Rate Limiting** | express-rate-limit |
| **Environment** | dotenv |
| **Dev Tool** | nodemon |
| **API Testing** | Postman |
| **Language** | JavaScript (100%) |

---

## 📂 Folder Structure

```
war_economic_impact_dataset/
│
├── config/
│   └── db.js                      # MongoDB connection setup
│
├── models/
│   └── Conflict.js                # Mongoose schema & model
│
├── controllers/
│   ├── conflictController.js      # CRUD, param, query, advanced logic
│   ├── statsController.js         # Statistics & aggregation
│   ├── searchController.js        # Keyword & field-based search
│   └── authController.js          # Register, login, JWT logic
│
├── routes/
│   ├── conflictRoutes.js          # CRUD + param + query + pagination + sorting
│   ├── statsRoutes.js             # /stats/* endpoints
│   ├── searchRoutes.js            # /search/* endpoints
│   ├── adminRoutes.js             # /admin/* protected routes
│   ├── authRoutes.js              # /auth/* authentication routes
│   └── jwtRoutes.js               # /jwt/* JWT-protected routes
│
├── middleware/
│   ├── authMiddleware.js          # JWT token verification
│   ├── adminMiddleware.js         # Admin role authorization
│   ├── validateMiddleware.js      # Request body validation
│   └── rateLimiter.js             # API rate limiting
│
├── utils/
│   └── errorHandler.js            # Global error handler utility
│
├── .env                           # Environment variables (git-ignored)
├── .env.example                   # Environment variable template
├── .gitignore                     # Git ignore rules
├── package.json                   # Project dependencies & scripts
├── server.js                      # Application entry point
└── README.md                      # Project documentation
```

---

## 🗃️ Dataset — MongoDB Schema

**Collection Name:** `conflicts`

Each document represents one armed conflict and its full economic impact profile.

| Field | Type | Description |
|---|---|---|
| `Conflict_Name` | String | Name of the war/conflict |
| `Conflict_Type` | String | Type: Civil War, World War, Interstate, etc. |
| `Country` | String | Primary country affected |
| `Region` | String | Geographic region (Europe, Middle East, etc.) |
| `Start_Year` | Number | Year the conflict began |
| `End_Year` | Number / null | Year conflict ended (`null` if Ongoing) |
| `Status` | String | `Ongoing` or `Resolved` |
| `GDP_Change_%` | Number | % change in GDP during conflict (often negative) |
| `Inflation_Rate_%` | Number | Inflation rate during the conflict |
| `Poverty_Rate_%` | Number | Poverty rate during the conflict |
| `Extreme_Poverty_Rate_%` | Number | Extreme poverty percentage |
| `Food_Insecurity_Rate_%` | Number | Population % facing food insecurity |
| `Pre_War_Unemployment_%` | Number | Unemployment rate before conflict |
| `During_War_Unemployment_%` | Number | Unemployment rate during conflict |
| `Youth_Unemployment_%` | Number | Youth unemployment during conflict |
| `Affected_Sector` | String | Most impacted economic sector |
| `Black_Market_Level` | String | Black market activity: Low / Medium / High |
| `Black_Market_Goods` | String | Common black market goods (fuel, weapons, etc.) |
| `Profiteering` | String | Whether profiteering occurred: Yes / No |
| `Currency_Devaluation_%` | Number | Currency devaluation percentage |
| `Currency_Black_Market_Rate_Gap_%` | Number | Gap between official and black market exchange rate |
| `Estimated_Reconstruction_Cost_USD` | Number | Estimated post-war reconstruction cost (USD) |
| `Cost_of_War_USD` | Number | Total estimated cost of war (USD) |
| `Pre_War_Informal_Economy_%` | Number | Informal economy share before conflict |
| `During_War_Informal_Economy_%` | Number | Informal economy share during conflict |
| `Households_Affected` | Number | Number of households affected |

---

## 📊 API Routes Summary

> **Total Routes: 200** across 14 categories

### 🔹 Basic CRUD Routes (`/conflicts`)

| Method | Endpoint | Description |
|---|---|---|
| GET | `/conflicts` | Fetch all conflicts |
| GET | `/conflicts/:conflictId` | Fetch conflict by ID |
| POST | `/conflicts` | Create new conflict |
| PUT | `/conflicts/:conflictId` | Replace full conflict document |
| PATCH | `/conflicts/:conflictId` | Partially update conflict |
| DELETE | `/conflicts/:conflictId` | Delete a conflict |

---

### 🔹 Route Parameter Routes (37 endpoints)

| Method | Endpoint | Description |
|---|---|---|
| GET | `/conflicts/name/:name` | Fetch by conflict name |
| GET | `/conflicts/type/:type` | Fetch by conflict type |
| GET | `/conflicts/region/:region` | Fetch by region |
| GET | `/conflicts/status/:status` | Fetch by status |
| GET | `/conflicts/country/:country` | Fetch by country |
| GET | `/conflicts/start-year/:year` | Fetch by start year |
| GET | `/conflicts/end-year/:year` | Fetch by end year |
| GET | `/conflicts/inflation/:rate` | Fetch by inflation rate |
| GET | `/conflicts/gdp-loss/:percentage` | Fetch by GDP loss |
| GET | `/conflicts/poverty/:rate` | Fetch by poverty rate |
| GET | `/conflicts/extreme-poverty/:rate` | Fetch by extreme poverty |
| GET | `/conflicts/food-insecurity/:rate` | Fetch by food insecurity |
| GET | `/conflicts/unemployment/:rate` | Fetch by unemployment |
| GET | `/conflicts/youth-unemployment/:rate` | Fetch by youth unemployment |
| GET | `/conflicts/sector/:sector` | Fetch by affected sector |
| GET | `/conflicts/black-market/:level` | Fetch by black market level |
| GET | `/conflicts/black-market-goods/:goods` | Fetch by black market goods |
| GET | `/conflicts/profiteering/:status` | Fetch by profiteering status |
| GET | `/conflicts/currency-gap/:gap` | Fetch by currency gap |
| GET | `/conflicts/reconstruction-cost/:amount` | Fetch by reconstruction cost |
| GET | `/conflicts/cost-of-war/:amount` | Fetch by total war cost |
| GET | `/conflicts/informal-economy/pre/:value` | Fetch by pre-war informal economy |
| GET | `/conflicts/informal-economy/during/:value` | Fetch by wartime informal economy |
| GET | `/conflicts/households/:count` | Fetch by affected households |
| GET | `/conflicts/region/:region/latest` | Latest conflict in a region |
| GET | `/conflicts/region/:region/oldest` | Oldest conflict in a region |
| GET | `/conflicts/country/:country/history` | Full conflict history of a country |
| GET | `/conflicts/type/:type/count` | Count conflicts by type |
| GET | `/conflicts/status/:status/count` | Count conflicts by status |
| GET | `/conflicts/year/:year` | Fetch conflicts active in a year |
| GET | `/conflicts/sector/:sector/highest-gdp-loss` | Highest GDP loss in a sector |
| GET | `/conflicts/sector/:sector/highest-inflation` | Highest inflation in a sector |
| GET | `/conflicts/war/:name/summary` | War summary |
| GET | `/conflicts/war/:name/economic-impact` | Economic impact of a war |
| GET | `/conflicts/war/:name/poverty-impact` | Poverty impact of a war |
| GET | `/conflicts/war/:name/black-market` | Black market data of a war |
| GET | `/conflicts/war/:name/reconstruction` | Reconstruction details |
| GET | `/conflicts/war/:name/currency-crisis` | Currency crisis data |
| GET | `/conflicts/war/:name/unemployment` | Unemployment impact |

---

### 🔹 Query Parameter Routes (29 endpoints)

| Method | Endpoint | Description |
|---|---|---|
| GET | `/conflicts?status=Ongoing` | Filter by status |
| GET | `/conflicts?region=Europe` | Filter by region |
| GET | `/conflicts?country=Japan` | Filter by country |
| GET | `/conflicts?type=World War` | Filter by type |
| GET | `/conflicts?inflationAbove=50` | High inflation conflicts |
| GET | `/conflicts?inflationBelow=20` | Low inflation conflicts |
| GET | `/conflicts?gdpLossAbove=30` | High GDP loss |
| GET | `/conflicts?povertyAbove=25` | High poverty |
| GET | `/conflicts?foodInsecurityAbove=20` | High food insecurity |
| GET | `/conflicts?currencyGapAbove=100` | High currency gap |
| GET | `/conflicts?warCostAbove=1000000000` | Expensive wars |
| GET | `/conflicts?reconstructionAbove=5000000000` | Costly reconstruction |
| GET | `/conflicts?sector=Agriculture` | Filter by sector |
| GET | `/conflicts?blackMarket=High` | High black market activity |
| GET | `/conflicts?profiteering=Yes` | Profiteering conflicts |
| GET | `/conflicts?year=2022` | Conflicts in a specific year |
| GET | `/conflicts?startYear=1939` | Conflicts from start year |
| GET | `/conflicts?endYear=1945` | Conflicts ended by year |
| GET | `/conflicts?country=Ukraine&status=Ongoing` | Ongoing Ukraine conflicts |
| GET | `/conflicts?region=Middle East&type=Civil War` | Middle East civil wars |
| GET | `/conflicts?minInflation=20&maxInflation=80` | Inflation range filter |
| GET | `/conflicts?minGDP=-50&maxGDP=-20` | GDP loss range filter |
| GET | `/conflicts?minPoverty=10&maxPoverty=40` | Poverty range filter |
| GET | `/conflicts?minUnemployment=5&maxUnemployment=30` | Unemployment range filter |
| GET | `/conflicts?sort=Inflation_Rate_%` | Sort by inflation |
| GET | `/conflicts?sort=-GDP_Change_%` | Sort descending by GDP |
| GET | `/conflicts?sort=Start_Year` | Sort by start year |
| GET | `/conflicts?sort=-Estimated_Reconstruction_Cost_USD` | Sort by reconstruction cost |
| GET | `/conflicts?keyword=war` | Keyword search |

---

### 🔹 Pagination Routes (10 endpoints)

| Method | Endpoint | Description |
|---|---|---|
| GET | `/conflicts?page=1&limit=10` | Paginate all conflicts |
| GET | `/conflicts?page=2&limit=20` | Fetch second page |
| GET | `/conflicts/ongoing?page=1&limit=5` | Paginate ongoing conflicts |
| GET | `/conflicts/resolved?page=2&limit=10` | Paginate resolved conflicts |
| GET | `/conflicts/europe?page=1&limit=15` | Paginate Europe conflicts |
| GET | `/conflicts/asia?page=1&limit=15` | Paginate Asia conflicts |
| GET | `/conflicts/high-inflation?page=1&limit=10` | Paginate high inflation |
| GET | `/conflicts/high-poverty?page=1&limit=10` | Paginate high poverty |
| GET | `/conflicts/high-gdp-loss?page=1&limit=10` | Paginate high GDP loss |
| GET | `/conflicts/black-market/high?page=1&limit=5` | Paginate high black market |

---

### 🔹 Sorting Routes (15 endpoints)

| Method | Endpoint | Description |
|---|---|---|
| GET | `/conflicts?sort=Inflation_Rate_%` | Sort by inflation (asc) |
| GET | `/conflicts?sort=-Inflation_Rate_%` | Sort by inflation (desc) |
| GET | `/conflicts?sort=GDP_Change_%` | Sort by GDP change (asc) |
| GET | `/conflicts?sort=-GDP_Change_%` | Sort by GDP change (desc) |
| GET | `/conflicts?sort=Pre_War_Unemployment_%` | Sort by pre-war unemployment |
| GET | `/conflicts?sort=-During_War_Unemployment_%` | Sort by wartime unemployment |
| GET | `/conflicts?sort=Food_Insecurity_Rate_%` | Sort by food insecurity |
| GET | `/conflicts?sort=-Extreme_Poverty_Rate_%` | Sort by extreme poverty |
| GET | `/conflicts?sort=Currency_Devaluation_%` | Sort by currency devaluation |
| GET | `/conflicts?sort=-Currency_Black_Market_Rate_Gap_%` | Sort by black market gap |
| GET | `/conflicts?sort=Estimated_Reconstruction_Cost_USD` | Sort by reconstruction cost |
| GET | `/conflicts?sort=-Cost_of_War_USD` | Sort by war cost (desc) |
| GET | `/conflicts?sort=Start_Year` | Sort by start year |
| GET | `/conflicts?sort=-End_Year` | Sort by end year (desc) |
| GET | `/conflicts?sort=Conflict_Name` | Sort alphabetically |

---

### 🔹 Search Routes (`/search`) — 13 endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/search?keyword=Japan` | Search by keyword |
| GET | `/search?keyword=World War` | Search world wars |
| GET | `/search/conflicts?country=Germany` | Search by country |
| GET | `/search/conflicts?region=Africa` | Search by region |
| GET | `/search/conflicts?type=Civil War` | Search by type |
| GET | `/search/conflicts?status=Resolved` | Search resolved conflicts |
| GET | `/search/economic?inflation=100` | Search by inflation level |
| GET | `/search/economic?poverty=30` | Search by poverty impact |
| GET | `/search/economic?gdp=-40` | Search by GDP loss |
| GET | `/search/economic?currency=50` | Search by currency crisis |
| GET | `/search/sector?name=Agriculture` | Search by sector |
| GET | `/search/black-market?goods=fuel` | Search by black market goods |
| GET | `/search/black-market?goods=weapons` | Search weapons black market |

---

### 🔹 Statistics Routes (`/stats`) — 10 endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/stats/total-conflicts` | Total number of conflicts |
| GET | `/stats/ongoing-conflicts` | Count of ongoing conflicts |
| GET | `/stats/resolved-conflicts` | Count of resolved conflicts |
| GET | `/stats/highest-inflation` | Conflict with highest inflation |
| GET | `/stats/lowest-gdp` | Conflict with lowest GDP change |
| GET | `/stats/highest-poverty` | Conflict with highest poverty |
| GET | `/stats/highest-food-insecurity` | Conflict with highest food insecurity |
| GET | `/stats/highest-currency-gap` | Conflict with largest currency gap |
| GET | `/stats/highest-war-cost` | Most expensive war |
| GET | `/stats/highest-reconstruction-cost` | Costliest reconstruction |

---

### 🔹 POST / PUT / PATCH / DELETE Routes (30 endpoints)

| Method | Endpoint | Description |
|---|---|---|
| POST | `/conflicts` | Create conflict |
| POST | `/regions` | Create region |
| POST | `/countries` | Create country |
| POST | `/economic-records` | Create economic record |
| POST | `/poverty-records` | Create poverty record |
| POST | `/inflation-records` | Create inflation record |
| POST | `/black-market-records` | Create black market record |
| POST | `/war-cost-records` | Create war cost record |
| POST | `/reconstruction-records` | Create reconstruction record |
| POST | `/unemployment-records` | Create unemployment record |
| PUT | `/conflicts/:conflictId` | Replace conflict |
| PUT | `/countries/:countryId` | Replace country |
| PUT | `/economic-records/:recordId` | Replace economic record |
| PUT | `/reconstruction-records/:recordId` | Replace reconstruction record |
| PATCH | `/conflicts/:conflictId/status` | Update status only |
| PATCH | `/conflicts/:conflictId/inflation` | Update inflation only |
| PATCH | `/conflicts/:conflictId/gdp` | Update GDP only |
| PATCH | `/conflicts/:conflictId/poverty` | Update poverty only |
| PATCH | `/conflicts/:conflictId/unemployment` | Update unemployment only |
| PATCH | `/conflicts/:conflictId/sector` | Update sector only |
| DELETE | `/conflicts/:conflictId` | Delete conflict |
| DELETE | `/countries/:countryId` | Delete country |
| DELETE | `/regions/:regionId` | Delete region |
| DELETE | `/economic-records/:recordId` | Delete economic record |
| DELETE | `/poverty-records/:recordId` | Delete poverty record |
| DELETE | `/black-market-records/:recordId` | Delete black market record |
| DELETE | `/war-cost-records/:recordId` | Delete war cost record |
| DELETE | `/reconstruction-records/:recordId` | Delete reconstruction record |
| DELETE | `/inflation-records/:recordId` | Delete inflation record |
| DELETE | `/unemployment-records/:recordId` | Delete unemployment record |

---

### 🔹 Authentication Routes (`/auth`) — 8 endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/auth/register` | Register new user |
| POST | `/auth/login` | Login and receive JWT |
| POST | `/auth/logout` | Logout user |
| POST | `/auth/forgot-password` | Request password reset |
| POST | `/auth/reset-password` | Reset password |
| POST | `/auth/refresh-token` | Refresh JWT token |
| GET | `/auth/me` | Get authenticated user |
| DELETE | `/auth/account` | Delete user account |

---

### 🔹 JWT Routes (`/jwt`) — 8 endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/jwt/profile` | JWT protected profile |
| GET | `/jwt/dashboard` | JWT protected dashboard |
| POST | `/jwt/generate-token` | Generate JWT token |
| POST | `/jwt/verify-token` | Verify JWT token |
| POST | `/jwt/refresh-token` | Refresh JWT token |
| GET | `/jwt/admin` | Admin-only JWT route |
| GET | `/jwt/user` | User-only JWT route |
| DELETE | `/jwt/logout` | JWT logout |

---

### 🔹 Admin / Protected Routes — 8 endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/admin/conflicts` | Admin — fetch all conflicts |
| POST | `/admin/conflicts` | Admin — create conflict |
| DELETE | `/admin/conflicts/:conflictId` | Admin — delete conflict |
| PATCH | `/admin/conflicts/:conflictId` | Admin — update conflict |
| GET | `/admin/dashboard` | Admin dashboard |
| GET | `/protected/conflicts` | Protected fetch |
| POST | `/protected/conflicts` | Protected create |
| DELETE | `/protected/conflicts/:conflictId` | Protected delete |

---

### 🔹 Advanced Routes — 14 endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/conflicts/top/highest-inflation` | Top highest inflation conflicts |
| GET | `/conflicts/top/highest-poverty` | Top highest poverty conflicts |
| GET | `/conflicts/recent` | Recently added conflicts |
| GET | `/conflicts/latest` | Latest conflicts |
| GET | `/conflicts/random` | Random conflict |
| GET | `/conflicts/trending` | Trending conflicts |
| GET | `/conflicts/ongoing` | All ongoing conflicts |
| GET | `/conflicts/resolved` | All resolved conflicts |
| GET | `/conflicts/high-risk` | High risk conflicts |
| GET | `/conflicts/economic-collapse` | Economic collapse conflicts |
| GET | `/health` | API health check |
| GET | `/version` | API version info |
| GET | `/compare?conflict1=WWII&conflict2=Ukraine` | Compare two conflicts |
| GET | `/conflicts/summary/ai` | AI-generated conflict summary |

---

### 🔹 HEAD & OPTIONS Routes — 12 endpoints

| Method | Endpoint | Description |
|---|---|---|
| HEAD | `/conflicts` | Headers only for conflicts collection |
| HEAD | `/conflicts/:conflictId` | Headers for single conflict |
| HEAD | `/stats/total-conflicts` | Metadata for stats endpoint |
| HEAD | `/auth/me` | Verify auth session headers |
| HEAD | `/health` | Health check headers only |
| OPTIONS | `/conflicts` | List supported methods |
| OPTIONS | `/conflicts/:conflictId` | Allowed methods for resource |
| OPTIONS | `/auth/login` | Auth endpoint methods |
| OPTIONS | `/admin/conflicts` | Admin route methods |
| OPTIONS | `/search` | Search endpoint methods |
| OPTIONS | `/jwt/profile` | JWT route options |
| OPTIONS | `/health` | API capabilities |

---

### 🔹 Combined Query + Pagination + Sorting Examples

| Method | Endpoint | Description |
|---|---|---|
| GET | `/conflicts?status=Ongoing&page=1&limit=10&sort=-Inflation_Rate_%` | Ongoing sorted by inflation |
| GET | `/conflicts?region=Europe&page=2&limit=5` | Paginated Europe conflicts |
| GET | `/conflicts?country=Japan&sort=-GDP_Change_%` | Japan sorted by GDP |
| GET | `/conflicts?type=World War&page=1&limit=20` | Paginated World Wars |
| GET | `/conflicts?blackMarket=High&sort=-Currency_Black_Market_Rate_Gap_%` | High black market sorted |
| GET | `/conflicts?inflationAbove=50&page=1&limit=10` | High inflation paginated |
| GET | `/conflicts?povertyAbove=20&sort=-Extreme_Poverty_Rate_%` | High poverty sorted |
| GET | `/conflicts?sector=Energy&page=2&limit=10` | Energy sector paginated |
| GET | `/conflicts?profiteering=Yes&sort=-Cost_of_War_USD` | Profiteering sorted by cost |
| GET | `/conflicts?country=Ukraine&status=Ongoing&page=1&limit=5` | Ukraine ongoing paginated |

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```env
# Server
PORT=5000
NODE_ENV=development

# MongoDB
MONGO_URI=mongodb://localhost:27017/war_economic_impact

# JWT
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=7d

# Rate Limiting
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX=100
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- MongoDB (local or Atlas)
- npm

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/princenayakpara/war_economic_impact_dataset_nayakpara_prince.git

# 2. Navigate into the project
cd war_economic_impact_dataset_nayakpara_prince

# 3. Navigate into backend
cd backend

# 4. Install dependencies
npm install

# 5. Setup environment
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret

# 6. Start development server
npm run dev
```

### Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start with nodemon (development) |
| `npm start` | Start in production mode |

---

## 🔒 Middleware Overview

| Middleware | Purpose |
|---|---|
| `authMiddleware.js` | Verifies JWT tokens on protected routes |
| `adminMiddleware.js` | Checks admin role authorization |
| `validateMiddleware.js` | Validates request body fields |
| `rateLimiter.js` | Prevents abuse via rate limiting |

---

## 📋 Validation Rules

All `POST` and `PATCH` requests validate:

- `Conflict_Name` — required, non-empty string
- `Conflict_Type` — required, valid string
- `Country` — required, string
- `Region` — required, string
- `Start_Year` — required, valid 4-digit year number
- `End_Year` — optional, must be `>= Start_Year` if provided
- `Status` — must be exactly `Ongoing` or `Resolved`
- `GDP_Change_%` — number (can be negative)
- `Inflation_Rate_%` — number, >= 0
- `Poverty_Rate_%` — number, range 0–100
- All unemployment/poverty fields — number, range 0–100

---

## 🧪 PR Strategy — One Route = One PR

| PR # | Content |
|---|---|
| PR #1 | `README.md` ✅ |
| PR #2 | Backend folder structure (scaffold) |
| PR #3 | Basic CRUD routes |
| PR #4 | Route parameter routes |
| PR #5 | Query parameter routes |
| PR #6 | Pagination routes |
| PR #7 | Sorting routes |
| PR #8 | Search routes |
| PR #9 | Statistics routes |
| PR #10 | POST / PUT / PATCH / DELETE routes |
| PR #11 | Auth routes |
| PR #12 | JWT routes |
| PR #13 | Admin / Protected routes |
| PR #14 | Advanced routes |
| PR #15 | Middleware (rate limiting, validation, error handling) |
| PR #16 | HEAD & OPTIONS routes |

---

## 📈 Route Statistics

| Category | Count |
|---|---|
| Basic CRUD | 6 |
| Route Parameters | 37 |
| Query Parameters | 29 |
| Pagination | 10 |
| Sorting | 15 |
| Search | 13 |
| Statistics | 10 |
| POST / PUT / PATCH / DELETE | 30 |
| Authentication | 8 |
| JWT | 8 |
| Admin / Protected | 8 |
| Advanced | 14 |
| HEAD & OPTIONS | 12 |
| Combined Examples | 10 |
| **Total** | **200** |

---

## 🏷️ Topics

`nodejs` · `mongodb` · `mongoose` · `expressjs` · `jwt-authentication` · `rest-api` · `express-validator` · `mvc-architecture` · `war-data` · `economic-impact`

---

## 📄 License

This project is developed for academic purposes as part of **CodingGita**.

---

## 🙏 Acknowledgements

- Forked from [codinggita/war_economic_impact_dataset_nayakpara_prince](https://github.com/codinggita/war_economic_impact_dataset_nayakpara_prince)
- Built and extended by [Prince Nayakpara](https://github.com/princenayakpara)
