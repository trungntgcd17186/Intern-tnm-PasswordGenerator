import { useState } from "react";
import "./style.css";
import Checkbox from "./Checkbox";
import { HiOutlineClipboardCopy, HiClipboardCopy } from "react-icons/hi";
function PasswordGenerator(props) {
  const [handleText, setHandleText] = useState("");
  const [copied, setCopied] = useState(false);

  const [password, setPassword] = useState({
    length: 4,
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
    const numbersArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

    const symbolsArray = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")"];

    const characterCodes = Array.from(Array(26)).map((_e, i) => i + 97);
    const lowerCaseLetters = characterCodes.map((code) =>
      String.fromCharCode(code)
    );

    const upperCaseLetters = lowerCaseLetters.map((letter) =>
      letter.toUpperCase()
    );

    const { length, uppercase, lowercase, numbers, symbols } = password;

    const word = (length, uppercase, lowercase, numbers, symbols) => {
      const availableCharacters = [
        ...(uppercase ? upperCaseLetters : []),
        ...(lowercase ? lowerCaseLetters : []),
        ...(numbers ? numbersArray : []),
        ...(symbols ? symbolsArray : []),
      ];
      const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);
      const characters = shuffleArray(availableCharacters).slice(0, length);
      setHandleText(characters.join(""));
      return characters;
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
