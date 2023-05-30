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
};

//임시 이동
document.getElementById('find-form_submit').onclick = function(event) {
    event.preventDefault();

    console.log("제출 클릭");
    location.href="findPasswordResult.html";
};


//비밀번호 찾기
// $('#find-form').submit(function(event) {
//     event.preventDefault(); //폼 제출 이벤트 취소

//     const idIsEmpty = checkField('id', '아이디를 입력해주세요.');
//     const nameIsEmpty = checkField('name', '이름을 입력해주세요.');
//     const student_idIsEmpty = checkField('student_id', '학번을 입력해주세요.');

//     //아이디, 이름, 학번이 모두 비어있지 않을 경우 비밀번호 찾기 시도
//     if (!idIsEmpty && !nameIsEmpty && !student_idIsEmpty){
//         const id = $('#id').val();
//         const name = $('#name').val();
//         const student_id = $('#student_id').val();

//         //서버로 아이디, 이름, 학번 전송
//         $.ajax({
//             type:'POST',
//             url:'/findpw',
//             data:{
//                 id:id,
//                 name:name,
//                 student_id:student_id
//             },
//             success: function(response) {
//                 if (response.success){
//                     location.href="findPasswordResult.html";
//                 }
//                 else {
//                     alert('등록된 정보가 없습니다. 입력을 확인해주세요.');
//                 }
//             },
//             error: function(error) {
//                 alert('서버 요청 실패: '+error.statusText);
//             }
//         });
//     }
// })