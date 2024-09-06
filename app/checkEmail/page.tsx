"use client";

import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loading from "../components/Loader";

const EmailChecker: React.FC = () => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const checkEmailVerification = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error || !data.session) {
        router.push("/"); // Redirect if no session
        return;
      }

      const { user } = data.session;
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("email_verified")
        .eq("email", user.email)
        .single();

      if (profileError || profile?.email_verified) {
        router.push("/"); // Redirect if already verified or error occurs
      } else {
        setUser(user); // Set user if not verified
        setLoading(false); // Stop loading
      }
    };

    checkEmailVerification();
  }, [router, supabase]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <Loading />
      </div>
    ); // Show loading indicator
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-80 h-60 border border-gray-300 p-6 shadow-lg bg-white rounded-lg flex flex-col items-center justify-center text-center">
        <h2 className="text-xl font-semibold mb-4">Confirm your signup</h2>
        <p className="text-gray-700 mb-4">
          Check your email and confirm your signup.
        </p>
        <Button
          className="w-full"
          variant="signin"
          onClick={() => router.push("/")}
        >
          Ok
        </Button>
      </div>
    </div>
  );
};

export default EmailChecker;
