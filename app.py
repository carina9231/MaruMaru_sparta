from flask import Flask, render_template, request, jsonify
from pymongo import MongoClient

app = Flask(__name__)

client = MongoClient('localhost', 27017)
db = client.marumaru


# 메인페이지 불러오기
@app.route('/')
def main():
    return render_template('index.html')


# 게시물목록 페이지 불러오기
@app.route('/posts')
def show_posts():
    return render_template('post_list.html')

@app.route('/posts_list', methods=['GET'])
def posts_list() :
    articles = list(db.articles.find({}, {'_id': False}))
    return jsonify({'all_articles': articles})

# 메인페이지에 프로필 카드 보여주기
@app.route('/profile_list', methods=['GET'])
def show_profile():
    profiles = list(db.profile.find({}, {'_id': False}))
    return jsonify({'all_profile': profiles})


# 디테일 페이지
@app.route('/detail/<id>')
def detail(id):
    # find 쓰면 pymongo.cursor.Cursor 오류나요
    articles = db.articles.find_one({'number': int(id)}, {'_id': False})
    print(articles)
    return render_template("detail.html", id=id, detail_db=articles)


# 게시물 작성페이지 불러오기
@app.route('/posts/create')
def show_posts_upload():
    return render_template('post upload.html')


@app.route('/posts/create', methods=['POST'])
def post_upload():
    author_receive = request.form['author_give']
    title_receive = request.form['title_give']
    address_receive = request.form['address_give']
    contents_receive = request.form['contents_give']

    file = request.files['file_give']
    print(file)

    save_to = 'static/mypicture.jpg'
    file.save(save_to)

    count = db.articles.count()
    # 게시글 삭제시 중복 가능 ->   존재하는  number +1 로 바꿔야함
    if count == 0 :
        count = 1
    elif count >0 :
        count = count+1

    doc = {
        'author': author_receive,
        'title': title_receive,
        'contents': contents_receive,
        'address': address_receive,
        "number": count,
    }

    db.articles.insert_one(doc)
    return jsonify({'msg': '저장 완료!'})


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)
