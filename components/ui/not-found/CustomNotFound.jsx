import Link from 'next/link';
import './index.css';
const CustomNotFound = () => {
    return ( 
        <div className="d-flex justify-content-center align-items-center not-found flex-column w-100 h-100" >
            <h5>What </h5>

            <h6 > صفحه ی مورد نظر پیدا نشد. </h6>

            <Link href="/" className='btn-main btn-color pb-2 mt-5' >برگشت به صفحه اصلی</Link>
    
        </div>
     );
}
 
export default CustomNotFound;
