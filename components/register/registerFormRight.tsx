import RegisterRole from "./registerFormRight/registerRole";
import RegisterContact from "./registerFormRight/registerContact";
import RegisterPassword from "./registerFormRight/registerPassword";
import RegisterConfirmPassword from "./registerFormRight/registerConfirmPassword";

const RegisterFormRightColumn = () => {
  return (
    <div className="space-y-6">
      {/* Role Selection */}
      <RegisterRole />

      {/* Contact Number */}
      <RegisterContact />

      {/* Password Fields */}
      <div className="space-y-6">
        <RegisterPassword />

        <RegisterConfirmPassword />
      </div>
    </div>
  );
};

export default RegisterFormRightColumn;
