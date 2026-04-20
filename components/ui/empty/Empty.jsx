import './index.css';
const Empty = ({text}) => {
    return ( 
        <div className=" w-100 d-flex justify-content-center align-items-center empty px-3 " >
            <h5>{text}</h5>
        </div>
     );
}
 
export default Empty;
