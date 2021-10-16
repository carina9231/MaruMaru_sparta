$(document).ready(function () {
    show_all_profile();
});

function show_all_profile() {
    $.ajax({
        type: "GET",
        url: "/dogprofile/list",
        data: {},
        success: function (response) {
            let profiles = response['all_profile']
            console.log(profiles)
            for (let i = 0; i < profiles.length; i++) {
                let name = profiles[i]['name']
                let age = profiles[i]['age']
                let gender = profiles[i]['gender']
                let comment = profiles[i]['comment']
                let image = profiles[i]['file']
                let number = profiles[i]['number']


                let temp_html = `<div class="card color-card">
                                    <ul>
                                      <a onclick="like()"><li><i class="far fa-heart i-r w"></i></li></a>
                                    </ul>
  
                                    <div class="card_top">
                                      <div>
                                        <div class="profile_img">
                                        <img class="dog_img" src="/static/profileimg/${image}">
                                        </div>
                                      </div>
                                      <div>
                                        <p class="name desc">${name}</p>
                                      </div>
                                      <div class="desc">
                                        <p class="age">나이: ${age}</p>
                                        <p class="gender">성별: ${gender}</p>
                                      </div>
                                      <hr>
                                      <div class="desc comment" style="font-size: 20px">
                                        <p>${comment}</p>
                                      </div>
                                      <button class="btn color-a top mt-5" onclick = "location.href ='/profile/${number}'">자세히 보기</button>
                                    </div>
                                    <input type="hidden" value="${number}" id="${number}card">
                                  </div>`

                $('#profile_card').append(temp_html)
            }
        }
    })
}
