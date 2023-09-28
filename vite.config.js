import { defineConfig } from "tsup";

export default defineConfig({
    test: {
        environmentMatchGlobs: [['src/http/controllers/**', 'prisma']]
    }
})