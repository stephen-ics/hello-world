"use client";

import React, { useEffect, useRef } from "react";
import { Terminal } from "@xterm/xterm";
import "@xterm/xterm/css/xterm.css";

export default function TerminalClient() {
  const terminalRef = useRef<HTMLDivElement>(null);
  let term: Terminal | null = null;

  useEffect(() => {
    if (!terminalRef.current) return;

    // Instantiate the terminal
    term = new Terminal({
      rows: 20,
      cols: 80,
      fontSize: 14,
      cursorBlink: true,
    });

    // Mount the terminal in the div
    term.open(terminalRef.current);

    // Write an initial message
    term.writeln("Welcome to Xterm.js in Next.js!");
    term.writeln("Type anything and press Enter...");

    // Subscribe to user keystrokes
    term.onData((data) => {
      // Enter key (char code 13)
      if (data.charCodeAt(0) === 13) {
        term?.writeln("");
      } else {
        term?.write(data);
      }
    });

    // Cleanup on unmount
    return () => {
      term?.dispose();
    };
  }, []);

  return <div ref={terminalRef} style={{ width: "100%", height: "300px" }} />;
}