from flask import Flask, request, render_template, redirect, abort

from models import db, GamesModel

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///game-industry.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)


@app.before_first_request
def create_table():
    db.create_all()


@app.route('/')
def RetrieveDataList():
    games = GamesModel.query.all()
    return render_template('datalist.html', games=games)


@app.route('/add', methods=['GET', 'POST'])
def create():
    if request.method == 'GET':
        return render_template('createpage.html')

    if request.method == 'POST':

        name = request.form['name']
        year = request.form['year']
        company = request.form['company']
        game = GamesModel(name=name, year=year, company=company)
        db.session.add(game)
        db.session.commit()
        return redirect('/')


@app.route('/data/<int:id>')
def RetrieveSingleGame(id):
    game = GamesModel.query.filter_by(id=id).first()
    if game:
        return render_template('data.html', game=game)
    return f"Game with id ={id} Doesn't exist"


@app.route('/<string:company>/', methods=['GET'])
def RetrieveCompanyGames(company):
    games = GamesModel.query.all()
    return render_template('companydata.html', games=games, companyName=company)


@app.route('/<int:year>/', methods=['GET'])
def RetrieveYearOfGames(year):
    games = GamesModel.query.all()
    return render_template('gameyear.html', games=games, gameYear=year)


@app.route('/data/<int:id>/update', methods=['GET', 'POST'])
def update(id):
    game = GamesModel.query.filter_by(id=id).first()
    if request.method == 'POST':
        if game:
            db.session.delete(game)
            db.session.commit()

            name = request.form['name']
            year = request.form['year']
            company = request.form['company']
            game = GamesModel(name=name, year=year, company=company)

            db.session.add(game)
            db.session.commit()
            return redirect(f'/')
        return f"Game with id = {id} Does nit exist"

    return render_template('update.html', game=game)


@app.route('/data/<int:id>/delete', methods=['GET', 'POST'])
def delete(id):
    game = GamesModel.query.filter_by(id=id).first()
    if request.method == 'POST':
        if game:
            db.session.delete(game)
            db.session.commit()
            return redirect('/')
        abort(404)

    return render_template('delete.html')


if __name__ == "__main__":
    app.run(host='[YOUR IP ADDRESS, LOCALHOST DOES NOT WORK]', port=3000, debug=True)
