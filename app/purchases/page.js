import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import PurchasedItem from "../../components/purchases/PurchasedItem";
import Empty from "@/components/ui/empty/Empty";
//
import "./index.css";
import NotLogin from "@/components/ui/not-login/NotLogin";
import { Suspense } from "react";
import PurchasedItemLoading from "@/components/purchases/PurchasedItemLoading";

// Helper component to handle loading & skeleton grid safely
function PurchasesSkeleton() {
  return (
    <section className="w-100 d-flex flex-column mt-4 pt-2 pt-sm-0 mt-sm-5">
      <section className="purchases-category-title d-flex justify-content-between align-items-center w-100">
        <h3 className="mt-2">خریداری شده</h3>
      </section>
      <section
        className="purchases-container gap-4 mt-4 mt-sm-5 pt-1 w-100"
        style={{ display: "grid" }}
      >
        {Array(4)
          .fill(0)
          .map((_, index) => (
            <div key={index} className="w-100" style={{ minWidth: "100%" }}>
              <PurchasedItemLoading />
            </div>
          ))}
      </section>
    </section>
  );
}

async function PurchasesData({ userId }) {
  const BaseUrl = process.env.NEXT_PUBLIC_API_URL;
  const ApiKey = process.env.NEXT_API_SECRET_KEY;

  const res = await fetch(`${BaseUrl}/api/purchases?userId=${userId}`, {
    cache: "no-store",
    headers: {
      "api-key": ApiKey,
    },
  });

  const purchases = res.ok ? await res.json() : null;

  if (purchases?.length === 0) {
    return <Empty text={"هنوز خریدی ثبت نکرده‌اید."} />;
  }

  if (purchases) {
    return (
      <section className="w-100 d-flex flex-column mt-4 pt-2 pt-sm-0 mt-sm-5">
        <section className="purchases-category-title d-flex justify-content-between align-items-center w-100">
          <h3 className="mt-2">خریداری شده</h3>
        </section>

        <section
          className="purchases-container gap-4 mt-4 mt-sm-5 pt-1 w-100"
          style={{ display: "grid" }}
        >
          {purchases.slice(0, 4).map((purchasedItem) => (
            <PurchasedItem
              key={purchasedItem.id}
              image={purchasedItem.image}
              title={purchasedItem.title}
            />
          ))}
        </section>
      </section>
    );
  }

  return null;
}

const Purchases = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return <NotLogin text={"برای مشاهده خریدها وارد حساب کاربری خود شوید."} />;
  }

  return (
    <Suspense fallback={<PurchasesSkeleton />}>
      <PurchasesData userId={session.user.id} />
    </Suspense>
  );
};

export default Purchases;
