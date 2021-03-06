import { useState } from "react";
import "./style.css";
import Checkbox from "./Checkbox";
import { HiOutlineClipboardCopy, HiClipboardCopy } from "react-icons/hi";
function PasswordGenerator(props) {
  const [handleText, setHandleText] = useState("");
  const [copied, setCopied] = useState(false);

  const [password, setPassword] = useState({
    length: 20,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });

  const handleChangeUppercase = () => {
    setPassword({
      ...password,
      uppercase: !password.uppercase,
    });
  };

  const handleChangeLowercase = () => {
    setPassword({
      ...password,
      lowercase: !password.lowercase,
    });
  };

  const handleChangeNumbers = () => {
    setPassword({
      ...password,
      numbers: !password.numbers,
    });
  };

  const handleChangeSymbols = () => {
    setPassword({
      ...password,
      symbols: !password.symbols,
    });
  };

  const setPasswordLength = (val) => {
    setPassword({
      ...password,
      length: val,
    });
  };

  const handleGeneratePassword = () => {
    const numbersArray = "1234567890";

    const symbolsArray = "!@#$%^&*()[]";

    const lowerCaseLetters = "abcdefghijklmnopqrstuvwxyz";

    const upperCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    let { length, uppercase, lowercase, numbers, symbols } = password;

    const word = (length, uppercase, lowercase, numbers, symbols) => {
      const creatPassword = (availableCharacters) => {
        for (let i = 0; i < password.length - checkboxLength; i++) {
          let random = Math.floor(Math.random() * availableCharacters.length);
          seedPassword += availableCharacters[random];
        }
        return seedPassword;
      };

      let availableCharacters = "";
      let seedPassword = "";
      let randomNumbers = Math.floor(Math.random() * numbersArray.length);
      let randomSymbols = Math.floor(Math.random() * symbolsArray.length);
      let randomLowerCase = Math.floor(Math.random() * lowerCaseLetters.length);
      let randomUppercase = Math.floor(Math.random() * upperCaseLetters.length);
      let checkboxLength = 0;

      if (numbers) {
        seedPassword += numbersArray[randomNumbers];
        availableCharacters += numbersArray;
        checkboxLength += 1;
      }
      if (symbols) {
        seedPassword += symbolsArray[randomSymbols];
        availableCharacters += symbolsArray;
        checkboxLength += 1;
      }
      if (lowercase) {
        seedPassword += lowerCaseLetters[randomLowerCase];
        availableCharacters += lowerCaseLetters;
        checkboxLength += 1;
      }
      if (uppercase) {
        seedPassword += upperCaseLetters[randomUppercase];
        availableCharacters += upperCaseLetters;
        checkboxLength += 1;
      }
      const result = creatPassword(availableCharacters);
      var shuffled = result
        .split("")
        .sort(function () {
          return 0.5 - Math.random();
        })
        .join("");

      // validate nếu người dùng không chọn điều kiện nào
      if (
        password.length >= 4 &&
        !uppercase &&
        !lowercase &&
        !numbers &&
        !symbols
      ) {
        alert("Vui lòng chọn ít nhất 1 điều kiện");
        setHandleText("");
      } else {
        setHandleText(shuffled);
      }
      // validate nếu người dùng nhập độ dài mật khẩu nhỏ hơn 4.
      if (password.length < 4) {
        alert("Vui lòng chọn độ dài mật khẩu tối thiểu bằng 4");
        setHandleText("");
      }
    };

    word(length, uppercase, lowercase, numbers, symbols);
  };
  return (
    <div>
      <div className="container">
        <h2>Password Generator</h2>
        <div className="result-container">
          <input
            type="text"
            value={handleText}
            onChange={(e) => {
              setHandleText(e.target.value);
            }}
          />
          <button
            className="btn"
            onClick={() => {
              if (handleText.length > 0) {
                navigator.clipboard.writeText(handleText);
                setCopied(true);
                alert("Password copied to clipboard");
                setInterval(() => {
                  setCopied(false);
                }, 2000);
              }
            }}
          >
            {copied ? <HiClipboardCopy /> : <HiOutlineClipboardCopy />}
          </button>
        </div>
        <div className="settings">
          <div className="setting">
            <label>Password Length</label>
            <input
              type="number"
              value={password.length}
              onChange={(e) => setPasswordLength(e.target.value)}
              min="4"
              max="20"
            />
          </div>
          <div className="setting">
            <label>Include uppercase letters</label>
            <Checkbox
              value={password.uppercase}
              onChange={handleChangeUppercase}
            />
          </div>
          <div className="setting">
            <label>Include lowercase letters</label>
            <Checkbox
              value={password.lowercase}
              onChange={handleChangeLowercase}
            />
          </div>
          <div className="setting">
            <label>Include numbers</label>
            <Checkbox value={password.numbers} onChange={handleChangeNumbers} />
          </div>
          <div className="setting">
            <label>Include symbols</label>
            <Checkbox value={password.symbols} onChange={handleChangeSymbols} />
          </div>
        </div>

        <button className="btn btn-large" onClick={handleGeneratePassword}>
          Generate Password
        </button>
      </div>
    </div>
  );
}

export default PasswordGenerator;
