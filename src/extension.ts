import * as vscode from "vscode";
import createFeatureStructure from "./features/new_feature";
import { formatFeatureName } from "./helpers/formatters";

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "extension.createSpecificFolder",
    async (uri?: vscode.Uri) => {
      if (uri && uri.fsPath) {
        const projectType = await vscode.window.showQuickPick(
          ["TypeScript", "Flutter/Dart", "NodeJs"],
          {
            placeHolder: "Seleccione el tipo de proyecto",
          }
        );

        if (projectType) {
          const featureName = await vscode.window.showInputBox({
            prompt: "Ingrese el nombre para el nuevo feature",
            placeHolder: "Nombre del Feature",
          });

          if (featureName) {
            const formattedFeatureName = formatFeatureName(featureName);
            createFeatureStructure(
              uri.fsPath,
              formattedFeatureName,
              projectType
            );
          } else {
            vscode.window.showInformationMessage(
              "Creación de feature cancelada."
            );
          }
        } else {
          vscode.window.showInformationMessage(
            "Creación de feature cancelada."
          );
        }
      } else {
        vscode.window.showInformationMessage(
          "Seleccione una carpeta en el explorador para crear el feature."
        );
      }
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
