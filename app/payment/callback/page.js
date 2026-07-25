"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import "@/app/auth/index.css";

export default function PaymentCallback() {
    const searchParams = useSearchParams();
    const [result, setResult] = useState(null);
    const BaseUrl = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
        const authority = searchParams.get("Authority");
        const status = searchParams.get("Status");

        if (status !== "OK") {
            setResult({ success: false });
            return;
        }

        fetch(`${BaseUrl}/api/payment/verify`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ authority }),
        })
            .then((res) => res.json())
            .then((data) => setResult(data))
            .catch(() => setResult({ success: false }));
    }, [searchParams]);

    if (!result)
        return (
            <section className="d-flex justify-content-center align-items-center min-vh-100 ">
                <p>در حال بررسی پرداخت...</p>
            </section>
        );

    return (
        <section className="d-flex justify-content-center align-items-center flex-column min-vh-100 gap-3">
            {result.success ? (
                <>
                    <h4>پرداخت با موفقیت انجام شد.</h4>
                    <p>کد رهگیری: {result.ref_id}</p>
                </>
            ) : (
                <h4>پرداخت ناموفق بود.</h4>
            )}
            <Link href="/" className="btn-main btn-color mt-2">
                بازگشت به صفحه اصلی
            </Link>
        </section>
    );
}