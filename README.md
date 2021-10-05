## 스파르타 내일배움캠프 1차 프로젝트
### 🐶강만다(강아지를 만나다) - 스파르타 내일배움캠프 1차 프로젝트

<p align='center'>
  <img src="./static/logo2.png" width="500ㅔㅌ" />
</p>
배포 링크 : http://ec2-13-124-236-87.ap-northeast-2.compute.amazonaws.com/
<br/>


## 🏠 소개

+ 반려견을 위한 반려견의 의한 반려 동반자의 커뮤니티 사이트

<br/>


## ⏲️ 개발기간

+ 2021.09.23 ~ 2021.10.01
<br/>


## 🧙 맴버구성

<table>
    <tr>
        <td align="center" width="130px" height="160px">
            <a href="https://github.com/thalals"><img height="100px" width="100px" src="https://avatars.githubusercontent.com/u/42319300?s=460&u=feb753590ea1a1d094b08573bb11f15e801e63cc&v=4" /></a>
          <br />
            <a href="https://github.com/thalals">박형민(팀장)</a>
      </td>
      <td align="center" width="130px" height="160px">
                  <a href="https://github.com/sendkite1"><img height="100px" width="100px" src="https://user-images.githubusercontent.com/42319300/135604950-2cf4e5fd-8cf4-4941-8a00-77e0cd982751.jpg" /></a>
                <br />
                  <a href="https://github.com/sendkite">전송연</a>
            </td>
  </tr>
  <tr>
        <td align="center" width="130px" height="160px">
            <a href="https://github.com/carina9231"><img height="100px" width="100px" src="https://user-images.githubusercontent.com/42319300/135605305-2b71e4a7-c01d-4349-a1d8-dc8132584d99.jpg" /></a>
          <br />
            <a href="https://github.com/carina9231">배소영</a>
      </td>
      <td align="center" width="130px" height="160px">
                  <a href="https://github.com/jenny0325"><img height="100px" width="100px" src="https://user-images.githubusercontent.com/42319300/135706447-06ba949f-ec19-462b-81c6-c5b297bbfc45.jpg" /></a>
                <br />
                  <a href="https://github.com/jenny0325">김재은</a>
            </td>
  </tr>

</table>

<br/>


## 📌 기술 선택 이유!

<p align='center'>
<img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=HTML5&logoColor=white"/></a> 
<img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=CSS3&logoColor=white"/></a> 
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=JavaScript&logoColor=white"/></a> 
<img src="https://img.shields.io/badge/python-5483B1?style=flat-square&logo=python&logoColor=white"/></a> 
<img src="https://img.shields.io/badge/flask-232F3E?style=flat-square&logo=flask&logoColor=white"/></a> 
<img src="https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=MongoDB&logoColor=white"/></a>
<img src="https://img.shields.io/badge/Amazon AWS-BD8B13?style=flat-square&logo=Amazon%20AWS&logoColor=white"/></a> 
</p>

+ 내일배움캠프를 통해 배운 기술들을 더 발전시키기 위하여 강의를 통해 배운 HTML, JavaScript, Ajax, Flask, MongoDB 등을 활용

<br/>



## 📌 주요 기능

1. 슬라이드 기능이 들어간 프로필 소개
2. 카카오 API 를 활용한 지도 모달창
3. 지도 카데고리별 커스텀 검색 결과 제공
4. ajax를 활용한 게시글 CRUD 기능
5. jinja2 템플릿 언어를 사용한 상세페이지 기능
6. Ajax와 mongoDB 기능을 활용한 비동기 댓글 기능

<br/>

## 📌 문제를 이렇게 해결했어요!
#### 문제 상황 
```
 1. 상세페이지의 Delete 기능이 시 댓글 DB가 삭제되지 않는 점
   + 이를 collection 구조 수정과 MongoDB 명령어 $addToSet 기능을 통해 해결

 2. 모달 창안에 단순 파일 렌더링 시, Script가 읽히지 않음
   + Iframe을 이용하여 모달 안에 웹페이지를 렌더링(삽입)

 3. 사진파일 저장 시 특수문자 에러
   + 조건식을 이용하여 특수문자 제거 후 DB 저장

```
<br/>

### 🔗 라이브
[![오지조 1차 발표](http://img.youtube.com/vi/4BzMYLfXwS0/0.jpg)](https://www.youtube.com/watch?v=4BzMYLfXwS0) 
