from flask import Flask, render_template, request, jsonify
from pymongo import MongoClient

from datetime import datetime
import getLating

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
def posts_list():
    articles = list(db.articles.find({}, {'_id': False}))
    return jsonify({'all_articles': articles})


# 메인페이지에 프로필 카드 보여주기
@app.route('/profile_list', methods=['GET'])
def show_profile():
    profiles = list(db.profile.find({}, {'_id': False}))
    return jsonify({'all_profile': profiles})


# 지도 맵핑
@app.route('/map', methods=['GET'])
def mapping():
    id = request.args["id"]
    address = db.articles.find_one({'number': int(id)}, {'_id': False})['address']
    address_coor = getLating.getLatLng(address)
    print(address_coor)
    return render_template('locate_map.html', lat=address_coor[0], lon=address_coor[1])


# 디테일 페이지 불러오기
@app.route('/detail/<id>')
def detail(id):
    # find 쓰면 pymongo.cursor.Cursor 오류나요
    articles = db.articles.find_one({'number': int(id)}, {'_id': False})
    # print(articles)
    return render_template("detail.html", id=id, detail_db=articles)


# 수정 create 위한 페이지 불러오기
@app.route('/detail/<id>/upload', methods=['GET'])
def detail_upload(id):
    print(id)
    post = db.articles.find_one({'number': int(id)}, {'_id': False})
    print(post)
    return render_template("detail_upload.html", post=post, id=id)


# 수정 api
@app.route('/detail/upload', methods=['POST'])
def detail_post_upload():
    id_receive = request.form["id_give"]
    title_receive = request.form["title_give"]
    contents_receive = request.form["contents_give"]
    print(id_receive)
    print(title_receive)
    print(contents_receive)
    db.articles.update_one({'number': int(id_receive)}, {'$set': {'title': title_receive}})
    db.articles.update_one({'number': int(id_receive)}, {'$set': {'contents': contents_receive}})

    return jsonify({'result': 'success', 'msg': '게시물을 수정합니다!'})


# 삭제  api
@app.route('/detail/delete', methods=['POST'])
def post_delete():
    id_receive = request.form["id_give"]
    db.articles.delete_one({'number': int(id_receive)})
    return jsonify({'result': 'success', 'msg': '게시글을 정말 삭제하시려구요!?'})


# 게시물 작성페이지 불러오기
@app.route('/posts/')
def show_posts_upload():
    return render_template('post upload.html')


@app.route('/posts/', methods=['POST'])
def post_upload():
    author_receive = request.form['author_give']
    title_receive = request.form['title_give']
    address_receive = request.form['address_give']
    contents_receive = request.form['content_give']
    filename_receive = request.form['filename_give']

    file = request.files['file_give']

    extension = file.filename.split('.')

    today = datetime.now()
    mytime = today.strftime('%Y년 %m월 %d일 %H:%M:%S')

    filename = f'{mytime}-{extension[0]}'
    print(filename)

    filename = "".join(i for i in filename if i not in "\/:*?<>|")

    print(filename)
    save_to = f'static/{filename}.{extension[1]}'
    file.save(save_to)

    count = db.articles.count()
    # 게시글 삭제시 중복 가능 ->   존재하는  number +1 로 바꿔야함
    if count == 0:
        count = 1
    elif count > 0:
        count = count + 1

    doc = {
        'author': author_receive,
        'title': title_receive,
        'contents': contents_receive,
        'address': address_receive,
        'number': count,
        'file': f'{filename}.{extension[1]}',
        'present_time': mytime
    }

    db.articles.insert_one(doc)
    return jsonify({'msg': '저장 완료!'})


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)
