$(document).ready(function () {
    show_events();
    console.log("hi")
});

$(function () {
    $("#datepicker").datepicker({
        dateFormat: "yy-mm-dd",
        changeMonth: true,
        changeYear: true,
        nextText: '다음 달',
        prevText: '이전 달',
        dayNames: ['월요일', '화요일', '수요일', '목요일', '금요일', '토요일', '일요일'],
        dayNamesMin: ['월', '화', '수', '목', '금', '토', '일'],
        monthNamesShort: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']
    });
    $("#anim").on("change", function () {
        $("#datepicker").datepicker("option", "showAnim", $(this).val());
    });
})

function show_events() {
    let idx = location.search.substr(location.search.indexOf("?") - 1)
    $.ajax({
        type: 'GET',
        url: '/event/modify',
        data: {id_give: idx},
        success: function (response) {
            let events = response['all_events']
            console.log(events)
            for (let i = 0; i < events.length; i++) {
                let title = events[i]['title']
                let date = events[i]['date']
                let address = events[i]['address']
                let contents = events[i]['contents']
                let max = events[i]['max']

                let temp_html = `<div class="half">
                                    <div class="name">
                                        <label for="name">행사 이름</label>
                                        <input type="text" id="name" placeholder="내용을 입력해주세요" value="${title}">
                                    </div>
                                    <div class="address">
                                        <label for="address">행사 장소</label>
                                        <input onclick="address_input()" type="text" id="address" placeholder="주소를 입력해주세요" value="${address}">
                                    </div>
                                    <div class="date">
                                        <label for="date">행사 날짜</label>
                                        <input type="text" id="datepicker" placeholder="날짜를 선택해주세요" value="${date}">
                                    </div>
                                    <div class="attend">
                                        <label for="attend">행사 참가 가능 인원</label>
                                        <input type="number" id="attend" placeholder="0" min="1" max="100" value="${max}">
                                    </div>
                                </div>
                                <div class="half">
                                    <div class="message">
                                        <label for="message">
                                            <span>내용</span>
                                            <span class="point">*</span>
                                            <span class="length">(<span>0</span> / 3000)</span>
                                        </label>
                                        <textarea id="message" placeholder="내용을 입력주해세요">${contents}</textarea>
                                    </div>
                                    <div class="action">
                                        <button onclick="save_event_upload()" onchange="save_event_upload()" type="button">저장</button>
                                    </div>
                                </div>`
                $('#content').append(temp_html)
            }
        }
    });
}


function save_event_upload() {
    const new_id = location.search.substr(location.search.indexOf("?") - 1)
    const new_title = $("#name").val()
    const new_address = $("#address").val()
    const new_content = $("#message").val()
    const new_date = $("#datepicker").val()
    const new_max = $("#attend").val()
    if (new_title.length == 0) {
        alert("제목을 입력해주세요.");
        return;
    }
    if (new_content.length == 0) {
        alert("수정 내용을 입력해주세요.");
        return;
    }
    if (new_date.length == 0) {
        alert("수정 내용을 입력해주세요.");
        return;
    }
    if (new_max.length == 0) {
        alert("수정 내용을 입력해주세요.");
        return;
    }

    $.ajax({
        type: "PUT",
        url: `/event/modify`,
        data: {
            id_give: new_id,
            title_give: new_title,
            contents_give: new_content,
            address_give: new_address,
            date_give: new_date,
            max_give: new_max
        },
        success: function (response) {
            alert(response["msg"])
            window.location.href = `/event/detail?id_give=${new_id}`
        },
        error: function (request, status, error) {
            alert(error);
        }
    });
}

function address_input() {
    new daum.Postcode({
        oncomplete: function (data) {
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분입니다.

            // 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            var roadAddr = data.roadAddress; // 도로명 주소 변수
            var extraRoadAddr = ''; // 참고 항목 변수

            // 법정동명이 있을 경우 추가한다. (법정리는 제외)
            // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
            if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
                extraRoadAddr += data.bname;
            }
            // 건물명이 있고, 공동주택일 경우 추가한다.
            if (data.buildingName !== '' && data.apartment === 'Y') {
                extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
            }
            // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
            if (extraRoadAddr !== '') {
                extraRoadAddr = ' (' + extraRoadAddr + ')';
            }

            // 우편번호와 주소 정보를 해당 필드에 넣는다.
            // document.getElementById('sample4_postcode').value = data.zonecode;
            // document.getElementById("sample4_roadAddress").value = roadAddr;
            // document.getElementById("sample4_jibunAddress").value = data.jibunAddress;
            document.getElementById("address").value = roadAddr;
        }
    }).open();
};