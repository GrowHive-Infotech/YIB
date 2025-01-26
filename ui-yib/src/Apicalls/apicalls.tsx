import React, { useState } from "react";
 export const makeApiCalls = async () => {
    try {
        // First API call
        const firstResponse = await fetch("https://localhost:7287/api/otp/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({"email":"anshularora1111@gmail.com"}), // Replace with actual payload
        });

        if (!firstResponse.ok) {
            throw new Error("First API call failed");
        }

        const firstResult = await firstResponse.json();
        console.log("First API call successful:", firstResult);

        // Check if the first result has necessary data for the second API call
        if (firstResult?.id) {
            // Second API call
            const secondResponse = await fetch(
                `https://api.example.com/second-endpoint/${firstResult.id}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${firstResult.token}`, // Example of passing token
                    },
                }
            );

            if (!secondResponse.ok) {
                throw new Error("Second API call failed");
            }

            const secondResult = await secondResponse.json();
            console.log("Second API call successful:", secondResult);

            return secondResult; // Return the result if needed
        } else {
            throw new Error("First API result is invalid or incomplete.");
        }
    } catch (error) {
        console.error("Error during API calls:", error);
        throw error; // Re-throw the error if necessary
    }
};