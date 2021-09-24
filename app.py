from flask import Flask, render_template, request, jsonify
from pymongo import MongoClient
app = Flask(__name__)

client = MongoClient('localhost', 27017)
db = client.dogMeet

# 메인페이지 불러오기
@app.route('/')
def main():
    return render_template('index.html')

# 게시물목록 페이지 불러오기
@app.route('/posts')
def show_posts():
    return render_template('post_list.html')

# 메인페이지에 프로필 카드 보여주기
@app.route('/profile_list', methods=['GET'])
def show_profile():
    profiles = list(db.profile.find({}, {'_id': False}))
    return jsonify({'all_profile': profiles})

if __name__ == '__main__':
    app.run('0.0.0.0',port=5000,debug=True)