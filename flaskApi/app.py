from flask import Flask, jsonify

app = Flask(__name__)


@app.route('/')
def index():
    return 'hello flask'


@app.route('/getData')
def getData():
    return {'data': [{"key": "1b81910b-f90d-4cd5-8489-5175581d5fc2", "webName": "网易邮箱", "name": "ks_196@126.com", "pwd": "5b88e75704ef0cbf963e7d440aae0a3b"}]}
    # return [{"key": "1b81910b-f90d-4cd5-8489-5175581d5fc2", "webName": "网易邮箱", "name": "ks_196@126.com", "pwd": "5b88e75704ef0cbf963e7d440aae0a3b"}]


if __name__ == '__main__':
    app.run()
