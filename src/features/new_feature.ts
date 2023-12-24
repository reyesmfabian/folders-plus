import * as fs from "fs";
import * as path from "path";
import * as vscode from "vscode";

function getConfigurationForProject(projectType: string): string[] {
  const config = vscode.workspace.getConfiguration("foldersPlus");
  if (projectType === "Flutter/Dart") {
    return config.get<string[]>("flutterFolders", []);
  } else if (projectType === "TypeScript") {
    return config.get<string[]>("typescriptFolders", []);
  } else {
    return config.get<string[]>("nodeFolders", []);
  }
}

export default function createFeatureStructure(
  basePath: string,
  featureName: string,
  projectType: string
) {

  let folders = getConfigurationForProject(projectType);

  if (folders.length === 0) {
    if (projectType === "Flutter/Dart") {
      folders = [
        "app/ui/pages",
        "app/ui/widgets",
        "domain/gateways",
        "domain/models",
        "domain/use_cases",
        "infrastructure/driven_adapters",
      ];
    } else if (projectType === "TypeScript") {
      folders = [
        "app/ui/views",
        "app/ui/components",
        "domain/gateways",
        "domain/models",
        "domain/use_cases",
        "infrastructure/driven_adapters",
      ];
    } else {
      folders = [
        "controllers/validations",
        "domain/gateways",
        "domain/models",
        "domain/use_cases",
        "infrastructure/driven_adapters",
      ];
    }
  }

  const featurePath = path.join(basePath, featureName);
  folders.forEach((folder) => {
    const fullPath = path.join(featurePath, folder);
    fs.mkdirSync(fullPath, { recursive: true });
  });

  vscode.window.showInformationMessage(
    `Feature structure created for ${projectType} in: ${featurePath}`
  );
}
