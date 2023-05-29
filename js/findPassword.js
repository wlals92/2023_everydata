//이지민 작성

//입력이 비어있는지 확인
const checkField = (fieldId, checkText) => {
    const fieldValue = $(fieldId).val();
    if (fieldValue == '') {
        alert(checkText);
        return true;
    }
    else{
        return false;
    }
};

// 비밀번호 찾기
$('#find-form').submit(async function(event) {
    event.preventDefault(); //폼 제출 이벤트 취소

    const idIsEmpty = checkField('#id', '아이디를 입력해주세요.');
    const nameIsEmpty = checkField('#name', '이름을 입력해주세요.');
    const student_idIsEmpty = checkField('#student_id', '학번을 입력해주세요.');

    //아이디, 이름, 학번이 모두 비어있지 않을 경우 비밀번호 찾기 시도
    if (!idIsEmpty && !nameIsEmpty && !student_idIsEmpty){

        try {
            const formData = {
                id: $('#id').val(),
                name: $('#name').val(),
                student_id: $('#student_id').val()
            };

            const response = await fetch('../php/findPassword.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const data = await response.json();

                if (data.success) {
                    // 비밀번호 찾기에 성공한 경우
                    const name = data.name;
                    const id = data.user_id;
                    const password = data.user_pw;
                    const hiddenPassword = "*".repeat(password.length - 5) + password.slice(-5);
                    $('.find-wrapper').empty();

                    // 요소 추가
                    $('.find-wrapper').append('<h2>비밀번호 찾기</h2>');
                    $('.find-wrapper').append('<div id="password-result_msg">*비밀번호는 뒤 5자리만 공개합니다.</div>');
                    $('.find-wrapper').append('<div class="find-result" id="password-result_box">');
                    $('#password-result_box').append(`<div id="password-result">${name}(${id})님의 비밀번호는 ${hiddenPassword}입니다.</div>`);
                    $('.find-wrapper').append('<button class="find-result" onclick="location.href=\'../index.html\';">로그인하러 가기</button>');
                } else {
                    alert('등록된 정보가 없습니다. 입력을 확인해주세요.');
                }
            } else {
                throw new Error('서버 요청 실패');
            }
        } catch (error) {
            console.log('서버 요청 실패: ' + error.message);
        }
    }
});