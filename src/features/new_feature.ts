import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';

export default function createFeatureStructure(basePath: string, featureName: string, projectType: string) {
    let folders: string[];
  
    if (projectType === 'Flutter/Dart') {
      folders = [
        'app/ui/pages',
        'app/ui/widgets',
        'domain/gateways',
        'domain/models',
        'domain/use_cases',
        'infrastructure/driven_adapters'
      ];
    } else if (projectType === 'TypeScript') { // TypeScript
      folders = [
        'app/ui/views',
        'app/ui/components',
        'domain/gateways',
        'domain/models',
        'domain/use_cases',
        'infrastructure/driven_adapters'
      ];
    } else {
      folders = [
        'controllers/validations/',
        'domain/gateways',
        'domain/models',
        'domain/use_cases',
        'infrastructure/driven_adapters'
      ];
    }
  
    const featurePath = path.join(basePath, featureName);
    folders.forEach(folder => {
      const fullPath = path.join(featurePath, folder);
      fs.mkdirSync(fullPath, { recursive: true });
    });
  
    vscode.window.showInformationMessage(`Estructura de feature creada para ${projectType} en: ${featurePath}`);
  }
  