#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';

// Create server instance
const server = new McpServer({
    name: "mcp-add-test",
    version: "1.0.0",
});

server.tool(
    "add_a_and_b",
    "Add two numbers together",
    {
        a: z.number().describe("number a"),
        b: z.number().describe("number b"),
    },
    async ({a, b}) => {
        return {
            content: [
                {
                    type: "text",
                    text: `${a} + ${b} = ${a + b}`,
                },
            ]
        };
    }
);

async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Weather MCP Server running on stdio");
}
main().catch((error) => {
    console.error("Fatal error in main():", error);
    process.exit(1);
});