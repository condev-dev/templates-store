"use client";
import { useState, useEffect } from 'react';
import { FiGrid, FiHome, FiShoppingBag, FiShoppingCart, FiUser } from "react-icons/fi";
import "./index.css";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavSm = () => {
  const pathname = usePathname();

  const [selectedItem, setSelectedItem] = useState(() => {
    if (pathname === '/categories') return 'دسته بندی ها';
    if (pathname === '/purchases') return 'خرید های قبلی';
    if (pathname === '/') return 'خانه';
    if (pathname === '/account') return 'حساب کاربری';
    if (pathname === '/cart') return 'سبد خرید';
    return 'خانه';
  });

  useEffect(() => {
    if (pathname === '/categories') setSelectedItem('دسته بندی ها');
    else if (pathname === '/purchases') setSelectedItem('خرید های قبلی');
    else if (pathname === '/') setSelectedItem('خانه');
    else if (pathname === '/account') setSelectedItem('حساب کاربری');
    else if (pathname === '/cart') setSelectedItem('سبد خرید');
    else setSelectedItem('خانه');
  }, [pathname]);

  const handleItemClick = (itemName) => {
    setSelectedItem(itemName);
  };

  return (
    <section className="nav-sm shadow-sm d-flex d-sm-none justify-content-evenly align-items-center">
      <Link href="/categories"
        className={`d-flex flex-column align-items-center justify-content-center nav-sm-item pt-1 ${selectedItem === 'دسته بندی ها' ? 'nav-sm-item-selected' : ''}`}
        onClick={() => handleItemClick('دسته بندی ها')}
      >
        <FiGrid size={17} />
        <span>دسته بندی ها</span>
      </Link>
      <Link href="/purchases"
        className={`d-flex flex-column align-items-center justify-content-center nav-sm-item pt-1 ${selectedItem === 'خرید های قبلی' ? 'nav-sm-item-selected' : ''}`}
        onClick={() => handleItemClick('خرید های قبلی')}
      >
        <FiShoppingBag size={17} />
        <span>خرید های قبلی</span>
      </Link>
     <Link href="/"
        className={`d-flex flex-column align-items-center justify-content-center nav-sm-item pt-1 ${selectedItem === 'خانه' ? 'nav-sm-item-selected' : ''}`}
        onClick={() => handleItemClick('خانه')}
      >
        <FiHome size={17} />
        <span>خانه</span>
      </Link>

      <Link href="/account"
        className={`d-flex flex-column align-items-center justify-content-center nav-sm-item pt-1 ${selectedItem === 'حساب کاربری' ? 'nav-sm-item-selected' : ''}`}
        onClick={() => handleItemClick('حساب کاربری')}
      >
        <FiUser size={17} />
        <span>حساب کاربری</span>
      </Link>
      <Link href="/cart"
        className={`d-flex flex-column align-items-center justify-content-center nav-sm-item pt-1 ${selectedItem === 'سبد خرید' ? 'nav-sm-item-selected' : ''}`}
        onClick={() => handleItemClick('سبد خرید')}
      >
        <FiShoppingCart size={17} />
        <span>سبد خرید</span>
      </Link>
    </section>
  );
};

export default NavSm;
