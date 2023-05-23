//이지민 작성

//비밀번호 결과
// $.ajax({
//     url: "/findPasswordResult",
//     type: "GET",
//     dataType: "json",
//     success: function(data) {
//       const name = data.name;
//       const id = data.id;
//       const password = data.password;
//       const hiddenPassword = "*".repeat(password.length - 5) + password.slice(-5);
  
//       document.getElementById("password-result").textContent = `${name}(${id})님의 비밀번호는 ${hiddenPassword}입니다.`;
//     },
//     error: function(xhr, status, error){
//       console.log(xhr);
//       console.log(status);
//       console.log(error);
//     }
// });

//임의 실행
const tempUser = { id: "jm123456", name: "이지민", password: "jm1234567890!@" };
const hiddenPassword = "*".repeat(tempUser.password.length - 5) + tempUser.password.slice(-5);
const password_result = document.getElementById("password-result");

const passwordText = document.createElement("span");
passwordText.textContent = hiddenPassword;
passwordText.style.fontWeight = "bold";
passwordText.style.color = "#40BBCA";

password_result.innerHTML = `${tempUser.name}(${tempUser.id})님의 비밀번호는<br> [ ${passwordText.outerHTML} ]입니다.`;
