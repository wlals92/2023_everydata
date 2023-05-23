//이지민 작성

//입력이 비어있는지 확인
const checkField = (fieldId, checkText) => {
    const fieldValue = $(`${fieldId}`).val();
    if (fieldValue === '') {
        alert(checkText)
        return true;
    }
    else{
        return false;
    }
}

//아이디 저장
const saveIDToLocalStorage = () => {
    // 체크박스가 선택되어 있는지 확인
    const saveIdChecked = $('#save-id').prop('checked');
    if (saveIdChecked) {
        const id = $('#id').val(); // 아이디 입력란의 값을 가져옴
        localStorage.setItem('savedId', id); // localStorage에 아이디 저장
    }
    else{
        localStorage.removeItem('savedId'); 
        // 아이디 저장이 선택되어 있지 않은 경우 localStorage에서 아이디 삭제
    }
}

//로그인 폼 제출
$('#login-form').submit(function(event) {
    event.preventDefault(); //폼 제출 이벤트 취소
    saveIDToLocalStorage(); // 아이디 저장 체크박스의 상태에 따라 localStorage에 아이디를 저장하거나 삭제

    const idIsEmpty = checkField('id', '아이디를 입력해주세요.');
    const passwordIsEmpty = checkField('password', '비밀번호를 입력해주세요.');

    //아이디와 비밀번호가 모두 비어있지 않을 경우 로그인 시도
    if (!idIsEmpty && !passwordIsEmpty){
        const id = $('#id').val();
        const password = $('#password').val();

        //서버로 아이디, 비밀번호 전송
        $.ajax({
            type:'POST',
            url:'/login',
            data:{
                id:id,
                password:password
            },
            success: function(response) {
                if (response.success){
                    alert('로그인에 성공하였습니다.');
                    window.location.href='/main';
                }
                else {
                    alert('아이디 또는 비밀번호가 잘못되었습니다.');
                }
            },
            error: function(error) {
                alert('서버 요청 실패: '+error.statusText);
            }
        });
    }
})