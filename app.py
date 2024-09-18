from flask import Flask, render_template, request, g, session, url_for, redirect, flash, jsonify
from database import get_db, close_db
from flask_session import Session
from werkzeug.security import generate_password_hash, check_password_hash
from forms import LogForm, RegForm, changePwd
from functools import wraps

# Admin ID : admin
# password : 123

methods = ["GET", "POST"]
app = Flask(__name__)
app.config["SECRET_KEY"] = "hehehe"
app.config["SESSION_COOKIE_SAMESITE"] = "Lax"
app.config["SESSION_COOKIE_SECURE"] = True
app.config['UPLOAD_FOLDER'] = 'static'
app.config['ALLOWED_EXTENSIONS'] = {'jpg', 'jpeg', 'png'}
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"

Session(app)

app.teardown_appcontext(close_db)


@app.before_request
def preloads():
    g.user = session.get("user_id", None)
    g.reg = session.get("registered", None)
    g.score = session.get("score", None)


def login_required(view):
    @wraps(view)
    def wrapped_view(*args, **kwargs):
        if g.user is None:
            return redirect(url_for("login", next=request.url))
        return view(*args, **kwargs)
    return wrapped_view

# if __name__ == "__main__":
#     app.run()

@app.route("/", methods=methods)
def home():
    print(session)
    return render_template("home.html")


@app.route("/play", methods=methods)
@login_required
def play():
    return render_template("play.html")


@app.route("/info", methods=methods)
@login_required
def info():
    return render_template("info.html")


@app.route("/round-time", methods=["POST"])
def round_time():
    db = get_db()
    round_time = request.get_json().get("timer")
    round_number = request.get_json().get("roundNumber")
    print(round_time)
    print(round_number)
    if g.user:
        existing_entry = db.execute("""
                                    SELECT * FROM leaderboard
                                    WHERE player =? AND round =?
                                """, (g.user, round_number)).fetchone()

        if existing_entry and existing_entry["time"] <= round_time:
            pass
        else:
            db.execute("""
                            INSERT INTO leaderboard (player, time, round)
                            VALUES (?,?,?);
                        """, (g.user, round_time, round_number))
            db.commit()

    # Do something with the round time and number here
    return jsonify({"message": "Round time and number received"}), 200


@app.route("/leaderboard", methods=methods)
@login_required
def leaderboard():
    db = get_db()
    rounds = db.execute("SELECT * FROM Rounds").fetchall()
    query = """
            SELECT * 
            FROM leaderboard ORDER BY time;
            """
    leaderboard = db.execute(query).fetchall()
    return render_template("leaderboard.html", leaderboard=leaderboard, rounds=rounds)


@app.route("/register", methods=methods)
def register():
    form = RegForm()
    if form.validate_on_submit():
        user_id = form.user_id.data
        password = form.password0.data
        db = get_db()
        conflict_user = db.execute("""
                       SELECT * FROM users
                       WHERE user_id = ?;
                       """, (user_id,)).fetchone()
        if conflict_user is not None:
            form.user_id.errors.append("User name already taken")
        else:
            db.execute("""
                        INSERT INTO users (user_id, password, is_admin)
                        VALUES (?, ?, ?);
                    """, (user_id, generate_password_hash(password), False))
            db.commit()
            return redirect(url_for("login"))

    return render_template("register.html", form=form)


@app.route("/login", methods=methods)
def login():
    form = LogForm()
    if form.validate_on_submit():
        user_id = form.user_id.data
        password = form.password0.data
        db = get_db()
        user = db.execute("""
                       SELECT * FROM users
                       WHERE user_id = ?;
                       """, (user_id,)).fetchone()
        if user is None:
            form.user_id.errors.append("No such user name! ")
        elif not check_password_hash(user["password"], password):
            form.password0.errors.append("Incorrect password")
        else:
            session["user_id"] = user_id
            session["is_admin"] = bool(user["is_admin"])
            next_page = request.args.get("next")
            if not next_page:
                next_page = url_for("home")
            return redirect(next_page)

    return render_template("login.html", form=form)


@app.route('/change_password', methods=methods)
@login_required
def change_password():
    db = get_db()
    form = changePwd()
    if form.validate_on_submit():
        old_password = form.password.data
        new_password = form.new_password.data
        user = db.execute("""
                       SELECT * FROM users
                       WHERE user_id = ?;
                       """, (g.user,)).fetchone()
        if not check_password_hash(user["password"], old_password):
            form.password.errors.append("Incorrect Original Password")
            return render_template("change_password.html", form=form)
        elif old_password == new_password:
            form.new_password.errors.append(
                "Password cannot be same as previous one")
            return render_template("change_password.html", form=form)
        else:
            db.execute("""
                        UPDATE users
                        SET password = ?
                        WHERE user_id = ?;
                    """, (generate_password_hash(new_password), g.user))
            db.commit()
            flash("Password changed succesfully!", 'success')
            return redirect(url_for("change_password"))
    return render_template('change_password.html', form=form)


@app.route("/loggedout", methods=methods)
def loggedout():
    session.clear()
    return redirect(url_for("home"))
