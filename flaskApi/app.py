from flask import Flask, request
import json

app = Flask(__name__)


@app.route('/')
def index():
    return 'hello flask'


@app.route('/getData', methods=['GET'])
def getData():
    webName = request.args.get("webName")
    with open(r'D:\website\wxyy-static\data-source.json', 'rb') as f:
        data = json.load(f)
        filterData = [o for o in data if o['webName'].find(webName) != -1]
    return {'data': filterData}


if __name__ == '__main__':
    app.run()
