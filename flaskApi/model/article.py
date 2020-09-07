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