(() => {
    /* ==============
        계정 DB
       ============== */
    const ACCOUNTS = {
        accounts: [
            {
                id: "example1234",
                password: "84af3416396292b23991dfd43f630b6394ed61af201a001001ab93bd57446600",
                salt: 'sans',
                name: "example",
                email: "example1234@example.com"
            }
        ]
    };



    /* ==============
        ID 입력
       ============== */

    // ID 유효성 확인 정규식
    const REGEX_ID = /^[a-z]+[a-z0-9]{5,31}$/;
    // 사용 가능한 ID 문장 표시 span 요소
    const idAvailableSpan = document.getElementById('id-available');
    // ID 입력란
    const inputID = document.getElementById("input-id");

    // ID 입력란 입력 이벤트
    inputID.addEventListener('input', () => { checkId(false); });

    // ID 입력칸에 Enter 입력 시 중복 확인
    inputID.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') checkId(true);
    });

    // 중복 확인 버튼
    const btnCheckIdDupe = document.getElementById("btn-check-id-dupe");

    // 중복 확인 버튼 클릭
    btnCheckIdDupe.addEventListener('click', () => { checkId(true); });

    function checkId(_checkDuplicate) {
        const id = inputID.value;
        // 공백 ID
        if (!id || id.length <= 0) {
            idAvailableSpan.style.visibility = 'hidden';
            inputID.classList.add('input-invalid');
            warn('warning-id', '아이디를 입력해주세요.');
        }
        // 이미 사용중인 ID - 중복 확인할때만 checkDupe 함수 호출
        else if (_checkDuplicate && checkDuplicate(id)) {
            idAvailableSpan.style.visibility = 'hidden';
            inputID.classList.add('input-invalid');
            warn('warning-id', '이미 사용중인 아이디입니다.');
        }
        // 사용중이 아니고 유효한 ID일 경우
        else if (validateID(id)) {
            // 중복 확인할때만 사용 가능 span 표시
            if (_checkDuplicate) idAvailableSpan.style.visibility = 'visible';
            inputID.classList.remove('input-invalid');
            resetWarning('warning-id');
            return true;
        }
        // 유효하지 않은 ID
        else {
            idAvailableSpan.style.visibility = 'hidden';
            inputID.classList.add('input-invalid');
            warn('warning-id', "아이디 형식이 올바르지 않습니다.");
        }
        return false;
    }

    // ID 중복 확인 함수
    function checkDuplicate(id) {
        return ACCOUNTS.accounts.some(account => {
            return account.id === id;
        });
    }

    // ID 유효성 확인 함수
    function validateID(id) {
        return REGEX_ID.test(id);
    }



    /* ==============
        비밀번호, 비밀번호 확인 입력
       ============== */

    // 비밀번호 유효성 확인 정규식
    const REGEX_PW = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+\.]).{8,32}$/;

    // 비밀번호 입력란
    const inputPW = document.getElementById("input-password");
    // 비밀번호 입력란 입력 이벤트
    inputPW.addEventListener('input', () => {
        checkPassword();
        checkPasswordConfirm();
    });

    // 비밀번호 확인 입력란
    const inputPWConfirm = document.getElementById('input-password-confirm');
    // 비밀번호 확인 입력 이벤트
    inputPWConfirm.addEventListener('input', checkPasswordConfirm);

    // 비밀번호 확인
    function checkPassword() {
        const password = inputPW.value;
        // 유효한 Password
        if (validatePassword(password)) {
            inputPW.classList.remove('input-invalid');
            resetWarning('warning-password');
            return true;
        }
        // 공백 Password
        else if (!password || password <= 0) {
            inputPW.classList.add('input-invalid');
            warn('warning-password', '비밀번호를 입력해주세요.');
        }
        else {
            inputPW.classList.add('input-invalid');
            warn('warning-password', "비밀번호 형식이 올바르지 않습니다.");
        }
        return false;
    }

    // 비밀번호 확인란 확인
    function checkPasswordConfirm() {
        const password = inputPW.value;
        const passwordConfirm = inputPWConfirm.value;
        // 공백 Password
        if (!passwordConfirm || passwordConfirm <= 0) {
            inputPWConfirm.classList.add('input-invalid');
            warn('warning-password-confirm', '비밀번호를 입력해주세요.');
        }
        // 비밀번호 일치
        else if (passwordConfirm === password) {
            inputPWConfirm.classList.remove('input-invalid');
            resetWarning('warning-password-confirm');
            return true;
        }
        else {
            inputPWConfirm.classList.add('input-invalid');
            warn('warning-password-confirm', "비밀번호가 일치하지 않습니다.");
        }
        return false;
    }

    // 비밀번호 유효성 확인 함수
    function validatePassword(password) {
        return REGEX_PW.test(password);
    }



    /* ==============
        이름 입력
       ============== */
    // 이름 입력란
    const inputName = document.getElementById("input-name");

    // 이름 입력란 입력 이벤트
    inputName.addEventListener('input', checkName);

    // 이름 확인
    function checkName() {
        const name = inputName.value;
        // 유효한 이름
        if (name && name.length > 0) {
            inputName.classList.remove('input-invalid');
            resetWarning('warning-name');
            return true;
        }
        else {
            inputName.classList.add('input-invalid');
            warn('warning-name', "이름을 입력해주세요.");
        }
        return false;
    }



    /* ==============
        이메일 입력란
       ============== */

    // 이메일 입력란
    const inputEmail = document.getElementById('input-email');
    const inputEmailDomain = document.getElementById('input-email-domain');
    // 도메인 입력란
    // 도메인 select 요소
    const selectDomainList = document.getElementById('domain-list');
    selectDomainList.addEventListener('input', (event) => {
        const domain = event.target.value;
        switch (domain) {
            case 'custom': {
                inputEmailDomain.disabled = false;
                break;
            }
            default: {
                inputEmailDomain.value = domain;
                inputEmailDomain.disabled = true;
            }
        }
    });

    // 이메일 입력 여부 - 이메일ID와 도메인 전부 입력되어야 함
    function emailEntered() {
        const email = inputEmail.value;
        const emailDomain = inputEmailDomain.value;
        return email && emailDomain && email.length > 0 && emailDomain.length > 0;
    }

    function getEmail() {
        if (!emailEntered()) return null;
        return `${inputEmail.value}@${inputEmailDomain.value}`;
    }

    /* ==============
        가입하기 버튼
       ============== */
    const btnSignUp = document.getElementById('btn-sign-up');
    btnSignUp.addEventListener('click', () => {
        // 입력 유효성 검사
        let passed = checkId(true);
        passed = checkPassword() && passed;
        passed = checkPasswordConfirm() && passed;
        passed = checkName() & passed;

        // 유효성 검사 실패 - 가입하지 않음
        if (!passed) return;
        const id = inputID.value;
        const password = inputPW.value;
        const salt = generateSalt();
        const name = inputName.value;
        const email = getEmail();
        const userAnswer = confirm(`다음 정보로 가입합니다.\n아이디: ${id}\n이름: ${name} ${emailEntered() ? `,\n이메일 주소: ${email}` : ""}`);
        if (userAnswer) {
            registerAccount(id, password, salt, name, email);
            alert('가입이 완료되었습니다.');
        }
        else {
            alert('가입이 취소되었습니다.');
        }
    });

    /* ==============
        유틸
       ============== */
    // 유효하지 않은 입력란에 대한 경고 표시
    function warn(warningSectionID, message) {
        const section = document.getElementById(warningSectionID);
        section.innerText = message;
    }

    // 경고 표시 초기화
    function resetWarning(warningSectionID) {
        warn(warningSectionID, "");
    }

    // 비밀번호 해싱
    function hashPassword(password) {
        const hashObject = new jsSHA("SHA-256", "TEXT", { numRounds: 1 });
        hashObject.update(password);
        return hashObject.getHash("HEX");
    }

    // salt 생성
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    function generateSalt() {
        const length = Math.floor(Math.random() * 4) + 3; // 3~6
        let word = '';
        for (let i = 0; i < length; i++) {
            word += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return word;
    }

    // 새 계정 등록
    function registerAccount(id, password, salt, name, email) {
        const account = {
            id: id,
            password: hashPassword(password + salt),
            name: name,
            email: (email ? email : "")
        }
        ACCOUNTS.accounts.push(account);
        console.log(`새 계정 등록됨: ${JSON.stringify(account)} (총 ${ACCOUNTS.accounts.length}명)`);
        console.log(ACCOUNTS.accounts);
    }

    // // 비밀번호 일치 확인
    // function passwordEquals(password, hash) {
    //     return hashPassword(password) === hash;
    // }
})();