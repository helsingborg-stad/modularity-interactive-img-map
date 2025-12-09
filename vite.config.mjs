import { createViteConfig } from "vite-config-factory";

const entries = {
	"css/modularity-interactive-map":
		"./source/sass/modularity-interactive-map.scss",
	"js/modularity-interactive-map": "./source/js/front/index.ts",
	"js/modularity-interactive-map-admin": "./source/js/admin/index.ts",
};

export default createViteConfig(entries, {
	outDir: "assets/dist",
	manifestFile: "manifest.json",
});
