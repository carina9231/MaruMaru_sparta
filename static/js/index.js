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
                console.log(dog_age, dog_gender, dog_name, dog_image)
                let temp_html = `<div class="col">
                    <div class="card">
                        <input type="hidden" id="idx" value="${dog_num}">
                        <img src="/static/profileimg/${dog_image}" class="dog-card-img-top" alt="...">
                        <div class="dog0card-body">
                            <h5 class="dog-card-title"><a href="/profile/${dog_num}">이름 : ${dog_name}</a> </h5>
                            <p class="dog-card-text">
                                나이 : ${dog_age} <br>
                                성벌 : ${dog_gender}<br>
                                자기소개 : ${dog_comment}<br>
                            </p>
                        </div>
                    </div>
                </div>`
                $('#profile_card').append(temp_html)
            }
        }
    })
}

// (function () {
//     var swiper = new Swiper(".slider .swiper-container", {
//         slidesPerView: "auto",
//         spaceBetween: 30,
//         navigation: {
//             nextEl: ".swiper-button-next",
//             prevEl: ".swiper-button-prev",
//         },
//     });
// })();
