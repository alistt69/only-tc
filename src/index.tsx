import React from "react";
import { App } from "@/app";
import { createRoot } from "react-dom/client";
import '@/styles/index.scss'

const root = document.getElementById("root");

if (!root) {
    throw new Error('root not found.');
}

const container = createRoot(root)

container.render(
    <App />
)