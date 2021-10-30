$(document).ready(function () {
    bsCustomFileInput.init();

    $.ajax({
        type: "GET",
        url: "/user_info",
        data: {},
        success: function (response) {
            let user_info = response['user_info']
            $('.thumbnail').attr("src","/static/"+user_info.profile_pic)
            $('#username').attr("placeholder",user_info.username)
            $('#name').attr("placeholder",user_info.profile_name)
            $('#description').attr("placeholder",user_info.profile_info)

        //    댕댕쓰
            let baby_info = response['profile_info']
            console.log(baby_info)
            for(let i=0; i<baby_info.length;i++){
                let temp_html=`<div class="card color-card">
                                    <ul>
                                        <a href="javascript:void(0);" onclick="ProfileLike(${baby_info[i].number})">
                                             <i class="fas fa-heart" title="좋아요"></i>
                                        </a>
                                    </ul>
                
                                    <div class="card_top">
                                        <div>
                                            <div class="profile_img">
                                                <img class="dog_img" src="/static/profileimg/${baby_info[i].file}">
                                            </div>
                                        </div>
                                        <div>
                                            <p class="name desc">${baby_info[i].name}</p>
                                        </div>
                                        <div class="desc">
                                            <p class="age">나이: ${baby_info[i].age}</p>
                                            <p class="gender">성별: ${baby_info[i].gender}</p>
                                        </div>
                                        <hr>
                                        <div class="desc comment" style="font-size: 15px">
                                            <p>${baby_info[i].comment}</p>
                                            <button class="btn color-a top mt-5"
                                                    onclick="location.href ='/profile/${baby_info[i].number}'">자세히 보기
                                            </button>
                                        </div>
                
                                    </div>
                                    <input type="hidden" value=${baby_info[i].number} id="${baby_info[i].number}card">
                                </div>`
                $('#baby_list').append(temp_html)
            }
        }
    })
})



function create_baby_profile() {
    var popup = window.open('/profile/create', '네이버팝업', 'width=700px,height=700px,scrollbars=yes');
    popup.onbeforeunload=function (){
        window.location.reload();
    }
}

function ProfileLike(number) {

    const profile_id = number

    $.ajax({
        type: "POST",
        url: "/dogprofile/like",
        data: {id_give: profile_id},
        success: function (response) {
            alert(response['msg'])
            window.location.reload();
        }
    })
}