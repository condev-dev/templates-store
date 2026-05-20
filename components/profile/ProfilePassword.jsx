import PasswordInput from "./PasswordInput";

const ProfilePassword = () => {
  return (
    <div className="d-flex flex-column gap-4 mt-4 mt-lg-0 p-4 p-md-5 me-lg-5 profile ">
      <div className="w-100 mt-2 mt-md-0">
        <h6>گذرواژه</h6>
      </div>
      <PasswordInput />
      <hr />
    </div>
  );
};

export default ProfilePassword;
