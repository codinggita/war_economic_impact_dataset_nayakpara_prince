<div align="center">

# ⚔️ War Economic Impact — REST API

### A production-ready Full Stack API documenting the economic consequences of armed conflicts worldwide

[![Node.js](https://img.shields.io/badge/Node.js-v18%2B-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.x-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.x-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com/)
[![JWT](https://img.shields.io/badge/Auth-JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)
[![License](https://img.shields.io/badge/License-Academic-blue?style=for-the-badge)](./LICENSE)
[![Routes](https://img.shields.io/badge/API%20Routes-200-orange?style=for-the-badge)](./README.md)
[![PRs](https://img.shields.io/badge/PRs-Welcome-brightgreen?style=for-the-badge)](./CONTRIBUTING.md)

<br/>

> *Wars not only destroy lives — they collapse economies, inflate currencies, push millions into poverty, and leave generational scars on nations. This API makes that data queryable.*

[📖 Docs](#-api-reference) · [🚀 Quick Start](#-getting-started) · [📊 Dataset](#-data-model) · [🔒 Auth](#-authentication) · [🤝 Contributing](#-contributing)

</div>

---

## 📌 Overview

The **War Economic Impact API** is a production-grade RESTful service built on **MVC architecture**, providing structured access to economic data across major historical and ongoing armed conflicts. It captures critical indicators — GDP change, inflation, poverty, black market activity, currency devaluation, unemployment, and reconstruction costs — across conflicts worldwide.

Designed for researchers, journalists, academics, and developers, the API supports **200 endpoints** spanning filtering, pagination, sorting, search, statistics, and authenticated admin workflows.

---

## 👤 Author

| | |
|---|---|
| **Developer** | Prince Nayakpara |
| **GitHub** | [@princenayakpara](https://github.com/princenayakpara) |
| **Organization** | [CodingGita](https://github.com/codinggita) |
| **Repository** | [war_economic_impact_dataset_nayakpara_prince](https://github.com/codinggita/war_economic_impact_dataset_nayakpara_prince) |

---

## 🧰 Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Runtime** | Node.js v18+ | Server environment |
| **Framework** | Express.js | HTTP routing & middleware |
| **Database** | MongoDB | Document store |
| **ODM** | Mongoose | Schema modeling & querying |
| **Auth** | JWT (JSON Web Tokens) | Stateless authentication |
| **Validation** | express-validator + custom middleware | Request integrity |
| **Rate Limiting** | express-rate-limit | Abuse prevention |
| **Config** | dotenv | Environment management |
| **Dev** | nodemon | Hot reload in development |
| **Testing** | Postman | API exploration & testing |

---

## 📂 Project Structure

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
│   ├── statsController.js         # Aggregation & statistics
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
│   └── errorHandler.js            # Global error handler
│
├── .env                           # Environment variables (git-ignored)
├── .env.example                   # Environment template
├── server.js                      # Application entry point
└── README.md                      # Project documentation
```

---

## 📊 Data Model

**Collection:** `conflicts`

Each document captures one armed conflict and its full economic impact profile.

### Core Fields

| Field | Type | Description |
|---|---|---|
| `Conflict_Name` | String | Name of the war or conflict |
| `Conflict_Type` | String | Civil War, World War, Interstate, etc. |
| `Country` | String | Primary country affected |
| `Region` | String | Geographic region |
| `Start_Year` | Number | Year conflict began |
| `End_Year` | Number \| null | Year conflict ended (`null` if ongoing) |
| `Status` | String | `Ongoing` or `Resolved` |

### Economic Indicators

| Field | Type | Description |
|---|---|---|
| `GDP_Change_%` | Number | % change in GDP during conflict |
| `Inflation_Rate_%` | Number | Inflation rate during conflict |
| `Poverty_Rate_%` | Number | Population in poverty (%) |
| `Extreme_Poverty_Rate_%` | Number | Extreme poverty percentage |
| `Food_Insecurity_Rate_%` | Number | Population facing food insecurity (%) |
| `Pre_War_Unemployment_%` | Number | Unemployment before conflict |
| `During_War_Unemployment_%` | Number | Unemployment during conflict |
| `Youth_Unemployment_%` | Number | Youth unemployment during conflict |

### Market & Currency

| Field | Type | Description |
|---|---|---|
| `Affected_Sector` | String | Most impacted economic sector |
| `Black_Market_Level` | String | `Low` / `Medium` / `High` |
| `Black_Market_Goods` | String | Common goods traded (fuel, weapons, etc.) |
| `Profiteering` | String | `Yes` / `No` |
| `Currency_Devaluation_%` | Number | Currency devaluation percentage |
| `Currency_Black_Market_Rate_Gap_%` | Number | Official vs. black market exchange rate gap |

### Costs & Impact

| Field | Type | Description |
|---|---|---|
| `Estimated_Reconstruction_Cost_USD` | Number | Post-war reconstruction cost (USD) |
| `Cost_of_War_USD` | Number | Total estimated war cost (USD) |
| `Pre_War_Informal_Economy_%` | Number | Informal economy share before conflict |
| `During_War_Informal_Economy_%` | Number | Informal economy share during conflict |
| `Households_Affected` | Number | Number of households affected |

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- MongoDB (local or [MongoDB Atlas](https://www.mongodb.com/atlas))
- npm

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/princenayakpara/war_economic_impact_dataset_nayakpara_prince.git

# 2. Navigate to backend
cd war_economic_impact_dataset_nayakpara_prince/backend

# 3. Install dependencies
npm install

# 4. Configure environment
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret

# 5. Start development server
npm run dev
```

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start with nodemon (hot reload) |
| `npm start` | Start in production mode |

### Environment Variables

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

## 📡 API Reference

> **Base URL:** `http://localhost:5000`  
> **Total Endpoints:** 200 across 14 categories

---

### 🔹 Core CRUD — `/conflicts`

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/conflicts` | Fetch all conflicts |
| `GET` | `/conflicts/:conflictId` | Fetch by ID |
| `POST` | `/conflicts` | Create a new conflict record |
| `PUT` | `/conflicts/:conflictId` | Replace full conflict document |
| `PATCH` | `/conflicts/:conflictId` | Partially update a conflict |
| `DELETE` | `/conflicts/:conflictId` | Delete a conflict |

---

### 🔹 Route Parameters — 37 endpoints

Filter conflicts by specific field values directly in the URL path.

```
GET /conflicts/name/:name
GET /conflicts/type/:type
GET /conflicts/region/:region
GET /conflicts/country/:country
GET /conflicts/status/:status
GET /conflicts/start-year/:year
GET /conflicts/end-year/:year
GET /conflicts/inflation/:rate
GET /conflicts/gdp-loss/:percentage
GET /conflicts/poverty/:rate
GET /conflicts/extreme-poverty/:rate
GET /conflicts/food-insecurity/:rate
GET /conflicts/unemployment/:rate
GET /conflicts/youth-unemployment/:rate
GET /conflicts/sector/:sector
GET /conflicts/black-market/:level
GET /conflicts/black-market-goods/:goods
GET /conflicts/profiteering/:status
GET /conflicts/currency-gap/:gap
GET /conflicts/reconstruction-cost/:amount
GET /conflicts/cost-of-war/:amount
GET /conflicts/informal-economy/pre/:value
GET /conflicts/informal-economy/during/:value
GET /conflicts/households/:count
```

**Region & Country Utilities**
```
GET /conflicts/region/:region/latest        # Most recent conflict in a region
GET /conflicts/region/:region/oldest        # Earliest conflict in a region
GET /conflicts/country/:country/history     # Full conflict history for a country
GET /conflicts/type/:type/count             # Count conflicts by type
GET /conflicts/status/:status/count         # Count by status
GET /conflicts/year/:year                   # Conflicts active in a given year
```

**War-Specific Deep Dives**
```
GET /conflicts/war/:name/summary
GET /conflicts/war/:name/economic-impact
GET /conflicts/war/:name/poverty-impact
GET /conflicts/war/:name/black-market
GET /conflicts/war/:name/reconstruction
GET /conflicts/war/:name/currency-crisis
GET /conflicts/war/:name/unemployment
```

---

### 🔹 Query Parameters — 29 endpoints

Flexible filtering, ranging, and sorting via query strings.

**Filtering**
```
GET /conflicts?status=Ongoing
GET /conflicts?region=Europe
GET /conflicts?country=Japan
GET /conflicts?type=World%20War
GET /conflicts?sector=Agriculture
GET /conflicts?blackMarket=High
GET /conflicts?profiteering=Yes
GET /conflicts?year=2022
```

**Threshold Filters**
```
GET /conflicts?inflationAbove=50
GET /conflicts?inflationBelow=20
GET /conflicts?gdpLossAbove=30
GET /conflicts?povertyAbove=25
GET /conflicts?foodInsecurityAbove=20
GET /conflicts?currencyGapAbove=100
GET /conflicts?warCostAbove=1000000000
GET /conflicts?reconstructionAbove=5000000000
```

**Range Filters**
```
GET /conflicts?minInflation=20&maxInflation=80
GET /conflicts?minGDP=-50&maxGDP=-20
GET /conflicts?minPoverty=10&maxPoverty=40
GET /conflicts?minUnemployment=5&maxUnemployment=30
```

**Sorting**
```
GET /conflicts?sort=Inflation_Rate_%        # Ascending
GET /conflicts?sort=-GDP_Change_%           # Descending (prefix with -)
GET /conflicts?sort=Start_Year
GET /conflicts?sort=-Estimated_Reconstruction_Cost_USD
GET /conflicts?sort=Conflict_Name          # Alphabetical
```

---

### 🔹 Pagination — 10 endpoints

```
GET /conflicts?page=1&limit=10
GET /conflicts?page=2&limit=20
GET /conflicts/ongoing?page=1&limit=5
GET /conflicts/resolved?page=2&limit=10
GET /conflicts/europe?page=1&limit=15
GET /conflicts/asia?page=1&limit=15
GET /conflicts/high-inflation?page=1&limit=10
GET /conflicts/high-poverty?page=1&limit=10
GET /conflicts/high-gdp-loss?page=1&limit=10
GET /conflicts/black-market/high?page=1&limit=5
```

---

### 🔹 Combined Query Examples

```
# Ongoing conflicts sorted by highest inflation, page 1
GET /conflicts?status=Ongoing&page=1&limit=10&sort=-Inflation_Rate_%

# Paginated Europe conflicts
GET /conflicts?region=Europe&page=2&limit=5

# Japan sorted by GDP loss
GET /conflicts?country=Japan&sort=-GDP_Change_%

# High black market activity sorted by currency gap
GET /conflicts?blackMarket=High&sort=-Currency_Black_Market_Rate_Gap_%

# Ukraine — ongoing, paginated
GET /conflicts?country=Ukraine&status=Ongoing&page=1&limit=5
```

---

### 🔹 Search — `/search` — 13 endpoints

```
GET /search?keyword=Japan
GET /search?keyword=World%20War
GET /search/conflicts?country=Germany
GET /search/conflicts?region=Africa
GET /search/conflicts?type=Civil%20War
GET /search/conflicts?status=Resolved
GET /search/economic?inflation=100
GET /search/economic?poverty=30
GET /search/economic?gdp=-40
GET /search/economic?currency=50
GET /search/sector?name=Agriculture
GET /search/black-market?goods=fuel
GET /search/black-market?goods=weapons
```

---

### 🔹 Statistics — `/stats` — 10 endpoints

```
GET /stats/total-conflicts
GET /stats/ongoing-conflicts
GET /stats/resolved-conflicts
GET /stats/highest-inflation
GET /stats/lowest-gdp
GET /stats/highest-poverty
GET /stats/highest-food-insecurity
GET /stats/highest-currency-gap
GET /stats/highest-war-cost
GET /stats/highest-reconstruction-cost
```

---

### 🔹 Advanced Routes — 14 endpoints

```
GET /conflicts/top/highest-inflation
GET /conflicts/top/highest-poverty
GET /conflicts/recent
GET /conflicts/latest
GET /conflicts/random
GET /conflicts/trending
GET /conflicts/ongoing
GET /conflicts/resolved
GET /conflicts/high-risk
GET /conflicts/economic-collapse
GET /conflicts/summary/ai               # AI-generated conflict summary
GET /compare?conflict1=WWII&conflict2=Ukraine
GET /health
GET /version
```

---

### 🔒 Authentication — `/auth` — 8 endpoints

```
POST   /auth/register          # Create a new account
POST   /auth/login             # Authenticate and receive JWT
POST   /auth/logout            # Invalidate session
POST   /auth/forgot-password   # Initiate password reset
POST   /auth/reset-password    # Complete password reset
POST   /auth/refresh-token     # Refresh access token
GET    /auth/me                # Fetch authenticated user profile
DELETE /auth/account           # Permanently delete account
```

---

### 🔑 JWT Routes — `/jwt` — 8 endpoints

```
GET    /jwt/profile
GET    /jwt/dashboard
POST   /jwt/generate-token
POST   /jwt/verify-token
POST   /jwt/refresh-token
GET    /jwt/admin              # Admin-only
GET    /jwt/user               # Authenticated users
DELETE /jwt/logout
```

---

### 🛡️ Admin / Protected Routes — 8 endpoints

```
GET    /admin/conflicts
POST   /admin/conflicts
DELETE /admin/conflicts/:conflictId
PATCH  /admin/conflicts/:conflictId
GET    /admin/dashboard
GET    /protected/conflicts
POST   /protected/conflicts
DELETE /protected/conflicts/:conflictId
```

---

### 📝 POST / PUT / PATCH / DELETE — 30 endpoints

Full write access for conflict records and related sub-resources.

| Category | Methods |
|---|---|
| Conflicts | `POST`, `PUT`, `PATCH /status`, `PATCH /inflation`, `PATCH /gdp`, `PATCH /poverty`, `PATCH /unemployment`, `PATCH /sector`, `DELETE` |
| Countries / Regions | `POST`, `PUT`, `DELETE` |
| Economic Records | `POST`, `PUT`, `DELETE` |
| Poverty / Inflation / Unemployment Records | `POST`, `DELETE` each |
| Black Market / War Cost / Reconstruction Records | `POST`, `DELETE` each |

---

### 🌐 HEAD & OPTIONS — 12 endpoints

```
HEAD    /conflicts
HEAD    /conflicts/:conflictId
HEAD    /stats/total-conflicts
HEAD    /auth/me
HEAD    /health

OPTIONS /conflicts
OPTIONS /conflicts/:conflictId
OPTIONS /auth/login
OPTIONS /admin/conflicts
OPTIONS /search
OPTIONS /jwt/profile
OPTIONS /health
```

---

## 🔒 Middleware

| Middleware | File | Purpose |
|---|---|---|
| JWT Auth | `authMiddleware.js` | Verifies access tokens on protected routes |
| Admin Guard | `adminMiddleware.js` | Enforces admin role for `/admin/*` routes |
| Validation | `validateMiddleware.js` | Validates all POST/PATCH request bodies |
| Rate Limiter | `rateLimiter.js` | Caps requests per IP window to prevent abuse |

---

## ✅ Validation Rules

All `POST` and `PATCH` requests are validated against the following rules:

| Field | Rules |
|---|---|
| `Conflict_Name` | Required, non-empty string |
| `Conflict_Type` | Required, valid string |
| `Country` | Required, string |
| `Region` | Required, string |
| `Start_Year` | Required, valid 4-digit year |
| `End_Year` | Optional; must be `>= Start_Year` if provided |
| `Status` | Must be exactly `Ongoing` or `Resolved` |
| `GDP_Change_%` | Number (negative values allowed) |
| `Inflation_Rate_%` | Number, `>= 0` |
| `Poverty_Rate_%` | Number, range `0–100` |
| All unemployment/poverty fields | Number, range `0–100` |

---

## 📈 Endpoint Summary

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

## 🧪 Development Workflow

This project follows a **one route category = one PR** strategy for clean, reviewable history.

| PR | Scope |
|---|---|
| #1 | `README.md` |
| #2 | Backend scaffold & folder structure |
| #3 | Basic CRUD routes |
| #4 | Route parameter routes |
| #5 | Query parameter routes |
| #6 | Pagination routes |
| #7 | Sorting routes |
| #8 | Search routes |
| #9 | Statistics routes |
| #10 | POST / PUT / PATCH / DELETE routes |
| #11 | Auth routes |
| #12 | JWT routes |
| #13 | Admin / Protected routes |
| #14 | Advanced routes |
| #15 | Middleware (rate limiting, validation, error handling) |
| #16 | HEAD & OPTIONS routes |

---

## 🤝 Contributing

Contributions are welcome. Please follow the one-PR-per-feature convention, ensure all routes are tested in Postman before submission, and open an issue to discuss major changes beforehand.

---

## 📄 License

Developed for academic purposes as part of **[CodingGita](https://github.com/codinggita)**.

---

## 🙏 Acknowledgements

- Forked from [codinggita/war_economic_impact_dataset_nayakpara_prince](https://github.com/codinggita/war_economic_impact_dataset_nayakpara_prince)
- Built and extended by [Prince Nayakpara](https://github.com/princenayakpara)

---

<div align="center">

Made with dedication by **Prince Nayakpara** · CodingGita

</div>
