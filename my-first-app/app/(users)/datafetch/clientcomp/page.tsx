"use client";

import { User, Users, Star, TrendingUp } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface UserInfo {
  name: string;
  gender: string | null;
  probability: number;
  count: number | null;
}

export default function DataFetchClient() {
  const searchParams = useSearchParams();
  const userName = searchParams.get("name");

  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!userName) return;

    const fetchUser = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `https://api.genderize.io?name=${encodeURIComponent(userName)}`,
        );

        if (!res.ok) {
          throw new Error(`API Error ${res.status}`);
        }

        const data: UserInfo = await res.json();

        setUserInfo(data);
      } catch (err) {
        console.error(err);
        setError(
          "Unable to fetch data. The API may have reached its rate limit.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userName]);

  if (!userName) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h1>Please provide a name.</h1>
        <p>Example: /datafetch/clientComp?name=ashish</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-xl font-semibold">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        {error}
      </div>
    );
  }

  if (!userInfo) return null;

  const isMale = userInfo.gender === "male";
  const confidencePercentage = Math.round((userInfo.probability ?? 0) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex justify-center items-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full relative overflow-hidden">
        <div
          className={`absolute top-0 right-0 w-32 h-32 ${
            isMale ? "bg-blue-100" : "bg-pink-100"
          } rounded-full -translate-y-16 translate-x-16`}
        />

        <div className="relative z-10">
          <div className="text-center">
            <div
              className={`w-24 h-24 rounded-full mx-auto flex items-center justify-center mb-4 ${
                isMale
                  ? "bg-gradient-to-br from-blue-400 to-blue-600"
                  : "bg-gradient-to-br from-pink-400 to-pink-600"
              }`}
            >
              <User className="text-white w-12 h-12" />
            </div>

            <h1 className="text-3xl font-bold capitalize">{userInfo.name}</h1>

            <div
              className={`inline-flex mt-4 px-4 py-2 rounded-full ${
                isMale
                  ? "bg-blue-100 text-blue-700"
                  : "bg-pink-100 text-pink-700"
              }`}
            >
              {userInfo.gender ?? "Unknown"}
            </div>
          </div>

          <div className="mt-8 space-y-5">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between mb-2">
                <span className="flex items-center">
                  <Star className="w-4 h-4 mr-2" />
                  Confidence
                </span>

                <span>{confidencePercentage}%</span>
              </div>

              <div className="bg-gray-200 rounded-full h-3">
                <div
                  className={`h-3 rounded-full ${
                    isMale ? "bg-blue-500" : "bg-pink-500"
                  }`}
                  style={{
                    width: `${confidencePercentage}%`,
                  }}
                />
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 flex justify-between">
              <span className="flex items-center">
                <TrendingUp className="w-4 h-4 mr-2"/>
                Data Sample
              </span>

              <span>{userInfo.count?.toLocaleString() ?? "N/A"}</span>
            </div>

            <div
              className={`rounded-lg p-4 border ${
                confidencePercentage >= 90
                  ? "bg-green-50 border-green-200"
                  : confidencePercentage >= 70
                    ? "bg-yellow-50 border-yellow-200"
                    : "bg-red-50 border-red-200"
              }`}
            >
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-2" />

                <span>
                  {confidencePercentage >= 90
                    ? "High Accuracy"
                    : confidencePercentage >= 70
                      ? "Moderate Accuracy"
                      : "Low Accuracy"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
