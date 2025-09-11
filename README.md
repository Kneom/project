# Sheer Dem Sheep

## Project Overview
'Sheer Dem Sheep' is a Flask-based web application that serves a browser-playable 2D game behind authenticated access. It implements user account management (registration, login, logout, password change), session handling, and a persistent time-based leaderboard stored in a SQLite database. Game play is accessed via protected routes (`/play`, `/info`, `/leaderboard`) once a user is logged in. Round completion times are submitted asynchronously to the backend (`/round-time`) and stored per user and round, with logic preventing slower times from overwriting faster (better) ones.

The application uses:
- Flask for routing, request handling, templating, and session integration.
- Server-side filesystem-backed sessions (via `flask_session`).
- SQLite for persistence (`app.db`) with helper functions in `database.py`.
- Secure password hashing (Werkzeug’s `generate_password_hash` / `check_password_hash`).
- WTForms (via custom form classes in `forms.py`) for validation of authentication and password change flows.
- A leaderboard system that orders entries by recorded completion time.
- A login protection decorator (`login_required`) to restrict gameplay and leaderboard views.

## Key Features
### Authentication & User Management
- User registration (`/register`) with uniqueness check.
- Login (`/login`) establishing session keys: `user_id`, `is_admin`.
- Logout (`/loggedout`) clears the entire session.
- Password change (`/change_password`) with:
  - Original password verification.
  - Prevention of reusing the same password.
  - Secure hashing on update.

## Setup & Run

### 1. Clone the Repository
```bash
git clone https://github.com/mccarthy-michael/2D-Game.git
cd 2D-Game
```

### 3. Create & Activate a Virtual Environment (Recommended)
```bash
python -m venv venv
# macOS/Linux:
source venv/bin/activate
# Windows (PowerShell):
venv\Scripts\Activate.ps1
```

### 4. Install Dependencies
```bash
pip install -r requirements.txt
```

### 5. Initialize / Reset the Database
If you want a clean database:
```bash
rm -f app.db         # Windows: del app.db
sqlite3 app.db < schema.sql
```
(Ensure `sqlite3` is installed; otherwise, run the application once to let it create the database if logic exists to do so, or manually create tables per `schema.sql`.)

### 6. Run the Application
You can run via Flask’s CLI (if an application factory or direct module is supported) or directly:
```bash
python run.py
# or if using app.py directly (uncomment the guarded run block if needed):
# python app.py
```

Server will default to:
```
http://127.0.0.1:5000/
```

### 7. Access the App
1. Visit `/register` to create a user (unless seeded already).
2. Log in at `/login`.
3. Navigate to:
   - `/play` to access the game interface.
   - `/leaderboard` to view recorded times.
   - `/change_password` to update credentials.
