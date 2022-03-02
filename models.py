from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class GamesModel(db.Model):
    __tablename__ = "games"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String())
    year = db.Column(db.Integer())
    company = db.Column(db.String(80))

    def __init__(self, name, year, company):
        self.name = name
        self.year = year
        self.company = company

    def __repr__(self):
        return f"{self.name}"
