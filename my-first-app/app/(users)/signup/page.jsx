"use client";

import { useActionState } from "react";
import { registrationform } from "./signup.action";
import { DialogDemo } from "../../../components/DialogDemo";

const Register = () => {

    const [state, formAction, isLoading] = useActionState(registrationform, null);

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-gray-900 rounded-xl shadow-xl p-8 border border-gray-800">
        <h1 className="text-3xl font-bold text-center text-white mb-8">
          Create Account
        </h1>

        <form action={formAction} className="space-y-5">
          {/* Full Name */}
          <div>
            <label className="text-gray-300 text-sm mb-2 block">
              Full Name
            </label>

            <input
              type="text"
              name="fullName"
              placeholder="Enter your full name"
              required
              className="input input-bordered w-full bg-gray-800 border-gray-700 text-white"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-gray-300 text-sm mb-2 block">
              Email
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              className="input input-bordered w-full bg-gray-800 border-gray-700 text-white"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="text-gray-300 text-sm mb-2 block">
              Phone Number
            </label>

            <input
              type="tel"
              name="phone"
              placeholder="Enter your phone number"
              required
              className="input input-bordered w-full bg-gray-800 border-gray-700 text-white"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-gray-300 text-sm mb-2 block">
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Enter password"
              required
              className="input input-bordered w-full bg-gray-800 border-gray-700 text-white"
            />
          </div>


          <button
            type="submit"
            className="btn btn-primary w-full mt-4"
          >
            Register
          </button>
        </form>

        <p className="text-center text-gray-400 mt-6">
          Already have an account?
           <DialogDemo/>
          <a
            href="/login"
            className="text-pink-500 hover:underline ml-2"
          >
            Login
           
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;