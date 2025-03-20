import RegisterEmail from "./registerFormLeft/registerEmail";
import RegisterFirstName from "./registerFormLeft/registerFirstName";
import RegisterLastName from "./registerFormLeft/registerLastName";
import RegisterBarangay from "./registerFormLeft/registerBarangay";

const RegisterFormLeftColumn = () => {
  return (
    <div className="space-y-6">
      {/* Email Input */}
      <RegisterEmail />

      {/* First Name & Last Name & Barangay*/}
      <div className="space-y-6">
        <RegisterFirstName />

        <RegisterLastName />

        <RegisterBarangay />
      </div>
    </div>
  );
};

export default RegisterFormLeftColumn;
