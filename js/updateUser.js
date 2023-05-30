//이지민 작성

//유효성 체크 메세지 보여주는 함수
const showMessage = (targetId, message, isError) => {
    const borderColor = isError ? 'red' : '';
    const textColor = isError ? 'red' : '#A5A5A5';
    $(`#${targetId}`).css('border-color', borderColor);
    $(`#${targetId}-checktext`).css('color', textColor).text(message);
};

//비밀번호 유효성 검사
const password_inputcheck = () => {
    //영문자, 숫자, 특수문자(!@#$%^&*)를 조합한 8~20자의 문자열
    const passwordReg = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,20}$/;
    const password = document.getElementById("password").value;

    if (passwordReg.test(password)){
        //유효한 비밀번호 형식
        showMessage('password', '', false);
        return true;
    }
    else if (password === ""){
        //비어있을 경우
        showMessage('password', '비밀번호를 입력해주세요.', true);
        return false;
    }
    else {
        //유효하지 않은 비밀번호 형식
        showMessage('password', '8~20자로 영문자, 숫자, 특수문자를 포함하여 입력해주세요.', true);
        return false;
    }
};

//비밀번호 확인 유효성 검사
const repassword_inputcheck = () => {
    const password = document.getElementById("password").value;
    const repassword = document.getElementById("repassword").value;
    
    if (repassword === "") {
        //비어있을 경우
        showMessage('repassword', '비밀번호를 입력해주세요.', true);
        return false;
    }
    else if (password === repassword){
        //비밀번호와 비밀번호 확인이 일치하는 경우
        showMessage('repassword', '비밀번호가 일치합니다.', false);
        $("#repassword-checktext").css('color', '#40BBCA');
        return true;
    }
    else {
        //비밀번호와 비밀번호 확인이 일치하지 않는 경우
        showMessage('repassword', '일치하지 않습니다. 비밀번호를 다시 입력해주세요.', true);
        return false;
    }
};

//이름 유효성 검사
const name_inputcheck = () => {
    //한글로 된 문자열
    const nameReg = /^[가-힣]+$/;
    const name = document.getElementById("name").value;
  
    if (nameReg.test(name)) {
        //유효한 이름 형식
        showMessage('name', '', false);
        return true;
    } else if (name === "") {
        //비어있을 경우
        showMessage('name', '이름을 입력해주세요.', true);
        return false;
    } else {
        //유효하지 않은 이름 형식
        showMessage('name', '한글로 입력해주세요.', true);
        return false;
    }
};
  
//학번 유효성 검사
const student_id_inputcheck = () => {
    //숫자로 된 문자열
    const student_idReg = /^[0-9]+$/;
    const student_id = document.getElementById("student_id").value;
    
    if (student_idReg.test(student_id)) {
        //유효한 학번 형식
        showMessage('student_id', '', false);
        return true;
    } else if (student_id === "") {
        //비어있을 경우
        showMessage('student_id', '학번을 입력해주세요.', true);
        return false;
    } else {
        //유효하지 않은 학번 형식
        showMessage('student_id', '숫자로 입력해주세요.', true);
        return false;
    }
};

//상태, 교과적용년도, 학년, 학과 입력 체크
const select_inputcheck = (inputId, checktextId) => {
    const select = document.getElementById(inputId);
    const checktext = document.getElementById(checktextId);

    if (select.value === "선택") {
        //선택하지 않은 경우
        select.style.borderColor = "red";
        checktext.style.color = "red";
        checktext.innerHTML = "선택해주세요.";
        return false;
    } else {
        //선택한 경우
        select.style.borderColor = "";
        checktext.innerHTML = "";
        return true;
    }
};

//파일 입력 체크
const file_inputcheck = () => {
    const grade = document.getElementById("grade").value;
    const fileInput = document.getElementById('file');
    const fileName = fileInput.value.trim();
    //pdf 형식 제한
    const fileEx = /(\.pdf)$/i;

    if (fileName === ''){
        //1학년일 경우 입력하지 않아도 됨
        if (grade === '1') {
            showMessage('file', '1-1 신입생의 경우 이수내역확인표는 추가하지 않아도 됩니다.', false);
            return true;
        }
        else {
            showMessage('file', '2, 3, 4학년은 이수내역확인표를 추가해주세요.', true);
            return false;
        }
    }
    //pdf 형식으로만 입력 가능
    else if (!fileEx.exec(fileName)) {
        showMessage('file', 'pdf형식으로 입력해주세요.', true);
        return false;
    }
    else {
        showMessage('file', '1-1 신입생의 경우 이수내역확인표는 추가하지 않아도 됩니다.', false);
        return true;
    }

}

//전체 유효성 검사
const validateForm = () => {
    if (!password_inputcheck()){
        //비밀번호 유효성 검사 실패
        return false;
    }
    if (!repassword_inputcheck()){
        //비밀번호 확인 유효성 검사 실패
        return false;
    }
    if (!name_inputcheck()){
        //이름 유효성 검사 실패
        return false;
    }
    if (!student_id_inputcheck()){
        //학번 유효성 검사 실패
        return false;
    }
    if (!select_inputcheck('academic_status', 'academic_status-checktext')){
        //선택 항목 미입력
        return false;
    }
    if (!select_inputcheck('curriculum_year', 'curriculum_year-checktext')){
        //선택 항목 미입력
        return false;
    }
    if (!select_inputcheck('grade', 'grade-checktext')){
        //선택 항목 미입력
        return false;
    }
    if (!select_inputcheck('major', 'major-checktext')){
        //선택 항목 미입력
        return false;
    }
    if (!file_inputcheck()){
        //파일 유효성 검사 실패
        return false;
    }
    //모든 입력이 유효한 경우
    return true;
};


document.addEventListener('DOMContentLoaded', function() {
    // 사용자 정보를 가져와서 폼에 설정하는 함수
    async function setUserInfo() {
        try {
            // 사용자 정보 가져오기 AJAX 요청
            const response = await fetch('../php/getUserInfo.php', {
                method: 'GET'
            });

            if (response.ok) {
                const userInfo = await response.json();

                // 폼 요소 가져오기
                const idInput = document.getElementById('id');
                const passwordInput = document.getElementById('password');
                const nameInput = document.getElementById('name');
                const student_idInput = document.getElementById('student_id');
                const academic_statusInput = document.getElementById('academic_status');
                const curriculum_yearInput = document.getElementById('curriculum_year');
                const gradeInput = document.getElementById('grade');
                const majorInput = document.getElementById('major');
                const double_majorInput = document.getElementById('double_major');
                const minorInput = document.getElementById('minor');

                // 사용자 정보를 폼에 설정
                idInput.value = userInfo[0].user_id;
                passwordInput.value = userInfo[0].user_pw;
                nameInput.value = userInfo[0].name;
                student_idInput.value = userInfo[0].academic_number;
                academic_statusInput.value = userInfo[0].status;
                curriculum_yearInput.value = userInfo[0].curriculum_year;
                gradeInput.value = userInfo[0].grade;
                majorInput.value = userInfo[0].major;
                double_majorInput.value = userInfo[0].double_major;
                minorInput.value = userInfo[0].minor;
            } else {
                console.error('사용자 정보를 가져오는 도중 오류가 발생했습니다.');
            }
        } catch (error) {
            console.log(error);
            console.error('사용자 정보를 가져오는 도중 오류가 발생했습니다.');
        }
    }

    // 페이지 로드 시 사용자 정보 설정
    setUserInfo();
});

// 폼 제출 이벤트 핸들러
const form = document.querySelector('#update-form');
form.addEventListener("submit", async function(event) {
    event.preventDefault(); // 폼 제출 이벤트 취소

    const isValid = validateForm();

    try {
        if (isValid) {
            const formData = new FormData(form); // 폼 데이터 가져오기

            const updateResponse = await fetch("../php/updateUser.php", {
                method: "POST",
                body: formData
            });
            if (updateResponse.ok) {
                const updateData = await updateResponse.text();
                console.log(updateData); // 서버에서 반환한 데이터 출력
                alert("회원정보 수정이 완료되었습니다.");
                window.location.href = '../html/myPage.html'; // 페이지 이동
            } else {
                console.error("회원정보 수정 요청이 실패하였습니다.");
            }
        } else {
            alert("입력한 내용을 다시 확인해주세요.");
            return false;
        }
    } catch (error) {
        console.log(error);
    }
});