import Image from "next/image";
import Link from "next/link";
function Header() {
  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-blue-200 h-[70px] flex justify-around flex-row-reverse items-center">
    <Link href="/">
      <Image src="/img/logo.png" height={50} width={50} />
    </Link>
  
    <ul className="sm:flex hidden justify-around flex-row-reverse w-[500px]">
      <Link href="/">
        <li>صفحه اصلی</li>
      </Link>
  
      <Link href="/allproduct">
        <li>همه محصولات</li>
      </Link>
  
      <Link href="/callus">
        <li>تماس با ما</li>
      </Link>
  
      <Link href="/aboutus">
        <li>درباره ما</li>
      </Link>
    </ul>
  
    <Link
      href="/auth"
      className="bg-blue-600 px-3 py-2 text-blue-100 rounded-lg"
    >
      ورود و ثبت نام
    </Link>
  </div>
  
  );
}

export default Header;
