import { FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";

const RemoveFromCart = ({ userId, templateId, handelRemoveFront }) => {
  const BaseUrl = process.env.NEXT_PUBLIC_API_URL;

  const onSubmit = async () => {
    try {
      const response = await fetch(`${BaseUrl}/api/users`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          templateId: templateId,
        }),
      });

      if (response.ok) {
        toast.success("با موفقیت از سبد خرید حذف شد.");
        handelRemoveFront();
      } else {
        toast.error("حذف با مشکل مواجعه شد.");
      }
    } catch (err) {
      console.error("Error during fetch operation:", err);
    }
  };

  return (
    <button className="btn-main btn-red btn-color-sm" onClick={onSubmit}>
      <FiTrash2 size={16} />
    </button>
  );
};

export default RemoveFromCart;
