
# 📊 InsightPulse

**InsightPulse** is a full-stack MEAN (MongoDB, Express.js, Angular, Node.js) application designed to handle data-heavy analytics, reporting dashboards, and real-time charting for high-performance use cases. Built for scale and speed, it supports complex queries, caching, and modular architecture.

---

## 🧠 Project Goals

- Build a highly scalable full-stack analytics platform
- Handle millions of data entries efficiently
- Render real-time charts and reports using Angular
- Ensure high performance with caching, pagination, and query optimization
- Apply best practices: clean code, modular structure, TypeScript, strict mode

---

## 🚀 Tech Stack

| Layer       | Tech/Tool                            |
|-------------|---------------------------------------|
| Frontend    | Angular 17+, Angular Material, ApexCharts / ngx-charts |
| Backend     | Node.js, Express.js, TypeScript       |
| Database    | MongoDB (Mongoose ODM)                |
| Caching     | Redis (planned)                       |
| Dev Tools   | PM2, ts-node-dev, ESLint, Prettier    |
| Build Tools | Angular CLI, TypeScript               |

---

## 📁 Project Structure

```
InsightPulse/
├── api/         # Backend (Express + MongoDB + TS)
│   └── src/
│       ├── models/
│       ├── routes/
│       ├── controllers/
│       ├── services/
│       ├── utils/
│       └── app.ts
├── dashboard/   # Angular Frontend
│   └── src/app/
│       ├── components/
│       ├── services/
│       └── modules/
```

---

## ⚙️ Setup Instructions

### 🔧 Backend (API)

```bash
cd api
npm install
cp .env.example .env  # Add MongoDB URI and other env variables
npm run dev           # Starts with ts-node-dev
```

### 🖥️ Frontend (Angular)

```bash
cd dashboard
npm install
ng serve
```

---

## 📌 Features (Planned & In Progress)

- [x] Modular Angular + Express setup
- [x] TypeScript strict mode enabled
- [ ] User & session management
- [ ] MongoDB aggregation-based reporting
- [ ] Pagination & search filters
- [ ] Dynamic charts (bar, pie, line)
- [ ] Redis-based caching
- [ ] PM2 deployment
- [ ] Export to Excel / PDF
- [ ] Real-time metrics (WebSockets)

---

## 💡 Future Scope

- Plug-and-play analytics for eCommerce or SaaS apps
- Add microservices for data ingestion
- Deploy via Docker & NGINX
- Integrate AI-based trend predictions

---

## 🤝 Contributing

Currently under solo development by [Sebu](https://github.com/). Suggestions are welcome via issues or PRs.

---

## 📄 License

MIT
