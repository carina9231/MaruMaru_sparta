$(document).ready(function () {
    show_profile();
})

function show_profile() {
    $.ajax({
        type: "GET",
        url: '/dog-profile/list',
        data: {},
        success: function (response) {
            let dog_profiles = response['all_dog_profile']
            for (let i = 0; i < dog_profiles.length; i++) {
                let dog_name = dog_profiles[i]['name']
                let dog_age = dog_profiles[i]['age']
                let dog_gender = dog_profiles[i]['gender']
                let dog_comment = dog_profiles[i]['comment']
                let dog_image = dog_profiles[i]['file']
                let dog_num = dog_profiles[i]['number']
                let username= dog_profiles[i]['username']

                // let temp_html =  `<div class="card">
                //                     <input type="hidden" id="idx" value="${dog_num}">
                //                     <div class="img">
                //                         <img src="/static/profileimg/${dog_image}", alt="">
                //                         <div class="content">
                //                             <div class="title">이름 : ${dog_name}</div>
                //                              <div class="sub-title">${username}</div>
                //                              <p> 나이 : ${dog_age} <br>
                //                                  성별 : ${dog_gender}<br>
                //                                  자기소개 : ${dog_comment}<br></p>
                //                              <div class="btn">
                //                                     <button><a href="/profile/list/">프로필 보러가기</button>
                //                              </div>
                //                             </div>
                //                         </div>
                //                   </div>`

                let temp_html = `<div class="col">
                    <div class="card">
                    <input type="hidden" id="idx" value="${dog_num}">
                        <img src="/static/profileimg/${dog_image}" class="card-img-top" alt="..." height="310" background-size="cover">
                        <div class="dog-card-body">
                            <h5 class="dog-card-title"><a href="/profile/${dog_num}">이름 : ${dog_name}</a></h5>
                            <p> 나이 : ${dog_age} <br>
                                성별 : ${dog_gender}<br>
                                자기소개 : ${dog_comment}<br></p>
                        </div>
                    </div>
                </div>`
                $('#profile_card').append(temp_html)
            }
        }
    })
}
