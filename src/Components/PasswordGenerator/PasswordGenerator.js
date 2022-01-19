import React, { useEffect } from "react";
import { useRef } from "react";
import "./style.css";

function PasswordGenerator(props) {
  const inputRef = useRef();
  const spanRef = useRef();

  useEffect(() => {
    inputRef.current.setAttribute("value", (inputRef.current.value = 4));
  }, []);

  const handleClick = () => {
    // gán zero bằng chuỗi là số 0 mục đích để tăng thêm số lượng số 0.
    const zero = "0";
    // convert chuỗi thành số để có thể tính toán. Sau đó dùng hàm repeat
    // để lặp số 0 với số lần lặp bằng value của input, -1 là vì kết quả dư 1 chữ số.
    const max = Number(10 + zero.repeat(inputRef.current.value - 1));
    const min = Number(1 + zero.repeat(inputRef.current.value - 1));

    // Thêm kết quả vào thẻ span
    const textNode = document.createTextNode(
      Math.floor(Math.random() * (max - min + 1)) + min
    );
    spanRef.current.appendChild(textNode);
    // Reset giá trị thẻ span để tiếp tục click
    spanRef.current.innerHTML = " ";
    spanRef.current.appendChild(textNode);
  };
  return (
    <div>
      <div className="container">
        <h2>Password Generator</h2>
        <div className="result-container">
          <span ref={spanRef} id="result"></span>
          <button className="btn" id="clipboard">
            <i className="far fa-clipboard"></i>
          </button>
        </div>
        <div className="settings">
          <div className="setting">
            <label>Password Length</label>
            <input ref={inputRef} type="number" id="length" min="4" max="20" />
          </div>
          <div className="setting">
            <label>Include uppercase letters</label>
            <input type="checkbox" id="uppercase" defaultChecked />
          </div>
          <div className="setting">
            <label>Include lowercase letters</label>
            <input type="checkbox" id="lowercase" defaultChecked />
          </div>
          <div className="setting">
            <label>Include numbers</label>
            <input type="checkbox" id="numbers" defaultChecked />
          </div>
          <div className="setting">
            <label>Include symbols</label>
            <input type="checkbox" id="symbols" defaultChecked />
          </div>
        </div>

        <button className="btn btn-large" id="generate" onClick={handleClick}>
          Generate Password
        </button>
      </div>
    </div>
  );
}

export default PasswordGenerator;
