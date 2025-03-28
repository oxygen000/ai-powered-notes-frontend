import { Link } from "react-router-dom";

const AccountActivated = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100"
    style={{ backgroundImage: "url('/img/backgrondauthe.png')" }}
>
      <div className="bg-white p-8 shadow-md rounded-lg max-w-md w-full text-center">
        <h2 className="text-2xl font-bold text-green-600">✅ Account Activated!</h2>
        <p className="text-gray-600 mt-2">Your account has been successfully activated. You can now log in.</p>

        <Link
          to="/login"
          className="block mt-4 bg-[#33c26c] text-white py-3 rounded-lg font-semibold hover:bg-[#2a9e58] transition w-full text-center"
        >
          🔑 Go to Login
        </Link>
      </div>
    </div>
  );
};

export default AccountActivated;
