# Playwright E2E Tests Assessment for Liviti Property

![Playwright](https://img.shields.io/badge/Playwright-Testing-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue)
![CI/CD](https://img.shields.io/badge/GitHub-Actions-green)

This is a **Assessment** for  [Liviti Property](https://liviti.com.au/) 
built using **Playwright (TypeScript)**.

---

## 🧰 Tech Stack

- **[Playwright 1.58.1](https://playwright.dev/)** - UI
- **[TypeScript 5.8](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-8.html)** - Language
- **[dotenv](https://www.npmjs.com/package/dotenv)** – environment variables
- **[GitHub Actions](https://github.com/features/actions)** – CI/CD pipeline

---

## ⚙️ Setup

### 1. Install Dependencies
```bash
npm install
```
---
## 🛠 Setup & Configuration

### Create a .env File at core project folder
```
STANDART_USERNAME=standard_user
STANDART_PASSWORD=secret_sauce
BASE_URL=https://www.saucedemo.com
```

### Run tests using the following command:

If it is your first run you need to run ```npm run setup``` and then choose eather PC or Phone test run. **Note you need to change "expires": 1770121126 section in session to bigger like 1870121126 wich will help you to not recreate session again and again**

1. **If you want to run PC resolution test:** 
    ```npm run PC_Tests```

2. **If you want to run Phone resolution test:** 
    ```npm run Phone_Tests```

3. **If you want to run setup (user session save):** 
    ```npm run setup```

## Author

- [![LinkedIn](https://img.shields.io/badge/LinkedIn-Profile-blue?logo=linkedin)](https://www.linkedin.com/in/vladyslav-prudkohliad/)
- [![GitHub](https://img.shields.io/badge/GitHub-Profile-black?logo=github)](https://github.com/NGon001)
