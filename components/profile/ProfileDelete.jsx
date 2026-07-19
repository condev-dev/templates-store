import DeleteAccountBtn from "../auth/DeleteAccountBtn";

const ProfileDelete = () => {
  return (
    <div className="d-flex flex-column gap-4 mt-4 mt-lg-0 p-4 p-md-5 me-lg-5 profile">
      <h6>حذف حساب کاربری</h6>

      <DeleteAccountBtn />
    </div>
  );
};

export default ProfileDelete;
