# 🇺🇦 ICP UA Plate Checker (Frontend)

Simple, intuitive, and clean frontend application built with React and Tailwind CSS for checking the availability of Ukrainian vehicle license plates. Integrated with a backend deployed on Heroku and hosted on the Internet Computer (ICP) via a canister.

👉 **Live ICP Deployment:**  
🔗 https://lfaoq-haaaa-aaaah-arcva-cai.icp0.io/

## 🚀 Features

- ✅ Simple, responsive UI built with React
- ✅ Styling with Tailwind CSS
- ✅ Integration with ICP via DFX
- ✅ Backend API integration (Heroku)
- ✅ Deployed as a frontend canister on the Internet Computer

## 🛠️ Technologies Used

- **React** (via Vite)
- **Tailwind CSS**
- **Internet Computer Protocol (ICP)**
- **DFX CLI**

## 📦 Installation and Local Development

Clone the repository:

```bash
git clone https://github.com/alex-teren/icp-ua-plate-checker.git
cd icp-ua-plate-checker
npm install
```

Start the ICP local server:

```bash
dfx start --clean --background
dfx deploy
```

Run the frontend development server:

```bash
npm run dev
```

Then open your browser at:

```
http://localhost:5173
```

## 🌐 Deploy to ICP

To deploy your application to ICP:

```bash
dfx deploy --network ic
```

## 🔗 Backend API

This frontend app connects to the backend API deployed on Heroku:

👉 [icp-ua-plate-checker-api](https://github.com/alex-teren/icp-ua-plate-checker-api)


## ❓ Why is the backend hosted on Heroku instead of in a canister?

The backend relies on Puppeteer — a Node.js library for controlling headless Chromium to scrape or interact with web pages.

📌 **At the moment, ICP canisters do not support running Puppeteer or similar tools** due to the limitations of the WebAssembly runtime environment.

👉 For this reason, the license plate checking logic is implemented in a separate Node.js API hosted on Heroku.
