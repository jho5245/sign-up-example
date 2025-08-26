(() => {
    /* ==============
        계정 DB
       ============== */
    const ACCOUNTS = {
        accounts: [
            {
                id: "example1234",
                password: "a8efe4d0c422f1d48e29c6f225d468785fdc84c379e7ae61ed7857510abef536",
                salt: "t20rpwInhntiVvP2lolVNSjdCFg679z9XJbwOoiv505tnPmLbFWi39yp6zTsbD9M",
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

    /**
     * 아이디 유효성을 검사합니다.
     * @param {Boolean} _checkDuplicate 아이디 중복 확인 여부
     * @returns 아이디가 유효하면 true, 이외의 경우 false
     */
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

    /**
     * 이미 등록된 아이디인지 확인합니다.
     * @param {String} id 확인할 아이디
     * @returns 이미 등록된 경우 true, 이외의 경우 false
     */
    function checkDuplicate(id) {
        return ACCOUNTS.accounts.some(account => {
            return account.id === id;
        });
    }

    /**
     * 아이디가 유효한지 정규식을 통해 확인합니다
     * @param {String} id 확인할 아이디
     * @returns 정규식을 만족하여 유효할 경우 true, 이외의 경우 false
     */
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

    /**
     * 비밀번호가 유효한지 확인합니다.
     * @returns 비밀번호가 유효하면 true, 이외의 경우 false
     */
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

    /**
     * 비밀번호 입력란과 비밀번호 확인 입력란의 값이 같은지 확인합니다.
     * @returns 비밀번호가 일치하면 true, 이외의 경우 false
     */
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

    /**
     * 비밀번호가 유효한지 정규식을 통해 확인합니다.
     * @param {String} password 확인할 비밀번호
     * @returns 정규식을 만족하여 유효할 경우 true, 이외의 경우 false
     */
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

    /**
     * 이름이 공백인지 확인합니다.
     * @returns 이름이 공백이 아닐 경우 true, 이외의 경우 false
     */
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

    /**
     * 이메일과 이메일 도메인 입력란이 모두 채워져있는지 확인합니다.
     * @returns 이메일과 이메일 도메인 입력란이 모두 채워져있으면 true, 이외의 경우 false
     */
    function emailEntered() {
        const email = inputEmail.value;
        const emailDomain = inputEmailDomain.value;
        return email && emailDomain && email.length > 0 && emailDomain.length > 0;
    }

    /**
     * 입력란에 입력된 이메일 주소를 반환합니다.
     * @returns `email@domain` 형태의 문자열 혹은 {@link emailEntered()}가 false일 경우 null;
     */
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
        const userAnswer = confirm(`다음 정보로 가입합니다.\n아이디: ${id}\n이름: ${name} ${emailEntered() ? `\n이메일 주소: ${email}` : ""}`);
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
    /**
     * 입력란에 유효하지 않은 값이 들어갔을때 하단에 경고 메시지를 표시합니다.
     * @param {String} warningSectionID 경고 메시지를 표시할 영역 div 식별자
     * @param {String} message 표시할 경고 메시지
     */
    function warn(warningSectionID, message) {
        const section = document.getElementById(warningSectionID);
        section.innerText = message;
    }

    /**
     * 입력란 하단의 경고 메시지를 숨깁니다.
     * @param {String} warningSectionID 경고 메시지를 숨길 영역 div 식별자
     */
    function resetWarning(warningSectionID) {
        warn(warningSectionID, "");
    }

    /**
     * 입력받은 비밀번호 문자열을 SHA-256으로 암호화합니다.
     * @param {String} password 암호화할 문자열
     * @returns SHA-256으로 암호화된 문자열
     */
    function hashPassword(password) {
        const hashObject = new jsSHA("SHA-256", "TEXT", { numRounds: 1 });
        hashObject.update(password);
        return hashObject.getHash("HEX");
    }

    // salt용 문자열
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    /**
     * SHA-256 암호화에 사용할 salt 문자열을 생성합니다.
     * @returns 64글자 무작위 문자열
     */
    function generateSalt() {
        let word = '';
        for (let i = 0; i < 64; i++) {
            word += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return word;
    }

    /**
     * 입력받은 정보로 새 계정을 등록합니다
     * @param {String} id 계정 식별자(아이디)
     * @param {String} password 비밀번호
     * @param {String} salt 비밀번호 암호화용 salt
     * @param {String} name 이름
     * @param {String} email 이메일 주소
     */
    function registerAccount(id, password, salt, name, email) {
        const account = {
            id: id,
            password: hashPassword(password + salt),
            salt: salt,
            name: name,
            email: (email ? email : "")
        }
        ACCOUNTS.accounts.push(account);
        console.log(`새 계정 등록됨: ${JSON.stringify(account)} (총 ${ACCOUNTS.accounts.length}명)`);
        console.log(ACCOUNTS.accounts);
    }
})();