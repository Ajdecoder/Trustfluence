import { Link } from "react-router-dom";

export default function Header() {
  return (
    <nav className="p-4 bg-gray-900 text-white flex justify-between">
      <Link to="/" className="mr-4 p-3">Influencer Spam Detector</Link>
      <div className="p-2" > 
        <Link to="/" className="mr-4 p-3">Dashboard</Link>
        <Link to="/user m-3 ">Admin Panel</Link>
      </div>
    </nav>
  );
}
