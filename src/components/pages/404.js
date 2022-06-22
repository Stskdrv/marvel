import ErroeMessage from "../errorMessage/ErrorMessage";
import { Link } from "react-router-dom";

const Page404 = () => {
    return (
        <div>
            <ErroeMessage/>
            <Link to='/'>Back to Main Page</Link>

        </div>
    )
}

export default Page404;