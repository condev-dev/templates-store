import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import PurchasedItem from "../../components/purchases/PurchasedItem";
//
import "./index.css";

const Purchases = async () => {
  const session = await getServerSession(authOptions);
  const BaseUrl = process.env.NEXT_PUBLIC_API_URL;

  // Not Login
  if (!session?.user?.id) {
    return <p>لطفاً برای مشاهده خریدها وارد حساب کاربری خود شوید.</p>;
  }

  const res = await fetch(
    `${BaseUrl}/api/purchases?userId=${session?.user?.id}`,
    {
      cache: "no-store",
    },
  );
  const purchases = res.ok ? await res.json() : [];

  return (
    <section className=" w-100 d-flex flex-column mt-5 ">
      <section className="purchases-category-title d-flex justify-content-between align-items-center w-100">
        <h3 className="mt-2">خریداری شده </h3>
      </section>

      <section className="purchases-container gap-4 mt-5 pt-1">
        {purchases?.slice(0, 4).map((purchasedItem) => (
          <PurchasedItem
            key={purchasedItem.id}
            image={purchasedItem.image}
            title={purchasedItem.title}
          />
        ))}
        {purchases?.length === 0 && session?.user && (
          <p>هنوز خریدی ثبت نکرده‌اید.</p>
        )}
      </section>
    </section>
  );
};

export default Purchases;
