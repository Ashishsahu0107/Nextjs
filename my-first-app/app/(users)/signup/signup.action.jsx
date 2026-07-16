"use server";

import db from "@/config/db";

export const registrationform = async (previousState, formData) => {
  try {
    const { fullName, email, phone, password } = Object.fromEntries(
      formData.entries(),
    );
    console.log(fullName, email, phone, password);

    await db.execute(
      `insert into registration_table (full_name, email, phone, password) values (?, ?, ?, ?)`,
      [fullName, email, phone, password],
    );
    return { success: true, message: "form submitted successfully" };
  } catch (error) {
    if (error.message === "NEXT_REDIRECT") throw error;

    return { success: false, message: error.message };
  }
};

// redirect() is a server-only function. It throws a special Next.js response to perform a server-side redirect — which only works during server-side rendering (SSR), server actions, or loaders.
