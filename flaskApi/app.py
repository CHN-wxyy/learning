from flask import Flask, request, jsonify
import json
import time
from flask_sqlalchemy import SQLAlchemy
import os
from datetime import datetime
# from model.article import Article

app = Flask(__name__)
user = 'root'
password = 123456
database = 'life'
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://%s:%s@127.0.0.1:3306/%s' % (
    user, password, database)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
app.config['WTF_CSRF_ENABLED'] = False

db = SQLAlchemy(app)


class Article(db.Model):
    # 定义表名
    __tablename__ = 'article_info'
    # 定义字段
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(64), unique=True)
    desc = db.Column(db.String(64))
    url = db.Column(db.String(64))
    createDate = db.Column(db.DateTime(10))
    updateDate = db.Column(db.DateTime(10))

    def get_schema(self):
        return {
            'id': self.id,
            'name': self.name,
            'desc': self.desc,
            'url': self.url,
            'createDate': self.createDate,
            'updateDate': self.updateDate
        }


def getNowDate():
    return time.strftime('%Y.%m.%d %H:%M:%S ', time.localtime(time.time()))


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


@app.route('/saveArticle', methods=['POST'])
def saveArticle():
    articleAddress = 'D://website/life/source/'
    data = request.get_data()
    data_json = json.loads(data.decode('UTF-8'))
    name = data_json['name']
    desc = data_json['desc']
    url = data_json['url']
    createDate = data_json['createDate']
    if(name and desc and url and createDate):
        article = Article(name=data_json['name'], desc=data_json['desc'], url=data_json['url'],
                          createDate=data_json['createDate'], updateDate=getNowDate())
        db.session.add(article)
        db.session.commit()
        splitDate = createDate.split('-')
        year = splitDate[0]
        month = splitDate[1]
        date = splitDate[2]
        path = articleAddress + year + '/' + month + '/'
        if not os.path.exists(path):
            os.makedirs(path)
        filePath = path + year + month + date + '.md'
        file = open(filePath, 'w')
        file.close()
        return jsonify({"code": 200, "msg": '请求成功', "data": {"filePath": filePath}})
    else:
        return jsonify({"code": 500, "msg": '缺少请求参数'})
    # return data


@app.route('/getAllArticle', methods=['GET'])
def getArticleList():
    page = request.args.get("page")
    size = request.args.get("size")
    json_articleList = []
    GMT_FORMAT = "%a %b %d %Y %H:%M:%S GMT+0800 (CST)"
    if(page and size):
        page = int(page)
        size = int(size)
        articlList = Article.query.paginate(
            page=page, per_page=size, error_out=False)
        for item in articlList.items:
            articleTemp = {}
            articleTemp = item.get_schema()
            print(articleTemp['createDate'])
            if(articleTemp['createDate']):
                articleTemp['createDate'] = str(articleTemp['createDate'])
            if(articleTemp['updateDate']):
                articleTemp['updateDate'] = str(articleTemp['updateDate'])
            json_articleList.append(articleTemp)
        return jsonify({"code": 200, "data": json_articleList})
    else:
        return jsonify({"code": 500, "msg": "缺少参数"})

    # item = {}
    # json_articleList = []
    # for article in articlList:
    #     item = {}
    #     item['id'] = article.id
    #     item['name'] = article.name
    #     item['desc'] = article.desc
    #     item['url'] = article.url
    #     item['createDate'] = article.createDate
    #     item['updateDate'] = article.updateDate
    #     json_articleList.append(item)


if __name__ == '__main__':
    app.run()
