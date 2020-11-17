import React, { Component } from "react";
import "./PasswordStrengthMeter.css";
import zxcvbn from "zxcvbn";

class PasswordStrengthMeter extends Component {
  createPasswordLabel = (result) => {
    switch (result.score) {
      case 0:
        return "Debil";
      case 1:
        return "Debil";
      case 2:
        return "Normal";
      case 3:
        return "Buena";
      case 4:
        return "Segura";
      default:
        return "Debil";
    }
  };

  render() {
    const { password } = this.props;
    const testedResult = zxcvbn(password);
    return (
      <div className="password-strength-meter">
        <progress
          className={`password-strength-meter-progress strength-${this.createPasswordLabel(
            testedResult
          )}`}
          value={testedResult.score}
          max="4"
        />
        <br />
        <label className="password-strength-meter-label">
          {password && (
            <>
              <strong>Calidad de contraseña</strong>{" "}
              {this.createPasswordLabel(testedResult)}
            </>
          )}
        </label>
      </div>
    );
  }
}

export default PasswordStrengthMeter;
