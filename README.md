# 🚀 Codathon – Contest & Hackathon Tracker

Codathon is a sleek and intuitive web application that helps you track upcoming **competitive programming contests** and **hackathons** across multiple platforms, all in one place.

> ⚡ Stay ahead. Code smart. Compete better.

---

## ✨ Features

- 🧠 **Contest Calendar View**: View upcoming contests filtered by day, week, or month.
- 🔎 **Platform-Specific Pages**: Explore upcoming contests from Codeforces, LeetCode, AtCoder, CodeChef, GeeksForGeeks, TopCoder, etc.
- ⏳ **Live Countdown Timers**: Know exactly how much time is left before a contest starts.
- 🗓️ **Integrated Hackathon Listings**: Discover active hackathons from **Devfolio** and **Unstop**.
- 🌙 **Dark/Light Theme Toggle**: Fully responsive UI with theme switching.
- 🔁 **Auto-updating Data**: Fetches data every 5 minutes from [Clist.by](https://clist.by) and other sources.

---

## 📸 Screenshots

Coming soon...

---

## 🛠️ Tech Stack

- **Frontend**: React.js, Tailwind CSS
- **Routing**: React Router
- **API**: Clist API (for contests), Devfolio & Unstop (for hackathons)
- **State Management**: React Query (`@tanstack/react-query`)
- **Theming**: `next-themes` for dark/light mode
- **Icons**: Lucide-react

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/codathon.git
cd codathon
2. Install Dependencies
bash
Copy
Edit
npm install
3. Configure Environment
No .env needed if you're using hardcoded Clist API keys. Otherwise:

env
Copy
Edit
VITE_CLIST_USERNAME=your_username
VITE_CLIST_API_KEY=your_api_key
Then access via import.meta.env.VITE_CLIST_API_KEY.

4. Start the Dev Server
bash
Copy
Edit
npm run dev
Your app will be running at http://localhost:5173

🧪 Folder Structure
arduino
Copy
Edit
src/
├── assets/            # images and icons
├── components/        # reusable components (buttons, toggles, cards)
├── pages/             # route components: Index, Calendar, Platform, etc.
├── App.tsx            # root component
├── main.tsx           # entry point
└── styles/            # Tailwind config & globals
🌍 Platforms Supported
✅ Codeforces

✅ LeetCode

✅ AtCoder

✅ CodeChef

✅ GeeksForGeeks

✅ TopCoder

✅ Devfolio (Hackathons)

✅ Unstop (Hackathons)

👨‍💻 Author
Made with ❤️ by Harshit Gupta


📄 License
This project is licensed under the MIT License.